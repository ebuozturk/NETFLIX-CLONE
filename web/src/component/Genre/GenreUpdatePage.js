import axios from "axios";
import React, { useEffect, useState } from "react"
import { useParams } from "react-router";
import GenreAddForm from "./GenreAddForm";

const GenreUpdatePage = () => {
    const { genreId } = useParams()
    const [genre, setGenre] = useState();
    const getGenreById = async (id) => {
        const result = await axios.get(`/api/genre/${id}`)
            .catch(err => console.log(err))
        if (result.data.success)
            setGenre(result.data.data)
    }
    useEffect(() => {
        getGenreById(genreId)
        return () => {

        };
    }, []);
    return (
        <div>
            <GenreAddForm preLoadedValues={genre} />
        </div>
    )
}

export default GenreUpdatePage