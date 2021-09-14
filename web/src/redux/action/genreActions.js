import * as actionTypes from "./actionTypes"
import axios from "axios"

export const getAllGenresSuccess = (genres) => { return { type: actionTypes.GET_ALL_GENRES_SUCCESS, payload: genres } }
export const getGenreSuccess = (genre) => { return { type: actionTypes.GET_GENRE_SUCCESS, payload: genre } }

export const getAllGenres = () => {

    return async dispatch => {
        const result = await axios.get("/api/genre")
            .catch(err => console.log("ERROR: ", err))
        if (result.data.success)
            dispatch(getAllGenresSuccess(result.data.data))
    }
}

export const getGenre = (genreId) => {
    return async dispatch => {
        const result = await axios("/api/genre/" + genreId)
            .catch(err => console.log("ERROR: ", err))
        if (result)
            dispatch(getGenreSuccess(result.data.data))
    }
}
