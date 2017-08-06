$(document).ready(function(){function e(e,t){var n=new XMLHttpRequest,o="http://maps.googleapis.com/maps/api/geocode/json?latlng="+e+","+t+"&sensor=true";n.open("GET",o,!0),n.onreadystatechange=function(){if(4==n.readyState&&200==n.status){var e=JSON.parse(n.responseText).results[0].address_components;for(i=0;i<e.length;i++)"locality,political"==e[i].types&&(c.innerHTML=e[i].long_name)}},n.send()}function t(e,t){var i=new XMLHttpRequest,r="https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/forecast?lat="+e+"&lon="+t+"&units=metric&APPID="+a;i.open("GET",r,!0),i.onreadystatechange=function(){if(4==i.readyState&&200===i.status){d.hidden=!0,s.hidden=!1;var e=JSON.parse(i.responseText);g.innerHTML=Math.round(e.list[0].main.temp)+" C",l.innerHTML=e.list[0].weather[0].description,m.innerHTML=e.list[0].wind.speed+"m/s "+n(e.list[0].wind.deg),p.innerHTML="<img src='https://cors-anywhere.herokuapp.com/http://openweathermap.org/img/w/"+e.list[0].weather[0].icon+".png' alt='weather icon' height='80' width='80' id='weather-icon'>";for(var t="",a=0;a<e.list.length;a+=8){var r=new Date(1e3*e.list[a].dt),c=r.getDate(),w=r.getMonth();t+="<h4><i>",t+=c+" "+(w=h[w]),t+="</i></h4>",t+="<div class='forecast-details'>",t+="<p>"+Math.round(e.list[a].main.temp)+" C</p>",t+="<p>"+e.list[a].weather[0].description+"</p>",t+="</div>"}u.innerHTML=t;var E=e.list[0].weather[0].main;o(y[E])}},i.send()}function n(e){return["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"][Math.floor(e/22.5+.5)%16]}function o(e){r.style.background="url('"+e+"')",r.style.backgroundSize="cover",r.style.backgroundRepeat="no-repeat"}var a="13911c4d1ec385625389985ff8407eb9",r=document.getElementById("body"),s=document.getElementById("weather"),d=document.getElementById("welcome"),c=document.getElementById("location"),g=document.getElementById("temperature"),l=document.getElementById("forecast"),m=document.getElementById("wind"),p=document.getElementById("icon"),u=(document.getElementById("temperature"),document.getElementById("forecast-details")),h=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],y={Thunderstorm:"images/stormy.jpg",Drizzle:"images/rainy.jpg",Rain:"images/rainy.jpg",Snow:"images/snowy.jpg",Clear:"images/sunny.jpg",Clouds:"images/overcast.jpg",Extreme:"images/stormy.jpg"};s.hidden=!0;var w=function(t){e(t.coords.latitude,t.coords.longitude)};navigator.geolocation.getCurrentPosition(w);var E=function(e){t(e.coords.latitude,e.coords.longitude)};navigator.geolocation.getCurrentPosition(E)});