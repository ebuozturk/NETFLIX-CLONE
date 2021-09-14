import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from "react-router-dom"
import ReactPlayer from "react-player"
import axios from "axios"
export default function MovieWatchPage({ setShowHeader }) {
    const { movieId } = useParams()
    const history = useHistory()
    const [movie, setMovie] = useState({ videoUrl: '' });

    useEffect(() => {
        const getMovie = async () => {
            const result = await axios.get("/api/movie/" + movieId)
                .then(data => data)
                .catch(err => console.log(err))
            if (result.data.success)
                setMovie(result.data.data)


        }
        setShowHeader(false)
        getMovie()
        return () => {
            setShowHeader(true)
        }
    }, [])

    return (
        <div>

            <i class="fas fa-arrow-left" style={{
                fontSize: "35px",
                backgroundColor: "black",
                position: "absolute",
                width: "43px",
                height: "43px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginLeft: "10px",

                zIndex: "10",
                cursor: "pointer"
            }}
                onClick={() => history.goBack()}
            ></i>

            <ReactPlayer playing="true" controls url={`/api/movie/${movie.id}/video/download`} width="100%" height="100vh" />
        </div>

    )
}
