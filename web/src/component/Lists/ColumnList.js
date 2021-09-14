import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import LoadingPage from "../tools/LoadingPage"
import "./ColumnList.css"
import axios from "axios"


const ColumnList = ({ moviesP, title, link, desc }) => {


    useEffect(() => {

    }, [])

    // if (isLoading) {
    //     return (
    //         <div className="column-list d-flex justify-content-center align-items-center">
    //             <LoadingPage />
    //         </div>
    //     )
    // }
    return (
        <div className="column column-list">
            <h1>
                {title}
            </h1>
            <p>
                {desc}
            </p>
            <div className="column-posters">
                {
                    moviesP.map(movie => (

                        <Link to={link + movie.id}>
                            <img src={`/api/movie/${movie.id}/image/poster/download`} alt={movie.name} className="column-poster" />
                            <span>{movie.name}</span>
                        </Link>

                    ))
                }

            </div>
        </div>
    )

}


export default ColumnList;