$(document).ready(function() {

var key = 'f80622035591f98bd40d14d8bda018b6';

var body = document.getElementById("body");
var weather = document.getElementById("weather");
var welcome = document.getElementById("welcome");
var loc = document.getElementById("location");
var temp = document.getElementById("temperature");
var forecast = document.getElementById("forecast");
var wind = document.getElementById("wind");
var icon = document.getElementById("icon");
var temperature = document.getElementById("temperature");
var fiveDaysForecast = document.getElementById("forecast-details");

var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

var conditions = {Thunderstorm: "images/stormy.jpg",
                  Drizzle: "images/rainy.jpg",
                  Rain: "images/rainy.jpg",
                  Snow: "images/snowy.jpg",
                  Clear: "images/sunny.jpg",
                  Clouds: "images/overcast.jpg",
                  Extreme: "images/stormy.jpg"};

//Hide weather data until ready
weather.hidden = true;

// Call Google Maps API to get city name
function displayLocation(latitude,longitude){
       var request = new XMLHttpRequest();

       var method = 'GET';
       var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng='+latitude+','+longitude+'&sensor=true';
       var async = true;

       request.open(method, url, async);
       request.onreadystatechange = function(){
       if(request.readyState == 4 && request.status == 200){
         var data = JSON.parse(request.responseText);
        //  alert(request.responseText); // check under which type your city is stored, later comment this line
         var addressComponents = data.results[0].address_components;
         for(i=0;i<addressComponents.length;i++){
            var types = addressComponents[i].types
            //alert(types);
            if(types=="locality,political"){
               loc.innerHTML = addressComponents[i].long_name; // this should be your city, depending on where you are
             }
           }
        //alert(address.city.short_name);
       }
    };
   request.send();
 };

 var successCallback = function(position){
 var x = position.coords.latitude;
 var y = position.coords.longitude;
 displayLocation(x,y);
  };

 navigator.geolocation.getCurrentPosition(successCallback);

 //Call weather information for current location and current day
 function getWeather(latitude, longitude) {
   var request = new XMLHttpRequest();

   var method = 'GET';
   var url = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + latitude +
   '&lon=' + longitude + '&units=metric' + '&APPID=' + key;
   var async = true;

   request.open(method, url, async);
   request.onreadystatechange = function() {
     if (request.readyState == 4 && request.status === 200)  {
       //Hide welcome message and display weather
       welcome.hidden = true;
       weather.hidden = false;
       var data = JSON.parse(request.responseText);

        // Update temperature
        temp.innerHTML = Math.round(data.list[0].main.temp) + ' C';

        //Update forecast
        forecast.innerHTML = data.list[0].weather[0].description;

        //Update wind direction
        wind.innerHTML = data.list[0].wind.speed + "m/s " +
        degToCompass(data.list[0].wind.deg);

        //Add weather icon
        icon.innerHTML = "<img src='http://openweathermap.org/img/w/" +
                          data.list[0].weather[0].icon + ".png' alt='weather icon' height='80' width='80' id='weather-icon'>";

        //Populate 5 day forecast data
        var html = "";

        for (var i=0; i<data.list.length; i+=8) {
          var d = new Date(data.list[i].dt * 1000);
          var date = d.getDate();
          var month = d.getMonth();
          month = monthNames[month];
          html += "<h4><i>";
          html += (date + " " + month);
          html += "</i></h4>";

          html += "<div class='forecast-details'>";
          html += "<p>" + Math.round(data.list[i].main.temp) + " C</p>";
          html += "<p>" + data.list[i].weather[0].description + "</p>";
          html += "</div>";
        }

        fiveDaysForecast.innerHTML = html;

        //Update website background image
        //Find current weather conditions from API call
        var apiConditions = data.list[0].weather[0].main;

        setBackground(conditions[apiConditions]);

     }
   }
   request.send();
 };

 var weatherCallback = function(position){
 var x = position.coords.latitude;
 var y = position.coords.longitude;
 getWeather(x,y);
 };

  navigator.geolocation.getCurrentPosition(weatherCallback);

  function degToCompass(num) {
    var val = Math.floor((num / 22.5) + 0.5);
    var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    return arr[(val % 16)];
  };

  //Call current weather conditions to set backgound image
  function setBackground(currentConditions) {
    body.style.background = "url('" + currentConditions + "')";
    body.style.backgroundSize = "cover";
    body.style.backgroundRepeat = "no-repeat";
  };

 });
