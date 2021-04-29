import React, { FC, Dispatch, createContext, useContext, useReducer, useMemo } from 'react';

import * as reducers from '../reducers';

type Reducer<T extends readonly [ any, any ]> = [
	Parameters<T[0]>[0],
	Dispatch<Parameters<T[0]>[1]>
]

type Context = {
	[key in keyof typeof reducers]: Reducer<typeof reducers[key]>
}

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
			children={children} />
	);

}

export const Store = { Provider };

export const useStore = <T extends keyof Context>(store: T) => {

	return useContext(Context)[store];

}
