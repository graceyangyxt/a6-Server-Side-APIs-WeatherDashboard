var appid = '3bef91aa5e085a35130f55d9d026bb4d';
// variable to hold our search history
var historyList = document.querySelector('#history');
var todayEl= document.querySelector('#today');
var forecastEl= document.querySelector('#forecast');
var searchForm = document.querySelector('#search-form');



//getting the lat and long for the weather api call
function getCoordinates(searchValue){
    var url = 'http://api.openweathermap.org/geo/1.0/direct?q=' + location + '&limit=1&appid=' + appid;

    fetch(url)
    .then(function(response){
        return response.json();
    })
    console.log(response)
    .then(function(data){
        if(data.length){
            getWeather(data[0].name,data[0].lat,data[0].lon);
        }else{
            todayEl.innerHTML = 'No results founds!'; 
            forecastEl.innerHTML = '';
        }
    })

}

//call the weather api and get back json data
function getWeather(city, lat, lon){
    var url ='https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' +lon+ '&exclude=hourly,minutely,alerts&units=imperial&appid=' +appid;
    
    fetch(url)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
    if(data.length){
      
    }
    })
} 


function renderToday(city, today){

    // accept location name and current object from getWeather as parameters

    //clear out the today container -->  innerHTML=''
   
    //-- set textContent to location name(location parameter) and 
    //the current date( moment or new Date().toLocalDateString())
     var cardTitle= document.querySelector(".card-title");
     cardTitle.textContent= //(location parameter) and the current date( moment or new Date().toLocalDateString())

     //-->set text content to label and data property('Temperature:' + current.temp' + '°F')
     //  <label id="lbltipAddedComment"></label>
     document.getElementById('#windSpeed').innerHTML = 'Wind Speed:' + current.wind_speed;
     document.getElementById('#temp').innerHTML = 'Temperature:' + current.temp + '°F';
     document.getElementById('#humidity').innerHTML = 'Humidity:' + current.humidity ;
     document.getElementById('#uv').innerHTML = 'UV:' + current.uvi;
     var uvSpan = document.createElement("span");
     uvSpan.setAttribute("class",btn);
     uvSpan.textContent= current.uvi
     //--> if, else statement to set the color to green if under 3, yellow if between 3 and 7, or red if above 7  (.btn-danger .btn-warning  .btn-success)


    //  creat span
    //  -->add any classes(.btn)
    //  -->set textContent to uv index property
    //  --> if, else statement to set the color to green if under 3, yellow if between 3 and 7, or red if above 7  (.btn-danger .btn-warning  .btn-success)

    
}

function renderForecast(forecast){

}

var existingHistory= JSON.parse(localStorage.getItem('history'))||[];
existingHistory.forEach(function(item){
    addRowToHistoryList(item);
});


searchForm.addEventListener('submit',function(event){
    event.preventDefault();
    var searchValue = document.querySelector("#searchInput");
    console.log(searchValue.value)
    //.match ?????????
    // if(searchValue.matchs(historyList) ){
    
    existingHistory.push(searchValue);
    

    //store searchValue to history
    localStorage.setItem("addToHistory",JSON.stringify(searchValue.value));

    
    //render historyList
    var li = document.createElement("li");
    li.textContent = searchValue.value;
    // li.style.border = "1px solid black";
    historyList.appendChild(li);

    searchInput.value="";
});

historyList.addEventListener('click',function(event){
   if(event.target.match('li')){
       getCoordinates(event.target.id);
   }
});
