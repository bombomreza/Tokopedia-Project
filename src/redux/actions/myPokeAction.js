import Axios from "axios";
import swal from "sweetalert";
import { api_url } from "../../helpers/api_url";

export const fetchMyPokeAction = () => {
	return (dispatch) => {
		Axios.get(`${api_url}/mypoke`)
			.then((res) => {
				dispatch({
					type: "FETCH_MYPOKE",
					payload: res.data,
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};
};

export const addMyPokemon = (data, owned) => {
	return (dispatch) => {
		Axios.get(`${api_url}/mypoke?name=${data.name}`)
		.then((res) => {
			if(res.data.length === 0) {
				Axios.post(`${api_url}/mypoke`, data)
				.then((res) => {
					Axios.patch(`${api_url}/pokemonlist/${data.pokemonIndex}`, {
						owned: owned + 1
					})
					dispatch(fetchMyPokeAction())
					swal("Gotcha!", "Pokemon was caught!", "success");
				})
				.catch((err) => {})
			} else {
				swal("Fail!", "Nickname already taken", "error");
			}
		})
	}
}

export const deleteMyPokemon = (id, pokemonIndex, owned) => {
	return(dispatch) => {
		Axios.delete(`${api_url}/mypoke/${id}`)
		.then((res) => {
			Axios.patch(`${api_url}/pokemonlist/${pokemonIndex}`, {
			})
			dispatch(fetchMyPokeAction())
		})
		.catch((err) => {
			console.log(err)
		})
	}
}

export const releaseMyPokemon = (id, status) => {
	return (dispatch) => {
		Axios.patch(`${api_url}/mypoke/${id}`, {
			status: 'Release'
		})
		.then((res) => {
			dispatch(fetchMyPokeAction())
		})
		.catch((err) => {console.log(err)})
	}
}
