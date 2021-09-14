import React from "react"
import "./DropDown.css"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { getGenreSuccess } from "../../redux/action/genreActions"
import avatar from "../../img/avatar.png"

const DropDown = ({ title, url, names, user }) => {

    const dispatch = useDispatch()
    const handleOnClick = (genre) => {
        dispatch(getGenreSuccess(genre))
    }
    if (user) {
        const adminLinks = user.role === "ADMIN" ? (
            <>
                <Link to="/addMovie">Add Movie</Link>
                <Link to="/addPerson">Add Person</Link>
                <Link to="/addGenre" >Add Genre</Link>
            </>
        ) : (<div></div>)
        return (
            <div className="dropdown-div user">
                <div className="user-avatar">
                    <div className="user-img">
                        {user.imageUrl ?
                            <img src={`/api/user/${user.id}/image/download`} />
                            : <img src={avatar} />
                        }
                    </div>
                    <div className="user-img-arrow d-flex align-items-center ml-2">
                        <i class="fas fa-caret-down"></i>
                    </div>
                </div>

                <div className="dropdown-content user-dropdown-content">
                    <Link to="/profile">My Profile</Link>
                    {adminLinks}
                    <Link to="/logout">Logout</Link>

                </div>
            </div>
        )
    }

    return (

        <div className="dropdown-div">
            {title}
            <div className="dropdown-content">
                {
                    names.map(name => (
                        <Link to={url + name.name + "/" + name.id} onClick={() => handleOnClick(name)}
                        > {name.name}</Link>
                    ))
                }

            </div>

        </div >
    )
}
DropDown.defaultProps = {
    names: [],
    user: false
}

export default DropDown;