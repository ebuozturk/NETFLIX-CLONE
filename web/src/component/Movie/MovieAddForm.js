import React, { useEffect, useState, useCallback, useRef } from 'react'
import styled from "styled-components"
import { useSelector } from "react-redux"
import axios from "axios"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"
import { convertMinuteToHM } from '../../utils/appFunctions'
import SelectBox from '../tools/SelectBox'
import { useHistory } from 'react-router-dom'
import ImageInputWithPreview from '../tools/ImageInputWithPreview'
import VideoInputWithPreview from '../tools/VideoInputWithPreview'
import InputWithLabel from '../tools/InputWithLabel'
import TextAreaWithLabel from '../tools/TextAreaWithLabel'
import SendingPage from '../tools/SendingPage'


const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    imdb: yup.number().typeError("Imdb rate must be a number")
        .min(0, "Imdb rate must be between 0-10")
        .max(10, "Imdb rate must be between 0-10")
        .required("Imdb rate is required"),
    releaseYear: yup.number().typeError("Year must be a number")
        .required("Release year is required"),
    ageRestriction: yup.string().required("Age restriction is required"),
    length: yup.number().required("Movie length is required")
        .typeError("Movie length must be a number")
    ,
    // categories: yup.object()
    //     .required("At least 1 genre is required"),
    // directors: yup.object().typeError("At least 1 director is required")
    //     .required("At least 1 person is required"),
    // cast: yup.object().typeError("At least 1 star is required")
    //     .required("At least 1 star is required"),
    storyline: yup.string().required("Storyline is required"),
    // imageFile: yup.mixed().required()
    //     .test("fileSize", "Poster is required", (value) => {
    //         if (!value.length) return false // attachment is optional
    //         return true
    //         // return value && value[0].size <= 200000
    //     })
    //     .test("fileSize", "The file is too large", (value) => {
    //         if (!value.length) return true // attachment is optional
    //         return value[0].size <= 2000000
    //         // return value && value[0].size <= 200000
    //     }),
    // detailPosterFile: yup.mixed().required()
    //     .test("fileSize", "Detail poster is required", (value) => {
    //         if (!value.length) return false // attachment is optional
    //         return true
    //         // return value && value[0].size <= 200000
    //     })
    //     .test("fileSize", "The file is too large", (value) => {
    //         if (!value.length) return true // attachment is optional
    //         return value[0].size <= 2000000
    //         // return value && value[0].size <= 200000
    //     }),
    // logoFile: yup.mixed().required()
    //     .test("fileSize", "Logo is required", (value) => {
    //         if (!value.length) return false // attachment is optional
    //         return true
    //         // return value && value[0].size <= 200000
    //     })
    //     .test("fileSize", "The file is too large", (value) => {
    //         if (!value.length) return true // attachment is optional
    //         return value[0].size <= 2000000
    //         // return value && value[0].size <= 200000
    //     }),
    // videoFile: yup.mixed().required()
    //     .test("fileSize", "Video is required", (value) => {
    //         if (!value.length) return false // attachment is optional
    //         return true
    //         // return value && value[0].size <= 200000
    //     })



})
export default function MovieAddForm({ preloadedValues }) {

    const genres = useSelector(state => state.genres)
    const [persons, setPersons] = useState([])
    const [convertMinute, setConvertMinute] = useState("")
    const [isSending, setIsSending] = useState(false);
    const [formArrays, setFormArrays] = useState({
        categories: [],
        cast: [],
        directors: []
    })
    const history = useHistory()

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: preloadedValues,
        mode: "onBlur",
        resolver: yupResolver(schema),
    })


    const fetchAllPersons = async () => {
        axios.get("/api/person")
            .then(res => res.data)
            .then(data => {
                if (data.success) {
                    setPersons(data.data)
                }
            }).catch(err => console.log(err.message))

    }

    useEffect(() => {
        fetchAllPersons()
        if (preloadedValues) {
            setFormArrays({
                categories: preloadedValues.categories,
                cast: preloadedValues.cast,
                directors: preloadedValues.directors
            })
        }
    }, []);

    const onSubmit = async (data) => {
        await setIsSending(true)
        if (preloadedValues?.id) {
            data.id = preloadedValues.id
        }
        data.categories = formArrays.categories;
        data.directors = formArrays.directors
        data.cast = formArrays.cast
        data.imageFile = data.imageFile.length > 0 ? data.imageFile[0] : null
        data.detailPosterFile = data.detailPosterFile.length > 0 ? data.detailPosterFile[0] : null
        data.logoFile = data.logoFile.length > 0 ? data.logoFile[0] : null
        data.videoFile = data.videoFile.length > 0 ? data.videoFile[0] : null

        var form = new FormData();
        form.append('movie', new Blob([JSON.stringify({
            "id": data.id,
            "name": data.name,
            "imdb": data.imdb,
            "releaseYear": data.releaseYear,
            "ageRestriction": data.ageRestriction,
            "length": data.length,
            "categories": data.categories,
            "cast": data.cast,
            "directors": data.directors,
            "storyline": data.storyline
        })], {
            type: "application/json"
        }));
        form.append("imageFile", data.imageFile)
        form.append("logoFile", data.logoFile)
        form.append("detailPosterFile", data.detailPosterFile)
        form.append("videoFile", data.videoFile)

        let url = ""
        if (preloadedValues)
            url = `/api/movie/update/${preloadedValues.id}`
        else
            url = "/api/movie/upload"

        console.log(data)

        axios.post(url, form, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
        }
        ).then(result => {
            if (result.data.success) {
                setIsSending(false)
                history.push("/successResult/Movie")
            }
        })
            .catch(err => {
                console.log(err.response)
                setIsSending(false)
                history.push("/errorResult/Movie")
            })

    }
    const handleLengthChange = (e) => {
        setConvertMinute(convertMinuteToHM(e.target.value))

    }
    const handleSelectChange = (e) => {
        const { value, name } = e.target
        if (!(formArrays[name].filter(item => item.id === JSON.parse(value).id).length > 0))
            setFormArrays({
                ...formArrays,
                [name]: [...formArrays[name], JSON.parse(value)]
            })

    }
    const removeItemFromArray = (arrayName, itemId) => {
        var newArray = formArrays[arrayName].filter(item => {
            if (item.id !== itemId) {
                return item;
            }
        })
        setFormArrays({
            ...formArrays,
            [arrayName]: newArray
        })
    }


    return (

        <div style={{ position: "relative" }}>

            {isSending ? <SendingPage /> : null}
            <div className="w-100 d-flex flex-column align-items-center justify-content-center">

                <Form
                    id="form"
                    name="form"
                    className="w-75 d-flex flex-wrap justify-content-start"
                    enctype="multipart/form-data"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <FormHeader>Movie Add</FormHeader>

                    <FormGroup>
                        <InputWithLabel
                            id="name"
                            name="name"
                            header="Name:"
                            register={register("name", { required: true })}
                            placeholder="Name"
                            errors={errors}
                        />
                    </FormGroup>
                    <FormGroup>
                        <InputWithLabel
                            id="imdb"
                            name="imdb"
                            placeholder="Imdb"
                            header="Imdb:"
                            errors={errors}
                            register={register("imdb", { required: true })}
                        />
                    </FormGroup>
                    <FormGroup>
                        <InputWithLabel
                            id="releaseYear"
                            name="releaseYear"
                            placeholder="Year"
                            header="Year:"
                            errors={errors}
                            register={register("releaseYear", { required: true })}
                        />
                    </FormGroup>
                    <FormGroup>
                        <InputWithLabel
                            id="ageRestriction"
                            name="ageRestriction"
                            placeholder="Age"
                            header="Age:"
                            errors={errors}
                            register={register("ageRestriction", { required: true })}
                        />
                    </FormGroup>
                    <FormGroup>
                        <InputWithLabel
                            id="length"
                            name="length"
                            placeholder="Length"
                            header="Length(By minute):"
                            errors={errors}
                            register={register("length", { required: true })}
                            onChange={handleLengthChange}
                        />
                        {convertMinute && <p
                            style={{ color: "#b1b2af", fontSize: "1rem" }}
                        >({convertMinute})</p>}

                    </FormGroup>
                    <FormGroup>
                        <SelectBox items={genres}
                            onChange={handleSelectChange}
                            onClick={removeItemFromArray}
                            name="categories"
                            selectedItems={formArrays["categories"]}
                            register={register}
                            errors={errors}
                            header="Genre:"
                        />

                    </FormGroup>
                    <FormGroup>
                        <SelectBox items={persons}
                            onChange={handleSelectChange}
                            onClick={removeItemFromArray}
                            name="cast"
                            selectedItems={formArrays["cast"]}
                            register={register}
                            errors={errors}
                            header="Cast:"

                        />
                    </FormGroup>
                    <FormGroup>
                        <SelectBox items={persons}
                            onChange={handleSelectChange}
                            onClick={removeItemFromArray}
                            name="directors"
                            selectedItems={formArrays["directors"]}
                            register={register}
                            errors={errors}
                            header="Director:"
                        />
                    </FormGroup>
                    <FormFileGroup>
                        <FormGroup >
                            <ImageInputWithPreview
                                id='imageFile'
                                name='imageFile'
                                defaultImgSrc={preloadedValues ? `/api/movie/${preloadedValues.id}/image/poster/download` : null}
                                register={register("imageFile")}
                                errors={errors}
                                imgMaxWidth="250px"
                                header="Poster:"
                            />

                        </FormGroup>

                        <FormGroup>
                            <ImageInputWithPreview
                                id="logoFile"
                                name="logoFile"
                                defaultImgSrc={preloadedValues ? `/api/movie/${preloadedValues.id}/image/logo/download` : null}
                                register={register("logoFile", { required: true })}
                                errors={errors}
                                imgMaxWidth="250px"
                                header="Logo:"
                            />

                        </FormGroup>
                        <FormGroup>
                            <ImageInputWithPreview
                                id="detailPosterFile"
                                name="detailPosterFile"
                                defaultImgSrc={preloadedValues ? `/api/movie/${preloadedValues.id}/image/detailPoster/download` : null}
                                register={register("detailPosterFile", { required: true })}
                                errors={errors}
                                imgMaxWidth="250px"
                                header="Detail Poster:"
                            />


                        </FormGroup>
                        <FormGroup>
                            <VideoInputWithPreview
                                id="videoFile"
                                name="videoFile"
                                defaultVideoSrc={preloadedValues ? `/api/movie/${preloadedValues.id}/video/download` : null}
                                register={register("videoFile", { required: true })}
                                errors={errors}
                                videoMaxWidth="250px"
                                header="Video:"
                            />
                        </FormGroup>

                    </FormFileGroup>


                    <FormGroup style={{ width: "100%" }}>
                        <TextAreaWithLabel
                            id="storyline"
                            name="storyline"
                            placeholder="storyline"
                            register={register("storyline", { required: true })}
                            errors={errors}
                            header="Storyline:"
                            type="textarea"
                            style={{ minWidth: "50vw" }}

                        />

                    </FormGroup>
                    <FormGroup >
                        <Button type="submit">Save</Button>

                    </FormGroup>

                </Form>

            </div >
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


