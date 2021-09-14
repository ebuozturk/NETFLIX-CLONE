import { useState, useEffect } from 'react';

const useForm = (callback, validate, name) => {
    var initialState = {}
    const formData = new FormData()
    if (name === "genre") {
        initialState = {
            name: '',
            description: '',
        }
    }
    if (name === "person") {
        initialState = {
            firstName: '',
            lastName: '',
            imageUrl: '',
            birthDate: '',
            qualities: [],
        }
    }
    if (name === "movie") {
        initialState = {
            name: '',
            imdb: '',
            storyline: '',
            imageFile: '',
            videoFile: '',
            logoFile: '',
            detailPosterFile: '',
            releaseYear: '',
            ageRestriction: '',
            length: '',
            categories: [],
            directors: [],
            cast: [],
        }
    }
    const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
    };
    const handleChangeArray = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: [...values[name], value]
        })
    }
    const handleChangeFile = e => {

        const { name, files } = e.target;
        return setValues({
            ...values,
            [name]: files[0]
        })

    }

    const handleSubmit = e => {
        e.preventDefault();
        setErrors(validate(values, name));
        setIsSubmitting(true);
    };

    useEffect(
        () => {
            if (Object.keys(errors).length === 0 && isSubmitting) {
                callback(values);
            }
        },
        [errors]
    );

    return { handleChange, handleChangeArray, handleChangeFile, handleSubmit, values, errors };
};

export default useForm;