import React from "react"
import { Link, useParams } from "react-router-dom"
import styled from "styled-components"


const ErrorPage = () => {
    const { name } = useParams()

    return (
        <Body>
            <ErrorText>Something went wrong :(</ErrorText>
            <Links>
                <Link to={"/"}>Go to Home</Link>
                <Link to={name.toLowerCase() == "person" ? "/addPerson" : "/addMovie"}>Add {name}</Link>
            </Links>

        </Body>
    )
}

const Body = styled.div`
border:1px solid #d9e9d8;
border-radius:5px;
max-width:50%;
min-height:25rem;
margin: 0 auto;
margin-top:10rem;
display:flex;
align-items:center;
justify-content:center;
flex-direction:column;

`
const Links = styled.div`
display:flex;
align-items:center;
& > a {
  margin:1rem;
  }
`
const ErrorText = styled.h1`
color:#ff0f0f;
`
export default ErrorPage;