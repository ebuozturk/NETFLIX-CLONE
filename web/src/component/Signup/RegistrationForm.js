import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import styled from "styled-components"
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"
import SignUpNavbar from "./SignUpNavbar";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../../redux/action/userActions"


const schema = yup.object().shape({
    email: yup.string().required("Email is required!"),
    password: yup.string().required("Password is required!")
        .min(6, "Password should be between 6 and 60 characters")
        .max(60, "Password should be between 6 and 60 characters")

})
const RegistrationForm = () => {

    const [email, setEmail] = useState();
    const [error, setError] = useState();
    const history = useHistory()
    const dispatch = useDispatch()

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email
        },
        mode: "onBlur",
        resolver: yupResolver(schema),
    })
    const onSubmit = async (data) => {
        console.log(data)
        const result = await axios.post("/api/registration", {
            email: data.email,
            password: data.password
        }).catch(err => console.log(err))
        console.log(result)
        if (result?.data.success) {
            login({
                username: data.email,
                password: data.password,
                rememberMe: true
            })(dispatch).then(
                (res) => history.push('/signup'),
                (err) => console.log("Error: " + err)
            )
            // history.push("/signup")
        }
        else
            setError("Something went wrong!")
    }
    const checkEmail = async () => {
        const value = await localStorage.getItem("regEmail");
        if (value) {
            await setEmail(value)

        }

    }
    useEffect(() => {
        checkEmail()

    }, []);

    return (
        <>
            <SignUpNavbar />

            <Body>
                <CenterContainer>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <RegFormContainer>
                            <StepIndicator>Step <b>2</b> of <b>3</b></StepIndicator>
                            <StepTitle>
                                Create a password to start your membership
                            </StepTitle>
                            <Text>
                                Just a few more steps and you're done!
                                We hate paperwork, too.
                            </Text>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Email"
                                defaultValue={email}
                                {...register("email")}
                            />
                            {errors?.email && <ErrorLabel>{errors.email.message}</ErrorLabel>}
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Add a password"
                                {...register("password")}
                            />
                            {errors?.password && <ErrorLabel>{errors.password.message}</ErrorLabel>}

                            <CheckboxDiv>
                                <Checkbox
                                    id="check"
                                    name="check"
                                    {...register("check")}
                                />
                                <Text>Please do not email me Netflix special offers.</Text>
                            </CheckboxDiv>

                        </RegFormContainer>
                        {error && <ErrorLabel>{errors}</ErrorLabel>}

                        <Button
                            type="submit"
                        >
                            Next
                        </Button>
                    </form>


                </CenterContainer>

            </Body>
        </>


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
const RegFormContainer = styled.div`
margin:0 auto;
margin-top:120px;
text-align:start;
max-width: 440px;


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
const Input = styled.input`
    border: 1px solid #9a9a9a;
    height: 60px;
    width:100%;
    box-sizing: border-box;
    padding: 10px 10px 0;
    margin-top:10px;
    border-radius:2px;
  `
const CheckboxDiv = styled.div`
width:100%;
`
const Checkbox = styled.input.attrs({ type: 'checkbox' })`
margin-right:6px;
`
const Button = styled.button`
margin-top:13px;
width:440px;
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
const ErrorLabel = styled.label`
    color:#e87c03;
    display:block;

`;
export default RegistrationForm