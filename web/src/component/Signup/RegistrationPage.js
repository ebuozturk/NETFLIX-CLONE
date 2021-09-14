import React from "react"
import styled from "styled-components"
import SignUpNavbar from "./SignUpNavbar"
import devices from "../../img/Devices.png"
import { useHistory } from "react-router-dom"

const RegistrationPage = () => {
    const history = useHistory()
    return (
        <div>
            <SignUpNavbar />
            <Body>
                <CenterContainer>

                    <RegContainer>
                        <Img src={devices} />
                        <StepIndicator>Step <b>1</b> of <b>3</b></StepIndicator>
                        <StepTitle>
                            Finish setting up your account
                        </StepTitle>
                        <Text>
                            Netflix is personalized for you.<br /> Create a password to watch on any device at any time.
                        </Text>
                    </RegContainer>
                    <Button onClick={() => {
                        history.push("/signup/regform")
                    }}>Next</Button>
                </CenterContainer>
            </Body>
        </div>
    )
}
const Body = styled.div`
width:100%;
height:100vh;
background:#FFFFFF;

`
const CenterContainer = styled.div`
display:flex;
max-width:978px;
margin:0 auto;
flex-direction:column;
align-items:center;
`
const RegContainer = styled.div`
margin:0 auto;
margin-top:120px;
text-align:center;
max-width: 340px;
`
const Img = styled.img`
width:260px;
margin:0 auto;
margin-top:120px;
margin-bottom:40px;
`
const StepIndicator = styled.span`
display:block;
color:#333333;
margin:0 auto;
font-family:NetflixSans_W_Rg;

`
const StepTitle = styled.h1`
color:#333333;
font-size:32px;
margin:0 auto;
margin-bottom:10px;
font-family:NetflixSans_W_Md;
`

const Text = styled.span`
font-size:18px;
color:#333333;
font-family:NetflixSans_W_Rg;

`
const Button = styled.button`
margin-top:13px;
width:340px;
height:64px;
font-size:24px;
border-radius:4px;
background:#e50914;
color:#FFFFFF;
&:hover{
    background:#F6121D;
}
&:active{
    border:none;
    outline:none;
    background:#e50914;
}
`
export default RegistrationPage