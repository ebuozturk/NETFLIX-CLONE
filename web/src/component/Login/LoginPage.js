import React from "react"
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux"
import LoginForm from "./LoginForm";

const LoginPage = (props) => {
    const user = useSelector(state => state.user)
    const username = localStorage.getItem('email')
    if (user.isLogged) {
        return (
            <Redirect to="/" />
        )
    }

    return (
        <LoginForm
            username={username ? username : ''}
        />

    )
}

export default LoginPage;