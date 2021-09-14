import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import RowList from "../Lists/RowList"
import fetchRequests from "../../fetchRequests/fetchRequests"
import { useHistory } from "react-router-dom";
import Button from "../tools/Button"
import "./dashboard.css"
import { getRandomMovie } from "../../services/movieServices"
import { removeSelectedMovieSuccess } from "../../redux/action/movieActions"
import LoadingPage from "../tools/LoadingPage"
import FilteredMovies from "../tools/FilteredMovies"
import WelcomePage from "./WelcomePage";


const Dashboard = () => {
    let history = useHistory()
    // const movie = useSelector(state => state.movie)
    const [movie, setMovie] = useState();
    const movies = useSelector(state => state.movies)
    const user = useSelector(state => state.user)
    const isSearching = useSelector(state => state.isSearching)
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)

    const setRandomMovie = async () => {
        setMovie(await getRandomMovie())

    }
    useEffect(() => {
        if (user.isLogged) {
            setRandomMovie()
        }
        return () => {
            dispatch(removeSelectedMovieSuccess());
        }
    }, [user.isLogged])
    if (isLoading) {
        return (
            <div className="dashboard">
                <LoadingPage />
            </div>
        )
    }
    return (
        <div className="dashboard" >
            {user.isLogged ? (

                <div className="banner"
                    style={{
                        backgroundImage: `url("/api/movie/${movie?.id}/image/detailPoster/download")`
                    }}
                >
                    <div className="banner-detail">
                        <img src={`/api/movie/${movie?.id}/image/logo/download`} alt="" className="title-img" />
                        <p>{movie?.storyline}</p>
                        <Button icon='play' content='Play' onClick={() => history.push("/movie/watch/" + movie?.id)} />
                        <Button icon='info-circle' content='More Info' onClick={() => history.push("/movie/" + movie?.id)} />
                    </div>
                    {
                        !isSearching ? (
                            <>
                                <RowList title="Comedy" fetchUrl={fetchRequests.fetchComedyMovies} />
                                <RowList title="Drama" fetchUrl={fetchRequests.fetchDramaMovies} />
                                <RowList title="Fantastic" fetchUrl={fetchRequests.fetchFantasticMovies} />
                                <RowList title="Action" fetchUrl={fetchRequests.fetchActionMovies} />
                            </>
                        ) : (<FilteredMovies title='Search Result' isSearched="true" />)
                    }

                </div>
            )
                : (
                    <WelcomePage />
                )
            }

        </div>
    )

}

export default Dashboard;