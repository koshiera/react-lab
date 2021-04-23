import qs from 'query-string';

const Methods = {
	get: 'GET',
	put: 'PUT',
	post: 'POST',
	del: 'DELETE',
	patch: 'PATCH',
};

type Method = keyof typeof Methods

type Data = Record<string, any>

type Type = 'FORM' | 'JSON' | 'DATA'

interface Request extends RequestInit {
	headers: Headers
}

type ResponseFail = {
	code: number,
	message: string,
	payload?: Record<string, any>
}

interface Options<R> {
	baseURL?: string,
	charset?: 'utf-8',
	middleware?: {
		request?: (request: Request) => Request,
		response?: (response: R, request: Request) => [ boolean, ResponseFail ]
	},
	defaultType?: Type
}

interface Params<T> {
	type?: Type,
	done?: (r: T, fn: (a?: any) => void) => void,
	fail?: (e: any, fn: (a?: any) => void) => void
}

export interface Response<T> {
	abort: () => void,
	promise: Promise<T>
}

type RequestArgs<T> = [ path: string, data?: Data, params?: Params<T> ]

type RequestArgsMain<T> = [ method: string, ...rest: RequestArgs<T> ]

const serialize = (data: Data, type?: Type): [ string | FormData, string ] => {

	let body: string | FormData = '';
	let header: string = '';

	switch (type) {
		case 'FORM':
			body = qs.stringify(data);
			header = 'x-www-form-urlencoded';
			break;
		case 'JSON':
			body = JSON.stringify(data);
			header = 'json';
			break;
		case 'DATA':
			body = new FormData();
			for (const name in data) {
				body.append(name, data[name]);
			}
			break;
	}

	return [ body, header ];

}

export const createAPI = <R>(options: Options<R>) => {

	const {
		baseURL,
		charset = 'utf-8',
		middleware = {},
		defaultType,
	} = options;

	const request = <T>(...args: RequestArgsMain<T>): Response<T> => {

		const [
			method,
			path,
			data = {},
			params = {}
		] = args;

		let is_aborted = false;

		const { signal, abort } = new AbortController();

		const promise = new Promise<T>(async (resolve, reject) => {

			const _reject = (error: ResponseFail): void => {

				let e;

				if (is_aborted || !(error instanceof Error)) {

					e = { is_aborted, ...error };

				} else {

					e = { is_aborted, code: -1, message: error.message };

				}

				if (params?.fail) {
					return params?.fail(e, reject);
				}

				reject(e);

			}

			const _resolve = (r: R & T): void => {

				if (params?.done) {
					return params?.done(r, resolve);
				}

				resolve(r);

			}

			let url = `${baseURL}${path}`;

			let req: Request = {
				method,
				signal,
				headers: new Headers()
			};

			if (middleware.request) {
				req = middleware.request(req);
			}

			if (Object.keys(data).length) {

				if (method === 'get') {

					for (const i in data) {
						if (data[i] === null || data[i] === undefined) {
							delete data[i];
						}
					}

					if (Object.keys(data).length) {
						url += `?${qs.stringify(data)}`;
					}

				} else {

					const [ body, header ] = serialize(data, params.type || defaultType);

					req.body = body;

					if (header) {
						req.headers.append(
							'Content-Type',
							`application/${header}; charset=${charset}`
						);
					} else {
						req.headers.delete('Content-Type');
					}

				}

			}

			try {

				const resp = await fetch(url, req);
				const json = await resp.json() as R & T;

				if (middleware.response) {

					const [ status, error ] = middleware.response(json, req);

					return status ? _resolve(json) : _reject(error);

				}

				return _resolve(json);

			} catch (e) {

				_reject(e);

			}

		});

		return {
			abort: () => {

				is_aborted = true;

				abort();

			},
			promise,
		};

	}

	const api = {} as Record<Method, <T>(...a: RequestArgs<T>) => Response<T>>

	for (const key in Methods) {
		// FIXME: API factory
		const method = key as Method;
		api[method] = (...a) => request(Methods[method], ...a);
	}

	return api;

}
