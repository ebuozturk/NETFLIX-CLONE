import * as actionTypes from "../action/actionTypes"

const movieInitialState = {
    id: "",
    name: "",
    imdb: "",
    storyline: "",
    pictureUrl: "",
    videoUrl: "",
    categories: [{ name: "" }],
    cast: [],
    directors: []

}

const allMoviesInitialState =
    [
        {
            id: "",
            name: "",
            imdb: "",
            storyline: "",
            pictureUrl: "",
            videoUrl: "",
            categories: [{
                name: ""
            }],
            cast: [],
            directors: []

        }
    ]


export const movieReducer = (state = movieInitialState, action) => {
    switch (action.type) {
        case actionTypes.GET_MOVIE_SUCCESS:

            return action.payload;
        case actionTypes.REMOVE_SELECTED_MOVIE:
            return {}
        default:
            return state;
    }

}

export const allMoviesReducer = (state = allMoviesInitialState, action) => {
    switch (action.type) {
        case actionTypes.GET_MOVIES_SUCCESS:

            return action.payload;

        default:
            return state;
    }
}

export const isSearching = (state = false, action) => {
    switch (action.type) {
        case 'SEARCHING':
            return true
        case 'NOT_SEARCHING':
            return false;
        default:
            return state
    }
}