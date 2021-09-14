import * as actionTypes from "../action/actionTypes"

const initialState = {

    isLogged: false,
    user: {}
}

const userReducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                isLogged: true,
                user: action.payload
            }
        case actionTypes.LOGOUT_SUCCESS:
            localStorage.removeItem('token');
            return {
                ...state,
                isLogged: false,
                user: action.payload
            }
        default:
            return state

    }

}



export default userReducer