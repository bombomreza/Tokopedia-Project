import { api_url } from "../../helpers/api_url"
import Axios from 'axios'

export const fetchOwnedPoke = () => {
	return (dispatch) => {
        Axios.get(`${api_url}/pokemonlist`)
        .then((res) => {
            dispatch({
                type: "FETCH_POKELIST",
                payload: res.data,
            });
        })
        .catch((err) => {
            console.log(err)
        })
	}
}