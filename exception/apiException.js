
class ApiException extends Error {
    constructor(message, statusCode) {
        super(message);
        this.name = "ApiException";
        this.statusCode = statusCode;
    }
}

// Simple function to handle API errors and show clear messages to the user
function handleApiError(error, contextMessage = "Operation failed") {
    console.error("API Error Log:", error);

    let userMessage = contextMessage;

    if (error.response) {
        // Server responded with an error status (404, 500, etc.)
        userMessage += ` (Status: ${error.response.status})`;
    } else if (error.request) {
        // Request was sent but JSON Server did not answer (server down)
        userMessage += ": Cannot connect to JSON Server! Please make sure JSON Server is running on port 3000 (run 'npm start').";
    } else {
        // Generic error
        userMessage += `: ${error.message}`;
    }

    alert(userMessage);
}
