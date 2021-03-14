var appid = '3bef91aa5e085a35130f55d9d026bb4d';
// variable to hold our search history
var historyList = document.querySelector('#history');
var todayEl= document.querySelector('#today');
var forecastEl= document.querySelector('#forecast');
var searchForm = document.querySelector('#search-form');




function getCoordinates(searchValue){
    var url = 'http://api.openweathermap.org/geo/1.0/direct?q=' + location + '&limit=1&appid=' + appid;

    fetch(url)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        if(data.length){
            getWeather(data[0].name,data[0].lat,data[0].lon);
        }else{
            todayEl.innerHTML = 'No results founds!';
            forecastEl.innerHTML = '';
        }
    })

}

function getWeather(city, lat, lon){

} 

function renderToday(city, today){

}

function renderForecast(forecast){

}

var existingHistory= JSON.parse(localStorage.getItem('history'))||[];
existingHistory.forEach(function(item){
    addRowToHistoryList(item);
});


function search(event){
   

   };


searchForm.addEventListener('submit',function(event){
    event.preventDefault();
    var searchValue = document.querySelector(searchForm.children[0].value);
    //.match ?????????
    // if(searchValue.matchs(historyList) ){
    
    historyList.push(searchValue);
    searchInput.value="";

    //store searchValue to history
    localStorage.setItem("addToHistory",JSON.stringify(searchValue));

    //render historyList
    var li = document.createElement("li");
    li.textContent = searchValue;
    historyList.appendChild(li);


});

historyList.addEventListener('click',function(e){
   if(e.target.match('li')){
       getCoordinates(e.target.id);
   }
});
