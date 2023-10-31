const apikey='a87fae520afc87b84854f5b80eafeb48'
const apiEndpoint='https://api.themoviedb.org/3'
const apiPaths={
    fetchAllCategories:`${apiEndpoint}/genre/movie/list?api_key=${apikey}`
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
                fetchAndBuildMovieSections(category)
            })
        }
    })
    .catch(function(err){
        console.log(err)
    })
}
function fetchAndBuildMovieSections(category){
    console.log(category)
}
window.addEventListener('load',function(){
    init()
})