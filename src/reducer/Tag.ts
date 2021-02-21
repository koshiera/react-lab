type ITag = {
	title: string
}

type Action =
	{ type: 'read' } |
	{ type: 'read_done' } |
	{ type: 'create', item: ITag }

type State = {
	data: ITag[]
}

type Reducer = (state: State, action: Action) => State

export type TagReducer = [ State, React.Dispatch<Action> ]

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

export const Tag = {
	reducer,
	initialState,
}
