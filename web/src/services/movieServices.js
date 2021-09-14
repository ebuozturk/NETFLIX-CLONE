import axios from "axios"


export const getMovieById = async (id) => {
    const result = await axios.get(`/api/movie/${id}`)
        .catch(err => console.log(err))
    if (result.data.success) {
        console.log("hey")
        console.log(result.data.data)
        return result.data.data
    }
    else
        return "Movie not found"
}

export const getRandomMovie = async () => {
    const result = await axios.get("/api/movie/randomMovie")

    if (result.data.success) {
        return result.data.data
    }
    else
        return "Movie not found"

}