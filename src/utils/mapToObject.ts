import { Reducer } from 'react';
import * as reducers from '../reducer';
export {}

// type Arg1<T extends Function> = T extends (a1: infer A1) => any ? A1 : never;

// type User = {
//     Username: string;
//     Email: string;
// }

// const user01 = {} as User;
// const user02 = <User>{};

// user01.Email = "foo@bar.com";

// type Promised<T> = T extends PromiseLike<infer U> ? U : T
// type a = Promised<ReturnType<typeof request>>

// type R = {
// 	a: number
// }

// type MyType1<T> = T extends infer R ? R : never; // infer new variable R from T
// type MyType2<T> = T extends R ? R : never;			 // compare T with above type R
// type MyType3<T> = T extends R2 ? R2 : never;		 // error, R2 undeclared

// type T1 = MyType1<{ b: string }>	// T1 is { b: string; }
// type T2 = MyType2<{ b: string }> // T2 is never

// type RR<K extends keyof any, T> = {
// 	[P in K]: T;
// };

// function getProperty<T, K extends keyof T>(obj: T, key: K) {
//   return obj[key];
// }

// export const mapToOpject = <T, K extends keyof T>(
// 	input: T,
// 	fn: (a: T[K]) => unknown
// ) => {

// 	const object = {};

// 	for (const i in input) {
// 		object[i] = fn(input[i as unknown as K]);
// 	}

// 	return object;

// }

// export const mapToOpject = <T, K extends keyof T>(
// 	input: T,
// 	fn: <C extends any>(a: T[K]) => C,
// ) => {

// 	const object: Record<string, unknown> = {};

// 	for (const i in input) {
// 		object[i] = fn(input[i as unknown as K]);
// 	}

// 	return object as Record<K, T[K]>;

// }

// const a = <T, K extends keyof T, C>(i: T, f: (k: T[K]) => C) => {

// 	const j = {} as { [x in K]: C };
// 	// const j = {} as Record<K, C>;

// 	for (const _i in i) {

// 		const __i = _i as unknown as K;

// 		j[__i] = f(i[__i]);

// 	}

// 	// return j;
// 	return j as { [x in K]: C };
// 	// return j as Record<K, C>;

// }

// const globRed = a(
// 	reducers,
// 	([ , state ]) => [ state, () => {} ]
// );

type ReducersMap = {
	[key: string]: readonly [ Reducer<any, any>, any ]
}

type Inferred<T> = T extends infer R ? R : never;

const a = <T extends ReducersMap, K extends keyof T>(i: T) => {

	const j = {} as {
		[x in K]: [ any, () => void ]
	};

	for (const _i in i) {

		const __i = _i as unknown as K;

		j[__i] = [ i[__i][1], () => {} ];

	}

	return j;

}

const globRed = a(reducers);
