import { useCallback } from 'react';

import { useStore } from '../service';

export const useTag = () => {

	const [ state, dispatch ] = useStore('tag');

	const func = {

		create: useCallback((title: string) => new Promise((resolve, reject) => {

			dispatch({ type: 'create', item: { title } });

			resolve(true);

		}), []),

	};

	return {
		...state,
		...func,
	};

}
