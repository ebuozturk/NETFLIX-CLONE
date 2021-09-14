import React from 'react'
import PersonAddForm from "./PersonAddForm"
import axios from "axios"
export default function PersonAddPage() {


    const onSubmit = async (data) => {
        const result = await axios.post("/api/person/upload", data)
            .catch(err => console.log("Error: " + JSON.stringify(err)))
        console.log(result)
    }
    return (
        <div>
            <PersonAddForm onSubmit={onSubmit} />
        </div>
    )
}
