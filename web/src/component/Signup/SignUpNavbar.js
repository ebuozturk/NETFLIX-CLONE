import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import Logo from "../../img/logo.png"

const SignUpNavbar = () => {

    return (
        <Navbar>
            <Link to="/">

                <Img src={Logo} />


            </Link>
            <Link to="/login" style={{
                color: "#333333",
                fontWeight: "bold",
                fontSize: "18px"
            }}>
                Sign In
            </Link>

        </Navbar>
    )
}

const Navbar = styled.div`
position:absolute;
top:0;
display:flex;
align-items:center;
justify-content:space-between;
width:100%;
height:91px;
border:1px solid #e6e6e6;
background:#FFFFFF;
padding: 0 3.5rem;
`
const Img = styled.img`
width:167px;

`

export default SignUpNavbar

