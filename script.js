var appid = '3bef91aa5e085a35130f55d9d026bb4d';
// variable to hold our search history
var historyList = document.querySelector('#history');
var todayEl= document.querySelector('#today');
var forecastEl= document.querySelector('#forecast');
var searchForm = document.querySelector('#search-form');
var pTag= document.querySelectorAll('p');




//getting the lat and long for the weather api call
function getCoordinates(searchValue){
    console.log(searchValue)
    console.log("this is the location:", searchValue)
    var url = 'http://api.openweathermap.org/geo/1.0/direct?q=' + searchValue + '&limit=1&appid=' + appid;

    fetch(url)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log("this is the getCoordinate data:",data)
        if(data.length){
            getWeather(data[0].name,data[0].lat,data[0].lon); //passing argument
        }else{
            todayEl.innerHTML = 'No results founds!'; 
            forecastEl.innerHTML = '';
        }
    })

}

//call the weather api and get back json data
function getWeather(location, lat, lon){
    var url ='https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' +lon+ '&exclude=hourly,minutely,alerts&units=imperial&appid=' +appid;
    
    fetch(url)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log("this is the getweather data:",data)
    if(data){  //length only for array/string
      renderToday(data.current,location)
      for(var i=0; i<5;i++){
        renderForecast(data.daily[i],data.daily[i].temp,data.daily[i].humidity,i)
      }
    console.log("this is the data.daily[i]",data.daily[i])
    console.log(data.daily[i].temp)
    }else{
        todayEl.innerHTML = 'No results founds!'; 
        forecastEl.innerHTML = '';
    }
    })
} 


function renderToday(current,location){

    // accept location name and current object from getWeather as parameters

    //clear out the today container -->  innerHTML=''
   
    //-- set textContent to location name(location parameter) and 
    //the current date( moment or new Date().toLocalDateString())
    
    var today= moment();

 
    document.getElementById('today').style.visibility='visible';
    var todayCardTitle= document.querySelector(".today-card-title");
    console.log(location)
    todayCardTitle.textContent= location + today.format('l') ;//(location parameter) and the current date( moment or new Date().toLocalDateString())
     
     //-->set text content to label and data property('Temperature:' + current.temp' + '°F')
     //  <label id="lbltipAddedComment"></label>
  
     document.getElementById('windSpeed').innerHTML = 'Wind Speed:   ' + current.wind_speed+ 'MPH';
     document.getElementById('temp').innerHTML = 'Temperature:   ' + current.temp + '°F';
     document.getElementById('humidity').innerHTML = 'Humidity:   ' + current.humidity+ '%' ;
     document.getElementById('uv').innerHTML = 'UV Index:   ';
    

     var uvBtn = document.createElement('button');
     uvBtn.setAttribute("type","button");
     uvBtn.innerHTML= current.uvi;
     document.getElementById('uv').appendChild(uvBtn);
     
    //  uvSpan.setAttribute("class",btn);
     if(current.uvi<3){
        uvBtn.style.background='green';
     }else if(3<current.uvi<7){
        uvBtn.style.background='yellow';
     }else{
        uvBtn.style.background='red';
     }
     //--> if, else statement to set the color to green if under 3, yellow if between 3 and 7, or red if above 7  (.btn-danger .btn-warning  .btn-success)
    
    //  todayCardTitle.textContent='';
    //  creat span
    //  -->add any classes(.btn)
    //  -->set textContent to uv index property
    //  --> if, else statement to set the color to green if under 3, yellow if between 3 and 7, or red if above 7  (.btn-danger .btn-warning  .btn-success)

    
}

function renderForecast(daily,temp,humidity,i){

    console.log("this is the daily forecast temp", temp)
    console.log("this is the daily forecast humidity", humidity)
    console.log("this is the daily forecast ",daily)
    

    var today= moment();

    var forCardTitle= document.querySelector('.for-card-title')
    forCardTitle.textContent="5-Day Forecast:";
    forCardTitle.style.textAlign='center';
 

    var foreCard=document.createElement("div");
    foreCard.setAttribute("class",'col-sm bg-info p-3 rounded-lg m-2');
    foreCard.style.textAlign='center';
    var foreCardGroup=document.getElementById('foreCardGroup');
    foreCardGroup.appendChild(foreCard);

    console.log(foreCard)
  

    var foreCardTitle=document.createElement("h4");
    foreCardTitle.style.fontSize='1.25em';
    foreCardTitle.style.margin="4px 0 8px 0";
    foreCardTitle.innerHTML=today.add(i+1, 'days').format('l');
    foreCard.appendChild(foreCardTitle);

    var foreTemp=document.createElement("p");
    foreTemp.innerHTML='Temperature:  ' + daily.temp.day + '°F';
    foreCard.appendChild(foreTemp);
    console.log("this is the daily.temp",daily.temp.day)

    var foreHumidity=document.createElement("p");
    foreHumidity.innerHTML='Humidity:  ' + 
    daily.humidity  + '%';
    foreCard.appendChild(foreHumidity);
        
    

    //  var for1CardTitle= document.querySelector(".for1-card-title");
    //  for1CardTitle.textContent=today.add(1, 'days').format('l');
    // //  for1CardTitle.textContent=today.add(1, 'days').calendar().format('l');
    //  document.getElementById('for1temp').innerHTML = 'Temperature' + daily[0].temp /*what is the api parameter for different days?*/ + '°F';
    //  document.getElementById('for1humidity').innerHTML = 'Humidity'  /*what is the api parameter for different days?*/+ '%';

    //  var for2CardTitle= document.querySelector(".for2-card-title");
    //  for2CardTitle.textContent=today.add(2, 'days').format('l');
    //  document.getElementById('for2temp').innerHTML = 'Temperature' + /*what is the api parameter for different days?*/ + '°F';
    //  document.getElementById('for2humidity').innerHTML = 'Humidity'  /*what is the api parameter for different days?*/+ '%' ;

    //  var for3CardTitle= document.querySelector(".for3-card-title");
    //  for3CardTitle.textContent=//
    //  document.getElementById('for3temp').innerHTML = 'Temperature' + /*what is the api parameter for different days?*/ + '°F';
    //  document.getElementById('for3humidity').innerHTML = 'Humidity'  /*what is the api parameter for different days?*/ + '%';

    //  var for4CardTitle= document.querySelector(".for4-card-title");
    //  for4CardTitle.textContent=//
    //  document.getElementById('for4temp').innerHTML = 'Temperature' + /*what is the api parameter for different days?*/ + '°F';
    //  document.getElementById('for4humidity').innerHTML = 'Humidity'  /*what is the api parameter for different days?*/+ '%' ;

    //  var for5CardTitle= document.querySelector(".for5-card-title");
    //  for5CardTitle.textContent=//
    //  document.getElementById('for5temp').innerHTML = 'Temperature' + /*what is the api parameter for different days?*/ + '°F';
    //  document.getElementById('for5humidity').innerHTML = 'Humidity'  /*what is the api parameter for different days?*/+ '%' ;

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
    if(!searchValue){
        console.error('You need to input a city name!');
        return;
    }
    
    existingHistory.push(searchValue);
    

    //store searchValue to history
    localStorage.setItem("addToHistory",JSON.stringify(searchValue.value));

    
    //render historyList
    var li = document.createElement("li");
    li.textContent = searchValue.value;
    // li.style.border = "1px solid black";
    historyList.appendChild(li);

    
 
    getCoordinates(searchValue.value);
    
   
    
    searchInput.value="";

});

historyList.addEventListener('click',function(event){
   if(event.target.match('li')){
       getCoordinates(event.target.id);
   }
});
