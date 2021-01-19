const INITIAL_STATE = {
	pokeList: {},
};

export const pokeListReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case "FETCH_POKELIST":
			return {
				...state,
				pokeList: action.payload,
			};
		default:
			return state;
	}
};