const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = `${BASE_URL}/discover/movie?sort_by=popularity.desc`;
const IMG_URL = "https://image.tmdb.org/t/p/w1280";
const searchURL = `${BASE_URL}/search/movie?api_key=ebcf0b1ee0f6558fc2854f231f0d6044&query=`;

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const main = document.getElementById("main");

// Get initial movies
getMovies(API_URL);

async function getMovies(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    main.innerHTML = "";
    showMovies(data.results);
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
}

function showMovies(movies) {
  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie-card");
    movieEl.innerHTML = `   <div class="movie">
                <img src="${poster_path ? IMG_URL + poster_path : "https://w7.pngwing.com/pngs/275/309/png-transparent-cinema-film-popcorn-food-film-poster-clapperboard.png"}" alt="${title}">
            </div>
            <div class="movie-info">
                <span class="vote">${vote_average.toFixed(1)}</span>
            </div>
            <div class="overview">
                <h3>${title}</h3>
                <small>
                    ${overview}
                </small>
            </div>
        `;
    main.appendChild(movieEl);
  });
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = searchInput.value.trim();

  if (searchTerm && searchTerm !== "") {
    getMovies(searchURL + searchTerm);

    searchInput.value = "";
  } else {
    window.location.reload();
  }
});
