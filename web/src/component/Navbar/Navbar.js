import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link, useHistory } from "react-router-dom"
import logo from "../../img/logo.png"
import DropDown from "../tools/DropDown"
import './navbar.css'
import { getAllGenres } from "../../redux/action/genreActions"
import SearchBox from "../tools/SearchBox"



const Navbar = (props) => {
    const [show, setShow] = useState(false)
    const genres = useSelector(state => state.genres)
    const user = useSelector(state => state.user)
    const history = useHistory();
    const isVisible = props.showHeader ? "visible" : "hidden"
    const dispatch = useDispatch()
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                setShow(true);
            } else setShow(false);
        });
        if (user.isLogged)
            getAllGenres()(dispatch)

    }, [user])

    if (!user.isLogged) {
        return (
            <>
            </>
        )
    }

    return (
        <nav className={show ? "nav nav-black" : "nav"} style={{ visibility: `${props.showHeader ? "visible" : "hidden"}` }}>

            <div className="nav-left">
                <div className="logo"><Link to="/"><img src={logo} alt="netflix-logo" /></Link></div>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><DropDown title="Movies" url="/genre/" names={genres} /></li>
                    {/* <li><DropDown title="Lists" names={user.user.lists} /></li> */}
                </ul>
            </div>

            <div className="nav-right">
                <div className="search-box d-flex align-items-center mr-4">
                    <SearchBox />
                </div>
                <div className="bell d-flex align-items-center mr-4">
                    <i class="fas fa-bell"></i>
                </div>
                <div className="user-detail">

                    <DropDown user={user.user} />
                </div>

            </div>
        </nav>

    )
}


export default Navbar;