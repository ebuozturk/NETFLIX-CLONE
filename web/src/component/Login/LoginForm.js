import React, { useState } from "react"
import { login } from "../../redux/action/userActions"
import { useHistory, Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import "./LoginForm.css"


const LoginForm = (props) => {

    const history = useHistory();
    const dispatch = useDispatch()
    const [errors, setErrors] = useState(false)
    const [username, setUsername] = useState(props.username ? props.username : null)
    const onSubmit = (e) => {
        e.preventDefault();
        const data = {
            username: e.target.elements.username.value,
            password: e.target.elements.password.value,
            rememberMe: e.target.elements.rememberMe.checked
        }
        login(data)(dispatch)
            .then(
                (res) => history.push('/'),
                (err) => setErrors(true)
            )


    }


    return (
        <div
            style={{
                display: "flex",
                position: "relative",
                flexDirection: "column",
                width: 450,
                height: 620,
                marginTop: 100,
                marginBottom: 90

            }}
        >
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    right: 0,
                    left: 0,
                    backgroundColor: "black",
                    opacity: 0.7,
                    zIndex: "-1",
                    borderRadius: 5,
                }}
            />
            <form
                className="form"
                onSubmit={(event) => onSubmit(event)}

            >
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "flex-start"
                    }}
                >
                    <h2 className="form-header">Sign In</h2>
                </div>


                <div className={"my-form-group" + (errors ? " form-error" : "")}>
                    <input
                        type="username"
                        name="username"
                        id="username"
                        placeholder="Email"
                        className="form-input"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                    <label for="username" >
                        Please enter a valid email.
                    </label>

                </div>

                <div className={"my-form-group" + (errors ? " form-error" : "")} >
                    <input type="password" name="password" id="password" placeholder="Password" className="form-input" />
                    <label for="password">
                        Your password is not correct.
                    </label>
                </div>
                <button type="submit" className="form-button">Sign In</button>
                <div
                    style={{
                        width: 314,
                        display: "flex",
                        paddingLeft: 20
                    }}
                >
                    <input
                        style={{
                            display: "inline-block",
                            position: "relative",
                            width: 15,
                            height: 15,
                            color: "black"
                        }}
                        class="form-check-input"
                        type="checkbox" value=""
                        id="rememberMe"
                        name="rememberMe"

                    />
                    <p
                        style={{
                            marginLeft: 5,
                            color: "#b1b2af",
                            fontSize: 14,
                            paddingTop: 2
                        }}
                    >Remember Me</p>
                </div>

            </form>
            <div className="signup-text">
                <p>New to Netflix?
                    <Link to="/" className="ml-1">
                        Sign up now.
                    </Link>
                </p>

            </div>
        </div>

    )
}

export default LoginForm;