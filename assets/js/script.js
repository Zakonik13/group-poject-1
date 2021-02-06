// grab UI elements
const searchInput = document.querySelector('#search');
const searchButton = document.querySelector('#submit');
const movieContainer = document.querySelector('.movies');
const image = document.querySelector('.image');
const movieOverview = document.querySelector('.movie-overview');
let droplist = document.querySelector(".drop-content");
let historyArray = [];

// display popular movies when page loads
window.addEventListener('DOMContentLoaded', () => {

    const API_KEY = '4fb1298fc0a39cf1bc75ce5b8dbaca5d';
    const URL = 'https://api.themoviedb.org/3/movie/popular?';

    // make fetch request
    fetch(`${URL}&api_key=${API_KEY}&language=en-US&page=1`)
        .then(res => res.json())
        .then(data => {
            data.results.map(movie => {
                imageSection(movie);
            });
        });
});

// fetch request
const fetchApi = (anchor) => {
    // Clears previous search, prevent duplicating
    droplist.innerHTML = "";
    // Closes modal after "Go" is pressed
    // get input value
    const searchValue = searchInput.value;
    getHistory(searchValue);
    const API_KEY = '4fb1298fc0a39cf1bc75ce5b8dbaca5d';
    const URL = 'https://api.themoviedb.org/3/search/movie?';

    // make fetch request, search modal
    if (searchValue) {
        fetch(`${URL}&api_key=${API_KEY}&query=${searchValue}`)
            .then(res => res.json())
            .then(data => {

                // generate a new array from the old array
                data.results.map(movie => {
                    // check for poster path with value of null
                    if (movie.poster_path) {
                        imageSection(movie);
                    }
                });

            }).catch(error => {
                movieContainer.textContent = 'No Searches found...';
                return error;
            })
        // make fetch request, search history dropdown
    } else if (anchor) {
        fetch(`${URL}&api_key=${API_KEY}&query=${anchor}`)
            .then(res => res.json())
            .then(data => {

                // generate a new array from the old array
                data.results.map(movie => {
                    // check for poster path with value of null
                    if (movie.poster_path) {
                        imageSection(movie);
                    }
                });

            }).catch(error => {
                movieContainer.textContent = 'No Searches found...';
                return error;
            })
    }

    // clear movie container
    movieContainer.textContent = '';
    // clear search input
    searchInput.value = '';
}

// movie posters
function imageSection(movie) {
    const imageContainer = document.createElement('a');
    // add a class
    imageContainer.classList.add('poster');
    // add an attribute
    imageContainer.setAttribute('href', `#`);
    // image path
    const posters = movie.poster_path;
    // create image element
    const img = document.createElement('img');
    // add source
    img.setAttribute('src', `https://image.tmdb.org/t/p/w500/${posters}`);
    img.setAttribute('alt', `${movie.title} poster`);
    // append each image to a separate div
    imageContainer.appendChild(img);
    // append image conatiner to movie container
    movieContainer.appendChild(imageContainer);
    // show modal
    displayModal(imageContainer);
    // make poster clickable
    imageContainer.addEventListener('click', () => {
        let movieTitle = movie.title;
        getVideo(movieTitle);
        modalImage(posters);

        // grab movie overview
        const movie_Overview = movie.overview;
        movieOverview.innerHTML = movie_Overview;
    });
}


// modal image
function modalImage(poster) {
    // clear out img for next image
    image.textContent = '';
    // create a img element for movie poster
    const img = document.createElement('img');
    img.classList.add('modal-image');
    img.setAttribute('src', `https://image.tmdb.org/t/p/w500/${poster}`);

    // append img to image
    image.appendChild(img);
}

// show modal
function displayModal(image) {
    image.addEventListener('click', () => {
        const modalContainer = document.querySelector('.modal-container');
        modalContainer.classList.remove('hide');
    });
}

// close modal
function closeModal() {
    const modalContainer = document.querySelector('.modal-container');
    const btn = document.querySelector('#btn-close');
    btn.addEventListener('click', function () {
        modalContainer.classList.add('hide')
    });
}
closeModal();

//get video from youtube
function getVideo(search) {
    const API_KEY = 'AIzaSyCRTf7HPvvpO0-iXxO9hCUGaA0B19DJBz4';
    const URL = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1';

    const videoContainer = document.querySelector('.video');
    fetch(`${URL}&q=${search}&key=${API_KEY}`)
        .then(res => res.json())
        .then(data => {

            // video id
            const video_Id = data.items[0].id.videoId;
            let output = `
                <iframe width="400" height="315" src="https://www.youtube.com/embed/${video_Id}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                `
            videoContainer.innerHTML += output;

        }).catch(error => alert('No trailer found', error));

    // clear out video container for the next movie
    videoContainer.textContent = '';
}


//Search Modal END

// Capture search history from modal
function getHistory(searchValue) {
    console.log(searchValue)

    historyArray.push(searchValue);
    localStorage.setItem("searched", JSON.stringify(historyArray));

    console.log(historyArray);
    showHistory();
}

function showHistory() {
    let history = JSON.parse(localStorage.getItem("searched")) || [];

    for (i = 0; i < history.length; i++) {

        if (history[i]) {
            newEl = document.createElement("a");
            newEl.setAttribute('class', `a-hover`);
            newEl.innerHTML = history[i] + "<br>";
            droplist.appendChild(newEl);

            newEl.addEventListener("click", function (event) {
                droplist.innerHTML = "";
                let anchor = event.target.textContent;
                fetchApi(anchor);
            })
        }
    }
}


document.getElementById("submit").onclick = function() {fetchApi(searchInput.value)};

searchInput.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("submit").click();
  }
});



// Select Button
const btn = document.querySelector(".btn-toggle");

// Add Event Listener
btn.addEventListener("click", function() {
    var dark = document.body.classList.toggle("dark-theme");
    
    if (!dark) {
        btn.innerHTML = "Dark Mode";
    } else {
        btn.innerHTML = "Light Mode";
    }
}) 


