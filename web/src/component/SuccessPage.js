import React from "react"
import { Link, useParams } from "react-router-dom"
import styled from "styled-components"


const SuccessPage = () => {
    const { name } = useParams()

    return (
        <Body>
            <SuccessText>{name} added successfully!</SuccessText>
            <Links>
                <Link to={"/"}>Go to Home</Link>
                <Link to={name.toLowerCase() == "person" ? "/addPerson" : "addMovie"}>Add {name}</Link>
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
const SuccessText = styled.h1`
color:#4BB543;
`
export default SuccessPage