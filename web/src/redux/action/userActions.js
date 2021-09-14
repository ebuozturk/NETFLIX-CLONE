import * as actionTypes from "./actionTypes"
import axios from "axios"
import setAuthorizationToken from "../../utils/setAuthorizationToken";

export const loginSuccess = (user) => { return { type: actionTypes.LOGIN_SUCCESS, payload: user } }
export const logoutSuccess = () => { return { type: actionTypes.LOGOUT_SUCCESS, payload: {} } }

export function login(request) {
  return async dispatch => {
    const result = await axios.post('/api/user/authenticate', {
      username: request.username,
      password: request.password
    })
      .catch(err => console.log(err));
    if (result.data.success) {
      var token = result.data.data.jwt
      if (request.rememberMe) {
        localStorage.setItem('token', token);
        localStorage.setItem('email', request.username)
      }
      setAuthorizationToken(token)
      // await getUserByUsername(request.username)(dispatch)
      await getUserByEmail(request.username)(dispatch)

    }
  }
}

export const logout = () => {
  return dispatch => {
    dispatch(logoutSuccess())
  }
}


export const signUp = data => {
  axios.post("/registration", data)
    .catch("oh wait")

}

export const getUser = (id) => {
  return async dispatch => {
    const result = await axios.get("/api/user/id=" + id).then(data => data)
      .catch(err => console.log("Error: ", err))
    if (result.success)
      dispatch(loginSuccess(result.data))
  }
}
export const getUserByUsername = (username) => {
  return async dispatch => {
    const result = await axios.get("/api/user/user=" + username)
      .catch(err => console.log("Error: ", err))
    if (result.data.success)
      dispatch(loginSuccess(result.data.data))
  }
}

export const getUserByEmail = (email) => {
  return async dispatch => {
    const result = await axios.get("/api/user/email=" + email)
      .catch(err => console.log(err))
    if (result.data.success) {
      dispatch(loginSuccess(result.data.data))
    }
  }
}