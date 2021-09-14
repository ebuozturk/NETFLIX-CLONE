import React from 'react'
import { useSelector } from 'react-redux';
import { Route, Redirect } from "react-router-dom"


export default function PrivateRoute({ component: Component, setShowHeader, isAdmin, ...rest }) {

    const user = useSelector(state => state.user);

    return (
        <Route
            {...rest}
            exact path={rest.path}
            render={props => {
                return (user.isLogged && (!isAdmin || user.user.role === "ADMIN")) ? <Component
                    setShowHeader={setShowHeader}
                    key={props.location.key}
                    {...props} /> : <Redirect to="/login" />


            }}
        />
    )
}

PrivateRoute.defaultProps = {
    isAdmin: false
}
