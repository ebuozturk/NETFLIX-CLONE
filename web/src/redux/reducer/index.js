import { combineReducers } from "redux";
import userReducer from "./userReducer"
import { movieReducer, allMoviesReducer, isSearching } from "./movieReducer"
import { personReducer } from "./personReducer"
import { allGenresReducer, selectedGenre } from "./genreReducer"
const rootReducer = combineReducers({
    user: userReducer,
    movie: movieReducer,
    movies: allMoviesReducer,
    person: personReducer,
    genres: allGenresReducer,
    genre: selectedGenre,
    isSearching: isSearching
});

export default rootReducer;