import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { getPerson } from "../../redux/action/personActions"
import LoadingPage from "../tools/LoadingPage"
import RowList from "../Lists/RowList"
import Button from "../tools/Button"
import "../Movie/movieDetail.css"
import axios from "axios"

const PersonDetailPage = () => {

    // const person = useSelector(state => state.person)
    const [person, setPerson] = useState();
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()
    const { personId } = useParams()
    const history = useHistory();
    const user = useSelector(state => state.user)

    const getPersonById = async (id) => {
        setIsLoading(true)
        const result = await axios.get(`/api/person/${id}`).catch(err => console.log(err))
        if (result.data.success)
            setPerson(result.data.data)
        setIsLoading(false)


    }
    useEffect(() => {
        // getPerson(personId)(dispatch)
        getPersonById(personId)
    }, [])

    if (isLoading) {
        return (
            <LoadingPage />
        )
    }
    return (
        <div className="container movie-detail-container" >

            <div className="row flex-nowrap">

                <div
                    className="column col-4 pt-5">
                    <div className="detail-image-container d-flex justify-content-center m-2">
                        <img src={`/api/person/${person?.id}/image/download`} alt={person?.name} />
                    </div>
                    {user.user.role === "ADMIN" ?
                        <div
                            style={{ marginLeft: "2rem" }}
                        >
                            <Button
                                icon='edit'
                                content='Edit'
                                onClick={() => history.push("/updatePerson/" + person.id)}

                            />
                        </div>

                        : ""}
                </div>

                <div className="column col-8 wrappercolumn p-5">
                    <div className="row justify-content-between mb-3"><h2>{person?.firstName} {person?.lastName}</h2></div>
                    <div className="row align-items-center">
                        {person?.qualities.map(quality => (<p className="mt-2 mb-1 mr-2">{quality}</p>))}
                    </div>
                    <div className="row"><p className="mt-2 mb-2">Birth Date: {person?.birthDateV2}</p></div>


                    <RowList moviesP={person?.movies} title="Movies" />

                </div>

            </div>
        </div>
    )
}

export default PersonDetailPage;