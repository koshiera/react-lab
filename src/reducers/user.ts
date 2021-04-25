import { Reducer } from 'react';

type IUser = {
	name: string
}

type Action =
	{ type: 'read' } |
	{ type: 'read_done' } |
	{ type: 'create', item: IUser }

type State = {
	data: IUser[]
}

const initialState: State = {
	data: [],
};

const reducer: Reducer<State, Action> = (state, action) => {
	switch (action.type) {
		case 'read':
			return { ...state };
		case 'read_done':
			return { ...state };
		case 'create':
			return { ...state, data: [ action.item, ...state.data ] };
		default:
			return state;
	}
}

export const user = [ reducer, initialState ] as const
