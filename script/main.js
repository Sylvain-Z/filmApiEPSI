const ApiKey = "1e232981";
const ApiUrl = "http://www.omdbapi.com/";

let currentPage = 1;

const searchValue = document.getElementById('search-input').value; // Search input value
const searchButton = document.getElementById('search-input'); // Search button Enter key event

/* --------------------------------------------------------- MAIN PAGE --------------------------------------------------------- */
/* --------------------------------------------------------- MAIN PAGE --------------------------------------------------------- */


async function getMovies() {

    const isYear = /^\d{4}$/.test(searchValue); // Check if the search value is a year
    if (!isYear) {
        response = await fetch(`${ApiUrl}?apikey=${ApiKey}&s=${encodeURIComponent(searchValue)}&page=${currentPage}`);
    } else {
        response = await fetch(`${ApiUrl}?apikey=${ApiKey}&s=${encodeURIComponent(searchValue)}&y=${encodeURIComponent(searchValue)}page=${currentPage}`);
    }

    data = await response.json();

    const moviesContainer = document.getElementById('movies-container');
    moviesContainer.innerHTML = ''; // Clear previous results

    if (data.Search) {
        data.Search.forEach(movie => {
            const moviesCard = document.createElement('div');
            moviesCard.className = "movie-card";
            moviesCard.addEventListener('click', () => getMovieDetails(movie.imdbID)); // Click event to show movie details

            const image = document.createElement('img');

            if (movie.Poster === 'N/A') {
                const noImage = document.createElement('div');
                noImage.className = 'noImage';
            } else {
                image.src = movie.Poster;
                image.alt = `${movie.Title} poster`;
            }

            const info = document.createElement('div');

            const title = document.createElement('h3');
            title.textContent = movie.Title;

            const year = document.createElement('p');
            year.textContent = movie.Year;

            info.appendChild(title);
            info.appendChild(year);

            moviesCard.appendChild(image);
            moviesCard.appendChild(info);
            moviesContainer.appendChild(moviesCard);
        });

        setupPagination(parseInt(data.totalResults));
    }
}

function setupPagination(totalResults) {
    const paginationContainer = document.getElementById('pagination-container');
    paginationContainer.innerHTML = ''; // Clear previous pagination

    const totalPages = Math.ceil(totalResults / 10);

    // First button
    if (currentPage > 1) {
        const firstButton = document.createElement('button');
        firstButton.textContent = '<';
        firstButton.className = 'page-button';
        firstButton.addEventListener('click', () => {
            currentPage = 1;
            getMovies();
        });
        paginationContainer.appendChild(firstButton);
    }

    // Previous button
    if (currentPage > 1) {
        const prevButton = document.createElement('button');
        prevButton.textContent = '<<';
        prevButton.className = 'page-button';
        prevButton.addEventListener('click', () => {
            currentPage--;
            getMovies();
        });
        paginationContainer.appendChild(prevButton);
    }

    // Page numbers, display 2 pages before and after the current page
    for (let i = Math.max(1, currentPage - 2); i <= Math.min(totalPages, currentPage + 2); i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.className = 'page-button';
        if (i === currentPage) {
            pageButton.classList.add('current-page');
        }
        pageButton.disabled = i === currentPage;
        pageButton.addEventListener('click', () => {
            currentPage = i;
            getMovies();
        });
        paginationContainer.appendChild(pageButton);
    }

    // Next button
    if (currentPage < totalPages) {
        const nextButton = document.createElement('button');
        nextButton.textContent = '>';
        nextButton.className = 'page-button';
        nextButton.addEventListener('click', () => {
            currentPage++;
            getMovies();
        });
        paginationContainer.appendChild(nextButton);
    }

    // Last button
    if (currentPage < totalPages) {
        const lastButton = document.createElement('button');
        lastButton.textContent = '>>';
        lastButton.className = 'page-button';
        lastButton.addEventListener('click', () => {
            currentPage = totalPages;
            getMovies();
        });
        paginationContainer.appendChild(lastButton);
    }
}

/* --------------------------------------------------------- DETAIL PAGE --------------------------------------------------------- */
/* --------------------------------------------------------- DETAIL PAGE --------------------------------------------------------- */

async function getMovieDetails(movieID) {
    const response = await fetch(`${ApiUrl}?apikey=${ApiKey}&i=${movieID}`);
    const movie = await response.json();

    console.log("movie details", movie);

    const moviesContainer = document.getElementById('movies-container');
    moviesContainer.innerHTML = ''; // Clear previous results

    const movieDetailsCard = document.createElement('div');
    movieDetailsCard.className = "movie-details-card";

    const image = document.createElement('img');
    image.src = movie.Poster;
    image.alt = `${movie.Title} poster`;

    const rigthCol = document.createElement('div');
    rigthCol.className = "right-col";
    const info = document.createElement('div');
    info.className = "movie-info";

    const title = document.createElement('h2');
    title.textContent = movie.Title;

    const year = document.createElement('p');
    year.textContent = `Year: ${movie.Year}`;

    const plot = document.createElement('p');
    plot.textContent = `Plot: ${movie.Plot}`;

    const director = document.createElement('p');
    director.textContent = `Director: ${movie.Director}`;

    const actors = document.createElement('p');
    actors.textContent = `Actors: ${movie.Actors}`;

    const backButton = document.createElement('button');
    backButton.className = 'back-button';
    backButton.textContent = 'Back to list';
    backButton.addEventListener('click', getMovies);


    info.appendChild(title);
    info.appendChild(year);
    info.appendChild(plot);
    info.appendChild(director);
    info.appendChild(actors);
    rigthCol.appendChild(info);
    rigthCol.appendChild(backButton);

    movieDetailsCard.appendChild(image);
    movieDetailsCard.appendChild(rigthCol);

    moviesContainer.appendChild(movieDetailsCard);
}




// Initial load
document.addEventListener('DOMContentLoaded', () => {

    // Event listener for the search button click
    document.getElementById('search-button').addEventListener('click', () => {
        currentPage = 1; // Reset to first page on new search
        getMovies();
    });
    // Event listener for the search Enter key
    document.getElementById('search-input').addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            currentPage = 1; // Reset to first page on new search
            getMovies();
        }
    });

});
