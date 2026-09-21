# 🎬 Movie Management System (CineManage)

A student-level, modern web application built using **HTML, CSS, Vanilla JavaScript (DOM), Axios, and JSON Server**. Designed with a clean Netflix/IMDb-inspired interface for managing movies.

---

## 📌 1. Project Purpose

The purpose of this project is to demonstrate core frontend web development principles and asynchronous API communication without relying on heavy frameworks like React, Angular, or backend frameworks like Express. It illustrates:
- How HTML structures web content.
- How CSS styles modern, responsive user interfaces.
- How Vanilla JavaScript and the DOM manipulate the webpage dynamically.
- How Axios performs asynchronous HTTP requests (`GET`, `POST`, `PUT`, `DELETE`) to a REST API.
- How JSON Server acts as a simulated backend database using `db.json`.

---

## 🛠️ 2. Technologies Used

* **HTML5**: Page structure and semantic elements.
* **CSS3**: Modern dark cinema theme, CSS Grid, Flexbox, transitions, and modals (no external CSS frameworks).
* **Vanilla JavaScript (ES6+)**: Dynamic DOM manipulation, event listeners, array methods (`filter`, `sort`, `map`), and `async/await`.
* **Axios (CDN)**: Promise-based HTTP client for API requests.
* **Node.js & npm**: Runtime environment and package manager.
* **JSON Server**: Full fake REST API powered by a local `db.json` file.

---

## 📂 3. Mandatory Folder Structure

```text
Movie Management System/
│
├── views/
│   ├── index.html               # Main catalog page (search, filter, sort, movie cards, modal)
│   └── details.html             # Detailed view page for an individual movie
│
├── css/
│   └── style.css                # All styles (custom dark theme, Netflix/IMDb aesthetic)
│
├── js/
│   ├── service/
│   │   ├── apiConfig.js         # Base URL configuration (http://localhost:3000)
│   │   └── movieService.js      # Pure Axios API functions (CRUD operations)
│   │
│   ├── main.js                  # DOM manipulation, card rendering, filtering & events
│   └── utils.js                 # Reusable utility functions (URL params, toast alerts)
│
├── exception/
│   ├── apiException.js          # API network & server error handling
│   └── validationException.js   # Form input validation logic
│
├── assets/
│   └── posters/                 # Local JPEG movie poster images
│
├── db.json                      # JSON database containing 18 curated movies
├── package.json                 # Project configuration and npm scripts
└── README.md                    # Project documentation & viva guide
```

---

## 🚀 4. How to Set Up & Run the Project

### Prerequisites
- [Node.js](https://nodejs.org/) installed (v16 or newer recommended).

### Step 1: Install Dependencies
Open your terminal in the project directory and run:
```bash
npm install
```

### Step 2: Start JSON Server (Backend API)
Start the mock REST API server on port 3000:
```bash
npm start
```
*The API will be live at:* `http://localhost:3000/movies`

### Step 3: Launch the Frontend
Open `views/index.html` in your web browser:
- **Option A**: Double-click on `views/index.html` directly from your file manager.
- **Option B (Recommended)**: Right-click `views/index.html` and select **"Open with Live Server"** in VS Code.

---

## 🌐 5. REST API Endpoints

The application interacts with JSON Server using standard RESTful conventions:

| Method | Endpoint | Description | Service Function |
|---|---|---|---|
| `GET` | `/movies` | Fetch all movies | `getMovies()` |
| `GET` | `/movies/:id` | Fetch single movie by ID | `getMovieById(id)` |
| `POST` | `/movies` | Add a new movie | `addMovie(movieData)` |
| `PUT` | `/movies/:id` | Update an existing movie | `updateMovie(id, movieData)` |
| `DELETE` | `/movies/:id` | Delete a movie by ID | `deleteMovie(id)` |

---

## ✨ 6. Implemented Features

1. **Display Movies**: Shows movies in a responsive card grid with posters, release year, language, rating, and genre tags.
2. **Add Movie**: Modal form with validation to add new movies with full metadata.
3. **Update Movie**: Pre-fills the modal form with existing movie data to edit and save changes.
4. **Delete Movie**: Deletes movies with a user confirmation prompt.
5. **Search**: Instant case-insensitive search by movie title.
6. **Filter by Genre**: Dropdown to filter by Action, Comedy, Drama, Romance, Sci-Fi, Fantasy, and Thriller.
7. **Filter by Language**: Filter between Hindi, Telugu, and English titles.
8. **Sort by Rating & Year**: Sort movies from highest to lowest rating, lowest to highest, newest first, or oldest first.
9. **Toggle Favourite**: Click the heart icon (`♡` / `♥`) to add or remove movies from favourites (persisted in `db.json`).
10. **View Movie Details**: Dedicated `details.html` page showing large poster, storyline, metadata badges, and actions.
11. **Form Validation**: Clean validation preventing empty fields, invalid years, or ratings outside 0–10.
12. **Error Handling**: Graceful error handling for offline server or network failures.

---

## 🎓 7. Key Concepts for Viva / Code Explanation

### HTML (HyperText Markup Language)
The standard markup language used to structure web pages. It defines elements like headings (`<h1>`), paragraphs (`<p>`), containers (`<div>`, `<section>`), forms (`<form>`), and inputs.

### CSS (Cascading Style Sheets)
The styling language used to design the visual appearance of HTML elements. In this project, CSS variables, Flexbox, and CSS Grid create a dark, responsive Netflix/IMDb layout.

### JavaScript
A lightweight, interpreted scripting language that makes web pages interactive. It handles user events, computes logic, and communicates with servers.

### DOM (Document Object Model)
The tree-like programming interface for HTML. JavaScript interacts with the DOM using methods such as `document.getElementById()`, `addEventListener()`, and `innerHTML` to update the user interface dynamically without reloading the page.

### Axios
A popular promise-based HTTP client for the browser and Node.js. It simplifies making HTTP requests compared to native `fetch()`, offering automatic JSON data transformation, request/response intercepting, and cleaner syntax.

### HTTP Requests & Methods
Protocols used for exchanging data between client and server:
- **GET**: Retrieve data from server.
- **POST**: Send new data to server to create a resource.
- **PUT**: Replace/update an existing resource on the server.
- **DELETE**: Remove a resource from the server.

### REST API (Representational State Transfer)
An architectural style for web services where endpoints represent resources (such as `/movies`), and standard HTTP methods define the operations performed on them.

### JSON Server & db.json
- **JSON Server**: An npm package that provisions a complete, working fake REST API in seconds with zero backend code.
- **db.json**: A flat JSON file that serves as the database. When you perform `POST`, `PUT`, or `DELETE`, JSON Server automatically writes updates to this file.

### CRUD Operations
The four foundational operations of persistent storage:
- **C**reate: Adding a new movie via `POST /movies`.
- **R**ead: Viewing movies via `GET /movies` or `GET /movies/:id`.
- **U**pdate: Editing a movie via `PUT /movies/:id`.
- **D**elete: Removing a movie via `DELETE /movies/:id`.
