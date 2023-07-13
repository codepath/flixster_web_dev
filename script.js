const API_KEY  = "ec19ad523e949b880b38dce4fe91d6fe"
let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=ec19ad523e949b880b38dce4fe91d6fe`
let search_url = 'https://api.themoviedb.org/3/search/movie?query='

const form = document.querySelector('#search-form')
const search = document.querySelector('#search-input')
const movieContainer = document.querySelector('#movies-grid')
const loadMore = document.querySelector('#load-more-movies-btn') 
const closeButton = document.querySelector("#close-search-btn")
const home = document.querySelector("h1")

populateMovieSpace(url)

home.addEventListener('click', () => {
    movieContainer.innerHTML = ''
    search.value = ''
    populateMovieSpace(url)
})
async function populateMovieSpace(url) {
    const response = await fetch(url)
    const data = await response.json()
    data.results.forEach( (movie) => {
        generateCard(movie);
    })
}

function generateCard(movieAPI){
    //create star
    let star = document.createElement('span') 
    let starContent = document.createTextNode("⭐️")
    star.appendChild(starContent)
    star.classList.add("star")

    //create rating
    let rating = document.createElement('span')
    let vote_average = (movieAPI.vote_average).toFixed(1);
    let ratingContent = document.createTextNode(vote_average)
    rating.appendChild(ratingContent)
    rating.classList.add("movie-votes")

    //create average container
    let averageContainer = document.createElement('div')
    averageContainer.appendChild(star)
    averageContainer.appendChild(rating)
    averageContainer.classList.add("average")

    //create image
    let image = document.createElement('img')
    image.classList.add('movie-poster')
    if(movieAPI.poster_path !== null){
        image.src = "https://image.tmdb.org/t/p/w342" + movieAPI.poster_path
    }
    else{
       image.src = "assets/error.webp" 
    }
    image.alt = movieAPI.original_title

    //create movie-title
    let movieName = document.createElement('div')
    movieName.classList.add('movie-title')
    movieName.innerText = movieAPI.original_title

    let movie = document.createElement('section')
    movie.classList.add('movie-card')
    movie.appendChild(image)
    movie.appendChild(averageContainer)
    movie.appendChild(movieName)

    movieContainer.appendChild(movie)
}

form.addEventListener('keyup', (e) => {
    e.preventDefault()
    searchValue = search.value
    if (searchValue && searchValue !==''){
        movieContainer.innerHTML = ''
        populateMovieSpace(search_url+searchValue+"&api_key="+API_KEY)
        searchValue = ''
    }
    else{
        window.location.reload()
    }
})

let pageNum = 2
loadMore.addEventListener('click', () => {
    populateMovieSpace(url+"&page="+pageNum.toString())
    console.log(pageNum)
    pageNum += 1

})

closeButton.addEventListener('click', (e)=>{
    e.preventDefault()
    search.value = ''
    movieContainer.innerHTML = ''
    populateMovieSpace(url)
    
})

