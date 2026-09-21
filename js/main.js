// Main JavaScript - Handles DOM events, UI rendering, and user actions

let movies = []; // Stores all movies loaded from the backend


const isIndexPage = document.getElementById("moviesGrid") !== null;
const isDetailsPage = document.getElementById("movieDetailsContainer") !== null;

document.addEventListener("DOMContentLoaded", () => {
    if (isIndexPage) {
        initIndexPage();
    } else if (isDetailsPage) {
        initDetailsPage();
    }
});


function initIndexPage() {
    loadMovies();


    document.getElementById("searchInput").addEventListener("input", applyFilters);
    document.getElementById("genreFilter").addEventListener("change", applyFilters);
    document.getElementById("languageFilter").addEventListener("change", applyFilters);
    document.getElementById("sortFilter").addEventListener("change", applyFilters);
    document.getElementById("favouriteFilter").addEventListener("change", applyFilters);


    document.getElementById("addMovieBtn").addEventListener("click", openAddModal);
    document.getElementById("closeModalBtn").addEventListener("click", closeModal);
    document.getElementById("cancelModalBtn").addEventListener("click", closeModal);


    document.getElementById("movieForm").addEventListener("submit", handleFormSubmit);
}


async function loadMovies() {
    try {
        movies = await getMovies();
        applyFilters();
    } catch (error) {
        handleApiError(error, "Failed to load movies");
    }
}


function applyFilters() {
    const searchText = document.getElementById("searchInput").value.toLowerCase().trim();
    const genre = document.getElementById("genreFilter").value;
    const language = document.getElementById("languageFilter").value;
    const sort = document.getElementById("sortFilter").value;
    const favourite = document.getElementById("favouriteFilter").value;

    // Filter by title
    let result = movies.filter(movie => movie.title.toLowerCase().includes(searchText));

    // Filter by genre
    if (genre !== "All") {
        result = result.filter(movie => movie.genre.toLowerCase() === genre.toLowerCase());
    }

    // Filter by language
    if (language !== "All") {
        result = result.filter(movie => movie.language.toLowerCase() === language.toLowerCase());
    }

    // Filter by favourite
    if (favourite === "fav") {
        result = result.filter(movie => movie.favourite === true);
    }

    // Sort movies
    if (sort === "rating-desc") {
        result.sort((a, b) => b.rating - a.rating);
    } else if (sort === "rating-asc") {
        result.sort((a, b) => a.rating - b.rating);
    } else if (sort === "year-desc") {
        result.sort((a, b) => b.releaseYear - a.releaseYear);
    } else if (sort === "year-asc") {
        result.sort((a, b) => a.releaseYear - b.releaseYear);
    }

    renderMovies(result);
}

function renderMovies(list) {
    const grid = document.getElementById("moviesGrid");
    document.getElementById("moviesCount").textContent = list.length;

    if (list.length === 0) {
        grid.innerHTML = `<p style="grid-column: 1/-1; text-align:center; padding:40px; color:#888;">No movies found.</p>`;
        return;
    }

    grid.innerHTML = list.map(movie => `
        <div class="movie-card">
            <div class="poster-container">
                <img src="${movie.poster}" alt="${movie.title}" class="movie-poster">
                <button class="fav-btn ${movie.favourite ? 'active' : ''}" onclick="toggleFavourite(${movie.id})">
                    ${movie.favourite ? '♥' : '♡'}
                </button>
            </div>
            <div class="card-body">
                <h3 class="movie-title">${movie.title}</h3>
                <p class="movie-info">${movie.releaseYear} • ${movie.duration} • ${movie.genre}</p>
                <p class="rating-badge">★ ${movie.rating} / 10</p>
                <div class="card-actions">
                    <button class="btn btn-secondary btn-sm" onclick="viewDetails(${movie.id})">Details</button>
                    <button class="btn btn-secondary btn-sm" onclick="openEditModal(${movie.id})">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="handleDelete(${movie.id})">Delete</button>
                </div>
            </div>
        </div>
    `).join("");
}


function openAddModal() {
    document.getElementById("movieForm").reset();
    document.getElementById("movieId").value = "";
    document.getElementById("modalTitle").textContent = "Add New Movie";
    document.getElementById("saveMovieBtn").textContent = "Save Movie";
    document.getElementById("movieModal").classList.add("active");
}

function openEditModal(id) {
    const movie = movies.find(m => m.id == id);
    if (!movie) return;

    document.getElementById("movieId").value = movie.id;
    document.getElementById("movieTitle").value = movie.title;
    document.getElementById("movieGenre").value = movie.genre;
    document.getElementById("movieLanguage").value = movie.language;
    document.getElementById("movieYear").value = movie.releaseYear;
    document.getElementById("movieRating").value = movie.rating;
    document.getElementById("movieDuration").value = movie.duration;
    document.getElementById("moviePoster").value = movie.poster;
    document.getElementById("movieDescription").value = movie.description;

    document.getElementById("modalTitle").textContent = "Edit Movie";
    document.getElementById("saveMovieBtn").textContent = "Update Movie";
    document.getElementById("movieModal").classList.add("active");
}

function closeModal() {
    document.getElementById("movieModal").classList.remove("active");
}

async function handleFormSubmit(event) {
    event.preventDefault();

    const movieId = document.getElementById("movieId").value;
    const movieData = {
        title: document.getElementById("movieTitle").value.trim(),
        genre: document.getElementById("movieGenre").value,
        language: document.getElementById("movieLanguage").value,
        releaseYear: Number(document.getElementById("movieYear").value),
        rating: Number(document.getElementById("movieRating").value),
        duration: document.getElementById("movieDuration").value.trim(),
        poster: document.getElementById("moviePoster").value.trim() || "../assets/posters/inception.jpg",
        description: document.getElementById("movieDescription").value.trim()
    };

    try {
        validateMovie(movieData); 

        if (movieId) {
            const existing = movies.find(m => m.id == movieId);
            movieData.favourite = existing ? existing.favourite : false;
            await updateMovie(movieId, movieData);
            showToast("Movie updated successfully!");
        } else {
            movieData.favourite = false;
            await addMovie(movieData);
            showToast("Movie added successfully!");
        }

        closeModal();
        await loadMovies();
    } catch (error) {
        if (error.name === "ValidationException") {
            alert(error.message);
        } else {
            handleApiError(error, "Failed to save movie");
        }
    }
}


async function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this movie?")) return;

    try {
        await deleteMovie(id);
        showToast("Movie deleted successfully!");
        await loadMovies();
    } catch (error) {
        handleApiError(error, "Failed to delete movie");
    }
}

async function toggleFavourite(id) {
    const movie = movies.find(m => m.id == id);
    if (!movie) return;

    movie.favourite = !movie.favourite;

    try {
        await updateMovie(id, movie);
        applyFilters();
        showToast(movie.favourite ? "Added to favourites ♥" : "Removed from favourites ♡");
    } catch (error) {
        handleApiError(error, "Failed to update favourite");
    }
}

function viewDetails(id) {
    window.location.href = `details.html?id=${id}`;
}


async function initDetailsPage() {
    const container = document.getElementById("movieDetailsContainer");
    const id = getQueryParam("id");

    if (!id) {
        container.innerHTML = `<p style="text-align:center; padding:40px;">No movie selected.</p>`;
        return;
    }

    try {
        const movie = await getMovieById(id);
        container.innerHTML = `
            <div class="details-box">
                <img src="${movie.poster}" alt="${movie.title}" class="details-poster">
                <div class="details-content">
                    <h1>${movie.title}</h1>
                    <div class="details-meta">
                        <span>★ ${movie.rating} / 10</span>
                        <span>${movie.genre}</span>
                        <span>${movie.language}</span>
                        <span>${movie.releaseYear}</span>
                        <span>${movie.duration}</span>
                    </div>
                    <p class="details-plot">${movie.description}</p>
                    <div class="details-actions">
                        <button id="detailsFavBtn" class="btn ${movie.favourite ? 'btn-danger' : 'btn-secondary'}" onclick="toggleDetailsFav(${movie.id})">
                            ${movie.favourite ? '♥ Favourite' : '♡ Add to Favourite'}
                        </button>
                        <button class="btn btn-danger" onclick="deleteFromDetails(${movie.id})">Delete</button>
                        <a href="index.html" class="btn btn-secondary">← Back to Movies</a>
                    </div>
                </div>
            </div>
        `;
    } catch (error) {
        handleApiError(error, "Failed to load movie details");
    }
}

async function toggleDetailsFav(id) {
    try {
        const movie = await getMovieById(id);
        movie.favourite = !movie.favourite;
        await updateMovie(id, movie);
        initDetailsPage(); // Re-render details view
        showToast(movie.favourite ? "Added to favourites ♥" : "Removed from favourites ♡");
    } catch (error) {
        handleApiError(error, "Failed to update favourite");
    }
}

async function deleteFromDetails(id) {
    if (!confirm("Are you sure you want to delete this movie?")) return;
    try {
        await deleteMovie(id);
        alert("Movie deleted successfully!");
        window.location.href = "index.html";
    } catch (error) {
        handleApiError(error, "Failed to delete movie");
    }
}
