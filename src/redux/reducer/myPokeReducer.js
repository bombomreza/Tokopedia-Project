const INITIAL_STATE = {
	mypoke: [],
	mypokeById: {},
};

export const myPokeReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case "FETCH_MYPOKE":
			return {
				...state,
				mypoke: action.payload,
			};
		case "FETCH_BY_ID":
			return {
				...state,
				mypokeById: action.payload
			}
		default:
			return state;
	}
};