import React, { useEffect } from "react"
import ColumnList from "../Lists/ColumnList"
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { getMoviesByGenre } from "../../redux/action/movieActions"
import { getGenre } from "../../redux/action/genreActions"
import { removeSelectedMovieSuccess } from "../../redux/action/movieActions"
import "./FilteredMovies.css"

const FilteredMovies = ({ title, isSearched }) => {

    const movies = useSelector(state => state.movies)
    const dispatch = useDispatch()
    const { genreId, genreName } = useParams()
    const genre = useSelector(state => state.genre)




    useEffect(() => {
        if (genreId) {
            getGenre(genreId)(dispatch)
            getMoviesByGenre(genreId)(dispatch)
        }
        return () => {
            dispatch(removeSelectedMovieSuccess());
        }
    }, [])
    return (
        <div className={!isSearched ? "filtered-movie-body" : ""}>
            <ColumnList moviesP={movies} title={genreName ? genreName : title} link="/movie/" desc={genreName ? genre.description : ''} />
        </div>

    )
}
FilteredMovies.defaultProps = {
    isSearched: false
}
export default FilteredMovies;