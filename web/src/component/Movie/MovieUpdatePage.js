import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import axios from "axios"
import MovieAddForm from './MovieAddForm'


const MovieUpdatePage = () => {
    const [movie, setMovie] = useState(null)
    const { movieId } = useParams()

    useEffect(() => {
        function fetchMovie(id) {
            axios("/api/movie/" + id)
                .then(res => res.data)
                .then(data => setMovie(data.data))

        }
        fetchMovie(movieId)
    }, [])
    return (
        <div>

            {
                movie !== null ? <MovieAddForm preloadedValues={movie} /> : <h2>Loading</h2>

            }
        </div>
    )
}

export default MovieUpdatePage;