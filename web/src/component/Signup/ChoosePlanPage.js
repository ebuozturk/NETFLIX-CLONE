import React from "react"
import { useHistory } from "react-router-dom"
import styled from "styled-components"
import checkMark from "../../img/Checkmark.png"
import SignUpNavbar from "./SignUpNavbar"

const ChoosePlanPage = () => {

    const history = useHistory()
    return (
        <>
            <SignUpNavbar />
            <Body>
                <CenterContainer>
                    <PlanContainer>
                        <Img src={checkMark} />
                        <Span>Step <b>1</b> of <b>3</b></Span>
                        <StepTitle>Choose Your Plan.</StepTitle>
                        <ContextBody>
                            <CheckmarkGroup>
                                <CheckmarkGroupRow>
                                    <i style={{ color: "red" }} class="fas fa-check"></i>
                                    <CheckmarkGroupText>
                                        No commitments, cancel anytime.
                                    </CheckmarkGroupText>
                                </CheckmarkGroupRow>
                                <CheckmarkGroupRow>
                                    <i style={{ color: "red" }} class="fas fa-check"></i>
                                    <CheckmarkGroupText>
                                        Everything on Netflix for one low price.                        </CheckmarkGroupText>
                                </CheckmarkGroupRow>
                                <CheckmarkGroupRow>
                                    <i style={{ color: "red" }} class="fas fa-check"></i>
                                    <CheckmarkGroupText>
                                        Unlimited viewing on all your devices.                        </CheckmarkGroupText>
                                </CheckmarkGroupRow>
                            </CheckmarkGroup>

                        </ContextBody>

                    </PlanContainer>
                    <Button
                        onClick={() => {
                            // history.push("/signup/planform")
                            history.push("/")

                        }}
                    >Next</Button>
                </CenterContainer>
            </Body>
        </>
    )
}
const Body = styled.div`
display:flex;
align-items:center;
justify-content:center;
width:100%;
height:100vh;
background:#FFFFFF;

`
const CenterContainer = styled.div`
display:flex;
max-width:900px;
height:548px;
flex-direction:column;
align-items:center;
`
const PlanContainer = styled.div`
display:flex;
flex-direction:column;
max-width:340px;
`
const Img = styled.img`
width:50px;
height:50px;
margin:0 auto;
margin-bottom:20px;
`
const Span = styled.span`
color:#333333;
margin:0 auto;
font-family:NetflixSans_W_Rg;

`
const StepTitle = styled.h1`
color:#333333;
font-size:32px;
margin:0 auto;
margin-top:10px;
margin-bottom:40px;
font-family:NetflixSans_W_Md;
`

const ContextBody = styled.div`
max-width:300px;
`
const CheckmarkGroup = styled.ul`
display:flex;
flex-direction:column;
justify-content:space-between;
margin-bottom:20px;
margin-top:15px;
text-aling:left;
`
const CheckmarkGroupRow = styled.li`
display:flex;
height:46px;
width:276px;
margin-left:1.1em;
margin-bottom:5px;
`
const CheckmarkGroupText = styled.span`
font-size:18px;
color:#333333;
font-family:NetflixSans_W_Rg;

`
const Button = styled.button`
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

export default ChoosePlanPage