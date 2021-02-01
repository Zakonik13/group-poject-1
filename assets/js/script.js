// grab UI elements
const form = document.querySelector('.modal-form');
const searchInput = document.querySelector('#text-input');
const movieContainer = document.querySelector('.movies');


// fetch request
const fetchApi = () => {
    // Closes modal after "Go" is pressed
    modal.style.display = "none";
    // get input value
    const searchValue = searchInput.value;

    const API_KEY = '4fb1298fc0a39cf1bc75ce5b8dbaca5d';
    const URL = 'https://api.themoviedb.org/3/search/movie?';

    // make fetch request
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

    // clear movie container
    movieContainer.textContent = '';
    // clear search input
    searchInput.value = '';
}

// movie posters
function imageSection(movie, search) {
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
    // displayModal(imageContainer);

    imageContainer.addEventListener('click', () => {
        let movieTitle = movie.title;
        getVideo(movieTitle);
        console.log(movieTitle);
    });

}

//get video from youtube
function getVideo(search) {
    const API_KEY = 'AIzaSyCRTf7HPvvpO0-iXxO9hCUGaA0B19DJBz4';
    const URL = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1';

    const videoContainer = document.querySelector('#my-modal');
    fetch(`${URL}&q=${search}&key=${API_KEY}`)
        .then(res => res.json())
        .then(data => {

            // video id
            const video_Id = data.items[0].id.videoId;
            console.log(video_Id)

            let output = `
            <iframe width="400" height="315" src="https://www.youtube.com/embed/${video_Id}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            `
            videoContainer.innerHTML += output;
        }).catch(error => alert('No trailer found', error));


}


// TESTING
let modal = document.getElementById("my-modal");
let btnOpen = document.getElementById("btn1");
let btnClose = document.getElementById("close-modal");

btnOpen.onclick = function () {
    modal.style.display = "block";
}

btnClose.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
//TESTING END

// add event listeners
form.addEventListener('submit', (e) => {
    e.preventDefault();
    fetchApi();
});
