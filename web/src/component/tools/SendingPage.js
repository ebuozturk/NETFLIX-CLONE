import React from "react"
import styled from "styled-components"


const SendingPage = () => {

    return (
        <FullBody>
            <div class="spinner-border text-danger" role="status" style={{ width: "70px", height: "70px" }}>
                <span class="sr-only">Loading...</span>
            </div>
        </FullBody>
    )
}
const FullBody = styled.div`
position:absolute;
display:flex;
align-items:center;
justify-content:center;
width:100%;
top:0;
bottom:0;
z-index:100;
background: rgb(19, 19, 19,0.5);
font-size:30px;
`
export default SendingPage