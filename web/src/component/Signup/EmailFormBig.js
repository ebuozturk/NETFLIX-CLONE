import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import styled from "styled-components"


const EmailFormBig = () => {
    const history = useHistory()
    const [error, setError] = useState()

    const handleSubmit = (e) => {
        e.preventDefault()
        const { value } = e.target.email
        if (value) {
            localStorage.setItem('regEmail', value);
            history.push("/signup/registration")
        }
        else {
            setError("Email is required!")
        }
    }

    return (
        <Form onSubmit={handleSubmit}>

            <h3>Ready to watch? Enter your email to create or restart your membership.</h3>
            <FormGroup>
                <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    style={error ? { borderBottom: "1px solid #e87c03" } : {}}
                />

                <Button
                    type="submit"
                >Get Started <i class="fas fa-chevron-right"></i></Button>
            </FormGroup>
            {error && <ErrorLabel>{error}</ErrorLabel>}


        </Form>
    )
}
const Form = styled.form`
width: 100%;
 h3 {
    display: block;
    margin-top: 1rem;
    font-size: 1.2rem;
    text-align: center;
    padding: 0 45.5px 20px;
 }
`
const FormGroup = styled.div`
    display: flex;
    width: 100%;
  `
const Input = styled.input`
    border: 0;
    height: 70px;
    min-width: 500px;
    box-sizing: border-box;
    padding: 10px 10px 0;
    border-radius:1px;
  `
const Button = styled.button`
    min-height: 70px;
    min-width: 74px;
    width: 214.075px;
    background: #db0510;
    color: white;
    padding: 0 26px;
    font-size: 26px;
    border-radius:1px;

`
const ErrorLabel = styled.label`
    color:#e87c03;
    display:block;

`;
export default EmailFormBig
