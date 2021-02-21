import React, { FC, useContext, createContext, useReducer } from 'react';

import { User, UserReducer, Tag, TagReducer } from '../reducer';

type Context = {
	user: UserReducer,
	tag: TagReducer
}

const context: Context = {
	user: [ User.initialState, () => {} ],
	tag: [ Tag.initialState, () => {} ],
};

const Context = createContext<Context>(context);

const Provider: FC = ({ children }) => {

	const user = useReducer(User.reducer, User.initialState);
	const tag = useReducer(Tag.reducer, Tag.initialState);

	return (
		<Context.Provider
			value={{ user, tag }}
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
