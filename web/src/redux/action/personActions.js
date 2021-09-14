import * as actionTypes from "./actionTypes"
import axios from "axios"

export const getPersonSuccess = (person) => { return { type: actionTypes.GET_PERSON_SUCCESS, payload: person } }

export const getPerson = (id) => {

    return async dispatch => {
        const result = await axios.get("/api/person/" + id)
            .catch(err => console.log("Error: ", err))
        if (result)
            dispatch(getPersonSuccess(result.data.data))

    }
}

