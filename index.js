const apikey='a87fae520afc87b84854f5b80eafeb48'
const apiEndpoint='https://api.themoviedb.org/3'
const apiPaths={
    fetchAllCategories:`${apiEndpoint}/genre/movie/list?api_key=${apikey}`,
    fetchMovieList:(id)=>`${apiEndpoint}/discover/movie?api_key=${apikey}&with_genres=${id}`
}

 

//Boot up the app
function init(){
    fetchAndBuildAllSections()
}
function fetchAndBuildAllSections(){
    fetch(apiPaths.fetchAllCategories)
    .then(res => res.json())
    .then(function(res){
        const categories=res.genres
        if(Array.isArray(categories)&& categories.length){
            categories.forEach(category =>{
                fetchAndBuildMovieSections(apiPaths.fetchMovieList(category.id), category)
            })
        }
    })
    .catch(function(err){
        console.log(err)
    })
}
function fetchAndBuildMovieSections(fetchUrl, category){
    console.log(fetchUrl,category)
    fetch(fetchUrl)
    .then(res=>res.json())
    .then(res => console.table(res.results))
    .catch(err => console.log(err))
}
window.addEventListener('load',function(){
    init()
})