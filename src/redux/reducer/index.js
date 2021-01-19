import { combineReducers } from "redux";
import { myPokeReducer } from "./myPokeReducer";
import { pokeListReducer } from "./pokeListReducer";

export default combineReducers({
	myPokemonList: myPokeReducer,
	pokeList : pokeListReducer
});