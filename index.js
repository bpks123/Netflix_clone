const apikey='a87fae520afc87b84854f5b80eafeb48'
const apiEndpoint='https://api.themoviedb.org/3'
const imgPath='https://image.tmdb.org/t/p/original'


const apiPaths={
    fetchAllCategories:`${apiEndpoint}/genre/movie/list?api_key=${apikey}`,
    fetchMovieList:(id)=>`${apiEndpoint}/discover/movie?api_key=${apikey}&with_genres=${id}`,
    fetchTrending: `${apiEndpoint}/trending/all/day?api_key=${apikey}&language=en-US`,
}

 

//Boot up the app
function init(){
    //fetchAndBuildMovieSections(apiPaths.fetchTrending,'Trending Now')
    fetchTrendingMovies()
    //fetchAndBuildAllSections()
}

function fetchTrendingMovies(){
    fetchAndBuildMovieSections(apiPaths.fetchTrending,'Trending Now').then(function(list){
        const randomIndex=parseInt(Math.random()*list.length)
        //console.log(list[5])
        buildBannerSection(list[randomIndex])
    }).catch(err =>{
        console.log(err)
    })
}
function buildBannerSection(movie){
    const bannerCont=document.getElementById('banner-section')
    bannerCont.style.backgroundImage=`url(${imgPath}${movie.backdrop_path})`
    const div=document.createElement('div')
    let movieName=movie.name
    let releaedate=movie.first_air_date
    if(movieName===undefined){
        movieName=movie.title
        releaedate=movie.release_date
    }
    div.innerHTML=`
    <h2 class="banner__title">${movieName}</h2>
            <p class="banner__info">Trending in movies | Released - ${releaedate}</p>
            <p class="banner__overview">${movie.overview}dd</p>
            <div class="action-buttons-cont">
                <button class="action-button"><i class="fa-solid fa-play"></i>&nbsp;&nbsp;Play</button>
                <button class="action-button"><i class="fa-solid fa-circle-info"></i>&nbsp;&nbsp;More Info</button>
            </div>
    `;
    div.className='banner-content container'
    bannerCont.appendChild(div)

}

function fetchAndBuildAllSections(){
    fetch(apiPaths.fetchAllCategories)
    .then(res => res.json())
    .then(function(res){
        const categories=res.genres
        if(Array.isArray(categories)&& categories.length){
            categories.forEach(category =>{
                fetchAndBuildMovieSections(apiPaths.fetchMovieList(category.id), category.name)
            })
        }
    }) 
    .catch(function(err){
        console.log(err)
    })
}
function fetchAndBuildMovieSections(fetchUrl, categoryName){
    //console.log(fetchUrl,categoryName)
    return fetch(fetchUrl)
    .then(res=>res.json())
    .then(res => {
        //console.table(res.results)
        const movies=res.results
        if(Array.isArray(movies) && movies.length){
            buildMoviesSection(movies, categoryName)
        }
        return movies
    })

    .catch(err => console.log(err))
}
function buildMoviesSection(list, categoryName){
    //console.log(list, categoryName)
    const moviesCont=document.getElementById('movies-cont')

    const movieListHTML=list.map(function(item){
        return `
        <img class="movie-item" src="${imgPath}${item.backdrop_path}" alt="${item.title}">
        `
    }).join('')

    const moviesSectionHTML=`
    <h2 class="movie-section-heading">${categoryName}<span class="explore-nudge">Explore All</span></h2>
    <div class="movies-row">
        ${movieListHTML}
    </div>
    `
    const div=document.createElement('div')
    div.className='movies-section'
    div.innerHTML=moviesSectionHTML

    //append HTML into movies container
    moviesCont.append(div)
}  

window.addEventListener('load',function(){
    init()
})