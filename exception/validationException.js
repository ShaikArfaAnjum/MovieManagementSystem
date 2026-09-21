
class ValidationException extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationException";
    }
}

// Simple function to validate movie form data
function validateMovie(movie) {
    const errors = [];

    // Title validation
    if (!movie.title || movie.title.trim() === "") {
        errors.push("Movie title is required.");
    }

    // Genre validation
    if (!movie.genre || movie.genre.trim() === "") {
        errors.push("Please select a genre.");
    }

    // Language validation
    if (!movie.language || movie.language.trim() === "") {
        errors.push("Please select a language.");
    }

    // Release Year validation
    const currentYear = new Date().getFullYear();
    const year = Number(movie.releaseYear);
    if (!year || year < 1900 || year > currentYear + 5) {
        errors.push("Please enter a valid release year (e.g., 2024).");
    }

    // Rating validation (0 to 10)
    const rating = Number(movie.rating);
    if (isNaN(rating) || rating < 0 || rating > 10) {
        errors.push("Rating must be a number between 0 and 10.");
    }

    // Duration validation
    if (!movie.duration || movie.duration.trim() === "") {
        errors.push("Duration is required (e.g., '150 min').");
    }

    // Description validation
    if (!movie.description || movie.description.trim() === "") {
        errors.push("Description is required.");
    }

    // If any validation failed, throw our custom ValidationException
    if (errors.length > 0) {
        throw new ValidationException(errors.join("\n"));
    }

    return true;
}
