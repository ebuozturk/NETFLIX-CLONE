import * as actionTypes from "./actionTypes"
import axios from "axios"

export const getMoviesSuccess = (movies) => { return { type: actionTypes.GET_MOVIES_SUCCESS, payload: movies } }
export const getSelectedMovieSuccess = (movie) => { return { type: actionTypes.GET_MOVIE_SUCCESS, payload: movie } }
export const removeSelectedMovieSuccess = () => { return { type: actionTypes.REMOVE_SELECTED_MOVIE } }
export const getAllMovies = () => {

    return async dispatch => {
        const result = await axios.get('/api/movie')
            .catch(err => console.log("Error: ", err))
        if (result)
            dispatch(getMoviesSuccess(result.data.data))
    }

}

export const getSelectedMovie = (id) => {
    return async dispatch => {
        const result = await axios.get('/api/movie/' + id)
            .catch(err => console.log("Error: ", err))
        if (result)
            await dispatch(getSelectedMovieSuccess(result.data.data))
    }
}

export const getMoviesByGenre = (genreId) => {
    return async dispatch => {
        const result = await axios.get("/api/movie/genre/" + genreId)
            .catch(err => ("Error: ", err))
        if (result)
            dispatch(getMoviesSuccess(result.data.data))
    }
}

export const getMoviesBySearch = (search) => {

    return async dispatch => {
        const result = await axios.get("/api/movie/search=" + search)
            .catch(err => console.log("ERROR: ", err))
        if (result)
            dispatch(getMoviesSuccess(result.data.data))
    }
}