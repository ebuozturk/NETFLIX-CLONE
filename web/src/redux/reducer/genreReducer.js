import * as actionTypes from "../action/actionTypes"


export const allGenresReducer = (state = [], action) => {

    switch (action.type) {
        case actionTypes.GET_ALL_GENRES_SUCCESS:
            return action.payload;

        default:
            return state;
    }
}
const initialState = {
    id: "",
    name: "",
    description: ""
}
export const selectedGenre = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_GENRE_SUCCESS:
            var newGenre = action.payload
            return newGenre;
        default:
            return state;
    }
}