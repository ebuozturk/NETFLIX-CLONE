import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import LoadingPage from "../tools/LoadingPage"
import "./RowList.css"
import axios from "axios"


const RowList = ({ moviesP, fetchUrl, title, person }) => {

    const [movies, setMovies] = useState([{
        id: '',
        name: '',
        imageUrl: ''
    }])
    const [isShown, setIsShown] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const link = person ? "/person/" : "/movie/"

    const fetchMovies = async (url) => {
        const result = await axios.get(url)
            .catch(err => console.log("Error: ", err))
        if (result)
            setMovies(result.data.data)
    }

    useEffect(() => {
        if (fetchUrl) {
            setIsLoading(true)
            fetchMovies(fetchUrl)
            setIsLoading(false)
        }
        else {
            setMovies(moviesP)
        }
    }, [])

    if (isLoading) {
        return (
            <div className="row-list d-flex justify-content-center align-items-center">
                <LoadingPage />
            </div>
        )
    }
    return (
        <div className="row mt-2 row-list">
            <h3 className="ml-4">
                {title}
            </h3>
            <div className="row-posters">

                {
                    movies.map(movie => (

                        <Link to={link + movie.id}><img src={`/api/movie/${movie.id}/image/poster/download`} alt={movie.name} className="row-poster" />

                        </Link>

                    ))
                }

            </div>
        </div>
    )

}


export default RowList;