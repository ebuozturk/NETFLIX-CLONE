import React from "react"
import { useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"
import { signUp } from "../../redux/action/userActions"
import { useForm } from "react-hook-form"
import styled from "styled-components"
import InputWithLabel from "../tools/InputWithLabel"
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"
import ImageInputWithPreview from "../tools/ImageInputWithPreview"

const schema = yup.object().shape({

})



const SignUpForm = (props) => {

    const history = useHistory();
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onBlur",
        resolver: yupResolver(schema),
    })
    const onSubmit = (e) => {
        e.preventDefault();
        const data = {
            firstName: e.target.elements.firstname.value,
            lastName: e.target.elements.lastname.value,
            username: e.target.elements.username.value,
            email: e.target.elements.email.value,
            password: e.target.elements.password.value
        }
        signUp(data)


    }

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}
        >
            <Form onSubmit={handleSubmit(onSubmit)}>
                <FormGroup>
                    <InputWithLabel
                        name="firstName"
                        id="firstName"
                        placeholder="First Name"
                        errors={errors}
                        header="First Name:"
                        register={register("firstName", { required: true })}
                    />
                </FormGroup>
                <FormGroup>
                    <InputWithLabel
                        name="lastName"
                        id="lastName"
                        placeholder="Last Name"
                        header="Last Name:"
                        errors={errors}
                        register={register("lastName", { required: true })}
                    />
                </FormGroup>
                <FormGroup>
                    <InputWithLabel
                        name="username"
                        id="username"
                        placeholder="Username"
                        header="Username:"
                        errors={errors}
                        register={register("username", { required: true })}
                    />
                </FormGroup>
                <FormGroup>
                    <InputWithLabel
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        header="Email:"
                        errors={errors}
                        register={register("email", { required: true })}
                    />
                </FormGroup>
                <FormGroup>
                    <InputWithLabel
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        header="Password:"
                        errors={errors}
                        register={register("password", { required: true })}
                    />
                </FormGroup>
                <FormGroup>
                    <ImageInputWithPreview
                        name="imageFile"
                        id="imageFile"
                        header="Profile Picture:"
                        errors={errors}
                        imgMaxWidth="300px"
                        register={register("imageFile", { required: true })}
                    />
                </FormGroup>
                <Button>Submit</Button>
            </Form>
        </div>

    )
}
const Form = styled.form`
    margin-top:70px;
`;
const FormHeader = styled.h2`
    width:100%;
    margin-bottom:30px;
`;

const FormGroup = styled.div`
    display:flex;
    flex-direction:column;
    margin:10px;
    width:314px;

`;
const FormFileGroup = styled.div`
width:100%;
max-width:100%;
display:flex;
flex-direction:column;
`;
const Button = styled.button`
background: white;
width:90px;
color:#333333;
height:30px;
border-radius:3px;

`;
export default SignUpForm;