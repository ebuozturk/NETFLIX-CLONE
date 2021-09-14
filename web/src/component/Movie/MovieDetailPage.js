import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams, Link, useHistory } from "react-router-dom"
import Button from "../tools/Button"
import LoadingPage from "../tools/LoadingPage"
import './movieDetailPage.css'
import { convertMinuteToHM } from "../../utils/appFunctions"
import { getMovieById } from "../../services/movieServices"

const MovieDetailPage = () => {

    const { movieId } = useParams()
    const history = useHistory()
    const [movie, setMovie] = useState();
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true)
    const user = useSelector(state => state.user)

    const getMovie = async () => {
        setMovie(await getMovieById(movieId))
        await setIsLoading(false)
    }
    useEffect(() => {
        getMovie()
    }, [])

    return (
        !isLoading ?
            (<div className="movie-detail-body"
                style={{ backgroundImage: `url("/api/movie/${movie.id}/image/detailPoster/download")` }}
            >
                <div className="movie-detail-content">
                    <img src={`/api/movie/${movie.id}/image/logo/download`} alt={movie.name} />
                    <h2>{movie.name} </h2>
                    <p className="movie-details">{movie.releaseYear} | <span className="restriction">{movie.ageRestriction}</span> | {convertMinuteToHM(movie.length)} | <Link to={`/genre/${movie.categories[0].name}/${movie.categories[0].id}`}>{movie.categories[0].name}</Link></p>
                    <p>{movie.storyline}</p>
                    <p className="movie-starring">Starring: {
                        movie.cast.map(star => (
                            <Link to={"/person/" + star.id}>{star.name}, </Link>
                        ))
                    }</p>
                    <Button icon='play' content='Play' onClick={() => history.push("/movie/watch/" + movie.id)} />
                    {user.user.role === "ADMIN" ? <Button icon='edit' content='Edit' onClick={() => history.push("/updateMovie/" + movie.id)} />
                        : ""}
                </div>
            </div>) : <LoadingPage />
    )
}

export default MovieDetailPage;