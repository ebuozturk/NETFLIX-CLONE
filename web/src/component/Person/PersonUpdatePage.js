import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import axios from "axios"
import PersonAddForm from './PersonAddForm'


const PersonUpdatePage = () => {
    const [person, setPerson] = useState(null)
    const { personId } = useParams()

    useEffect(() => {
        function fetchPerson(id) {
            // let response = await axios("/api/person/" + id).then(res => res.data)
            // setPerson(response.data)
            axios("/api/person/" + id)
                .then(res => res.data.data)
                .then(data => setPerson(data))
        }
        fetchPerson(personId)
    }, [])
    return (
        <div>

            {
                person ? <PersonAddForm preLoadedValues={person} /> : <h2>Loading</h2>

            }
        </div>
    )
}

export default PersonUpdatePage;