export default function validateInfo(values, name) {
    let errors = {};
    if (name === "genre") {
        if (!values.name.trim()) {
            errors.name = 'Genre name required';
        }
        if (!values.description.trim()) {
            errors.description = 'Description required';
        }
    }
    if (name === "person") {
        if (!values.firstName.trim()) {
            errors.firstName = 'First name required';
        }
        if (!values.lastName.trim()) {
            errors.lastName = 'Last name required';
        }
        if (!values.birthDate.trim()) {
            errors.birthDate = 'Birth date required';
        }
        if (!values.imageUrl.trim()) {
            errors.imageUrl = 'Image url required';
        }
        if (values.qualities.length < 1) {
            errors.qualities = 'At least 1 quality required';
        }
    }
    if (name === "movie") {

        if (!values.name.trim()) {
            errors.name = 'Movie name required';
        }
        if (!(values.imdb.trim()) || !(0 <= parseFloat(values.imdb)) || !(parseFloat(values.imdb) <= 10)) {
            errors.imdb = 'Imbd rating must be between 0-10';
        }
        if (!values.videoFile) {
            errors.videoFile = 'Video required';
        }
        if (!values.imageFile) {
            errors.imageFile = 'Poster required';
        }
        if (!values.logoFile) {
            errors.logoFile = 'Logo required';
        }
        if (!values.detailPosterFile) {
            errors.detailPosterFile = 'Detail poster required';
        }
        if (!values.storyline.trim()) {
            errors.storyline = 'Storyline required';
        }
        if (!values.releaseYear.trim() || !(1800 <= parseInt(values.releaseYear.value) <= 2021)) {
            errors.releaseYear = 'Year must be between 1800-2021';
        }
        if (!values.ageRestriction.trim()) {
            errors.ageRestriction = 'Age required';
        }
        if (!values.length.trim()) {
            errors.length = 'Length required';
        }

        if (values.cast.length < 1) {
            errors.cast = 'At least 1 actor required';
        }
        if (values.directors.length < 1) {
            errors.directors = 'At least 1 director required';
        }
        if (values.categories.length < 1) {
            errors.categories = 'At least 1 category required';
        }

    }

    return errors;
}