import React, { useState, useEffect } from 'react'
import axios from "axios"
import SelectBox from '../tools/SelectBox'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"
import styled from "styled-components"
import { useHistory } from 'react-router-dom';
import ImageInputWithPreview from '../tools/ImageInputWithPreview';
import InputWithLabel from '../tools/InputWithLabel';
import SendingPage from '../tools/SendingPage';

const schema = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    // birthDate: yup.string().required("First name is required"),
    // imageFile: yup.mixed().required()
    //     .test("fileSize", "Image is required", (value) => {
    //         if (!value.length) return false // attachment is optional
    //         return true
    //         // return value && value[0].size <= 200000
    //     })
    //     .test("fileSize", "The file is too large", (value) => {
    //         if (!value.length) return true // attachment is optional
    //         return value[0].size <= 2000000
    //         // return value && value[0].size <= 200000
    //     }),



})
export default function PersonAddForm({ preLoadedValues, props }) {

    const [qualities, setQualities] = useState([])
    const history = useHistory();
    const [isSending, setIsSending] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: preLoadedValues,
        mode: "onBlur",
        resolver: yupResolver(schema),
    })
    useEffect(() => {
        if (preLoadedValues) {
            console.log(JSON.stringify(preLoadedValues))
            setQualities(preLoadedValues.qualities)
        }


    }, []);
    const handleSelectChange = (e) => {
        const { value, name } = e.target
        if (!(qualities.filter(item => item === value).length > 0)) {
            setQualities(
                [...qualities, value]
            )
        }

    }
    const removeItemFromQualities = (name) => {
        var newArray = qualities.filter(item => {
            if (item !== name) {
                return item;
            }
        })
        setQualities(newArray)
    }
    const onSubmit = async (data) => {
        await setIsSending(true)
        if (preLoadedValues) {
            data.id = preLoadedValues.id
            data.imageUrl = preLoadedValues.imageUrl
        }

        data.qualities = qualities
        data.imageFile = data.imageFile[0]
        console.log(data)
        const form = new FormData();
        if (document.getElementById("imageFile").files.length > 0) {
            form.append("imageFile", data.imageFile)
        }

        form.append("person", new Blob([JSON.stringify({
            "id": data.id,
            "firstName": data.firstName,
            "lastName": data.lastName,
            "qualities": data.qualities,
            "birthDate": data.birthDate,
            "imageUrl": data.imageUrl
        })], {
            type: "application/json"
        }))

        let url = ""
        if (preLoadedValues)
            url = `/api/person/update/${data.id}`
        else
            url = `/api/person/upload`
        axios.post(url, form, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then(result => {

            if (result.data.success) {
                setIsSending(false)
                history.push("/successResult/Person")
            }



        })
            .catch(err => {
                console.log(err.response)
                setIsSending(false)
                history.push("/errorResult/Person")
            })
    }

    return (
        <div style={{ position: "relative" }}>
            {isSending ? <SendingPage /> : null}

            <div className="w-100 d-flex flex-column align-items-center justify-content-center">

                <Form className="w-75 d-flex flex-wrap justify-content-start" onSubmit={handleSubmit(onSubmit)}>
                    <FormHeader>{preLoadedValues ? "Person Update" : "Person Add"}</FormHeader>

                    <FormGroup>

                        <FormGroup>
                            <InputWithLabel
                                id="firstName"
                                name="firstName"
                                placeholder="First Name"
                                errors={errors}
                                header="First Name:"
                                register={register("firstName", { required: true })}
                            />
                        </FormGroup>
                        <FormGroup>
                            <InputWithLabel
                                id="lastName"
                                name="lastName"
                                placeholder="Last Name"
                                header="Last Name:"
                                errors={errors}
                                register={register("lastName", { required: true })}

                            />
                        </FormGroup>
                        <FormGroup>
                            <ImageInputWithPreview
                                id='imageFile'
                                name='imageFile'
                                header="Image:"
                                defaultImgSrc={preLoadedValues ? `/api/person/${preLoadedValues.id}/image/download` : null}
                                register={register("imageFile")}
                                errors={errors}
                                imgMaxWidth="150px"
                            />
                        </FormGroup>

                        <FormGroup>
                            <InputWithLabel
                                id="birthDate"
                                name="birthDate"
                                placeholder="birthDate"
                                type="date"
                                header="Birth Date:"
                                errors={errors}
                                register={register("birthDate", { required: true })}

                            />
                            <p
                                style={{ color: "#b1b2af", fontSize: "1rem" }}
                            >(Day.Month.Year, exp: 08.01.1998)</p>

                        </FormGroup>
                        <FormGroup>
                            <SelectBox items={["Actor", "Actress", "Producer", "Director", "Writer"]}
                                onChange={handleSelectChange}
                                name="qualities"
                                selectedItems={qualities}
                                register={register}
                                errors={errors}
                                onClick={removeItemFromQualities}
                                header="Qualities:"
                            />

                        </FormGroup>
                        <FormGroup style={{ width: "100%" }}>
                            <Button type="submit">Save</Button>
                        </FormGroup>

                    </FormGroup>
                </Form>

            </div>
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
