import React, { FC, Dispatch, createContext, useContext, useReducer, useMemo } from 'react';

import * as reducers from '../reducers';

type Reducer<T extends readonly [ any, any ]> = [
	Parameters<T[0]>[0],
	Dispatch<Parameters<T[0]>[1]>
]

type Context = {
	// [key in keyof typeof reducers]: typeof reducers[key]
	[key in keyof typeof reducers]: Reducer<typeof reducers[key]>
};

// type Context = {
// 	user: ReducerType<typeof reducers.user>,
// 	tag: ReducerType<typeof reducers.tag>
// }

// const context: Context = {
// 	user: [ reducers.user[1], () => {} ],
// 	tag: [ reducers.tag[1], () => {} ],
// };

const Context = createContext({} as Context);

const Provider: FC = ({ children }) => {

	const user = useReducer(...reducers.user);
	const tag = useReducer(...reducers.tag);

	const value = useMemo(
		() => ({ user, tag }),
		[ user, tag ]
	);

	return (
		<Context.Provider
			value={value}
			// value={{ user, tag }}
			children={children} />
	);

}

export const Store = {
	Provider,
	Context,
}

export const useStore = <T extends keyof Context>(store: T) => {

	return useContext(Context)[store];

}
