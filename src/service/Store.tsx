import React, { FC, Dispatch, createContext, useContext, useReducer, useMemo } from 'react';

import * as reducers from '../reducer';

type ReducerType<T extends readonly [ any, any ]> = [
	Parameters<T[0]>[0],
	Dispatch<Parameters<T[0]>[1]>
]

type Context = {
	user: ReducerType<typeof reducers.User>,
	tag: ReducerType<typeof reducers.Tag>
}

const context: Context = {
	user: [ reducers.User[1], () => {} ],
	tag: [ reducers.Tag[1], () => {} ],
};

const Context = createContext<Context>(context);

const Provider: FC = ({ children }) => {

	const user = useReducer(...reducers.User);
	const tag = useReducer(...reducers.Tag);

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
