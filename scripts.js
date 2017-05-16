$(document).ready(function() {

var loc = document.getElementById("location");
var temp = document.getElementById("temperature");
var forecast = document.getElementById("forecast");

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

 //Call weather information for current location
 function getWeather(latitude, longitude) {
   var request = new XMLHttpRequest();
   var key = 'f80622035591f98bd40d14d8bda018b6';

   var method = 'GET';
   var url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + latitude +
   '&lon=' + longitude + '&units=metric' + '&APPID=' + key;
   var async = true;

   request.open(method, url, async);
   request.onreadystatechange = function() {
     if (request.readyState == 4 && request.status === 200)  {
       var data = JSON.parse(request.responseText);

        // Update temperature
        temp.innerHTML = data.main.temp + ' C';

        //Update forecast
        forecast.innerHTML = data.weather[0].main;
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

 });
