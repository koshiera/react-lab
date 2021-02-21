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

type Reducer = (state: State, action: Action) => State

export type UserReducer = [ State, React.Dispatch<Action> ]

const initialState: State = {
	data: [],
};

const reducer: Reducer = (state, action) => {
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

export const User = {
	reducer,
	initialState,
}
