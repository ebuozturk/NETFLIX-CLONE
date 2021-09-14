import { act } from "react-dom/cjs/react-dom-test-utils.production.min"
import * as actionTypes from "../action/actionTypes"

const initialState = {

    id: "",
    firstName: "",
    lastName: "",
    birthDate: "",
    imageUrl: "",
    qualities: [],
    movies: []


}
export const personReducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.GET_PERSON_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}