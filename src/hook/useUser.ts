import { useCallback } from 'react';

import { useStore } from '../service';

export const useUser = () => {

	const [ state, dispatch ] = useStore('user');

	const func = {

		create: useCallback((name: string) => new Promise((resolve, reject) => {

			dispatch({ type: 'create', item: { name } });

			resolve(true);

		}), []),

	};

	return {
		...state,
		...func,
	};

}
