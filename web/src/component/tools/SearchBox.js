import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { getMoviesBySearch } from "../../redux/action/movieActions"
import "./SearchBox.css"

const SearchBox = () => {
    const dispatch = useDispatch()
    const [isShown, setIsShown] = useState(false)
    const handleOnChange = async (event) => {
        var search = event.target.value
        if (search !== "") {
            dispatch({ type: 'SEARCHING' })
            await getMoviesBySearch(search)(dispatch)
        }
        else {
            dispatch({ type: 'NOT_SEARCHING' })
        }

    }

    return (
        <div className="search-box">
            <i class={"fas fa-search search-button mr-2" + (isShown ? " animate" : "")}
                onClick={() => isShown ? setIsShown(false) : setIsShown(true)}

            ></i>

            <input type="text"
                className="search-input"
                style={isShown ? { width: "250px", visibility: "visible" } : { width: "0px" }}
                onChange={handleOnChange}
                placeholder="Type to search"
            />
            <div className="search-result">

            </div>
        </div>
    )
}

export default SearchBox