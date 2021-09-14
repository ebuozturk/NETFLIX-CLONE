import React from 'react'
import styled from "styled-components"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"
import axios from "axios"
import InputWithLabel from '../tools/InputWithLabel';
import TextAreaWithLabel from '../tools/TextAreaWithLabel';


const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    description: yup.string().required("Description is required"),

})
export default function GenreAddForm({ preLoadedValues }) {


    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: preLoadedValues,
        mode: "onBlur",
        resolver: yupResolver(schema),
    })
    const onSubmit = (data) => {
        if (preLoadedValues) {
            data.id = preLoadedValues.id
        }
        const result = axios.post("/api/genre/upload", data)
            .catch(err => console.log(err.response))
    }

    return (

        <div className="w-100 d-flex flex-column align-items-center justify-content-center">
            <Form className="w-75 d-flex flex-wrap justify-content-start" onSubmit={handleSubmit(onSubmit)}>
                <FormHeader>Genre Add</FormHeader>
                <FormGroup>
                    <InputWithLabel
                        id="name"
                        name="name"
                        placeholder="name"
                        header="Name:"
                        errors={errors}
                        register={register("name", { required: true })}
                    />
                </FormGroup>
                <FormGroup style={{ width: "100%" }}>
                    <TextAreaWithLabel
                        style={{ minWidth: "50vw" }}
                        id="description"
                        name="description"
                        placeholder="Description"
                        header="Description"
                        errors={errors}
                        register={register("description", { required: true })}
                    />

                </FormGroup>
                <FormGroup style={{ width: "100%" }}>
                    <Button type="submit">Save</Button>
                </FormGroup>

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

    
`;
const Button = styled.button`
background: white;
width:90px;
color:#333333;
height:30px;
border-radius:3px;
`;
