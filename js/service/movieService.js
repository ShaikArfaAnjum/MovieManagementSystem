// Movie Service - Handles all API communication with JSON Server using Axios

// Fetch all movies from the backend
async function getMovies() {
    const response = await axios.get(`${BASE_URL}/movies`);
    return response.data;
}

// Fetch a single movie by its ID
async function getMovieById(id) {
    const response = await axios.get(`${BASE_URL}/movies/${id}`);
    return response.data;
}

// Add a new movie
async function addMovie(movieData) {
    const response = await axios.post(`${BASE_URL}/movies`, movieData);
    return response.data;
}

// Update an existing movie by its ID
async function updateMovie(id, movieData) {
    const response = await axios.put(`${BASE_URL}/movies/${id}`, movieData);
    return response.data;
}

// Delete a movie by its ID
async function deleteMovie(id) {
    const response = await axios.delete(`${BASE_URL}/movies/${id}`);
    return response.data;
}
