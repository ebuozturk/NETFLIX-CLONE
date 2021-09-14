import React, { useEffect } from "react"
import { logout, logoutSucess } from "../../redux/action/userActions"
import { useDispatch } from "react-redux"
import { Redirect } from "react-router"

const Logout = () => {
    const dispatch = useDispatch()
    useEffect(async () => {
        await logout()(dispatch)
    }, [])
    return (
        <Redirect to="/login" />
    )
}

export default Logout