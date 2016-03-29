function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setPosition);
    } else { 
        return;
        alert("error");
    }
};

var weatherData = {
    location: '',
    country: '',
    temperature: 70,
    icon: '',
    coverage: '',
    humidity: '',
    sunset: 0,
    sunrise: 0,
    currentTime: new Date(),
    wind: '',
    updateSun: function(timestamp){
        var dt = new Date(timestamp * 1000);
        return ('-- ' + dt + ' --');
    },
};

function setPosition(position) {
    weatherData.latitude = position.coords.latitude.toString(); 
    weatherData.longitude = position.coords.longitude.toString();
    setWeatherData();
};

var setWeatherData = function() {
$.getJSON('http://api.openweathermap.org/data/2.5/weather?lat=' + weatherData.latitude + '&lon=' + weatherData.longitude + '&units=imperial&APPID=ced8c92da899a2ff13ff69860b52cb92', function(json){
    weatherData.location = json.name;
    weatherData.country = json.sys.country;
    weatherData.sunrise = weatherData.updateSun(json.sys.sunrise);
    weatherData.sunset = weatherData.updateSun(json.sys.sunset);
    weatherData.icon = json.weather[0].id;
    weatherData.coverage = json.weather[0].main;
    weatherData.temperature = Math.round(json.main.temp);
    weatherData.humidity = json.main.humidity;
    weatherData.wind = json.wind.speed;
    updatePage();
})};

var fixTime = {
    hours: '',
    minutes: '',
    setTime:function(time){
        var hrs = time.getHours();
        var mins = time.getMinutes();
        if (hrs < 10){
            hrs = "0" + hrs;
        }
        if (mins <10){
            mins = "0" + mins;
        }
        return hrs + ":" + mins;
    }
}


var updatePage = function(){
    $("#temp").text(weatherData.temperature + " F");
    $('#icon').attr('class', 'wi wi-owm-' + weatherData.icon);
    $('#icon').text('');
    $('#location').text(weatherData.location + ", " + weatherData.country);
    $('#coverage').text(weatherData.coverage);
    $('#time').text("Current Time: " + fixTime.setTime(weatherData.currentTime));
    $('#sunset').text("Sunset: " + weatherData.sunset.substr(19,9));
    $('#sunrise').text("Sunrise: " + weatherData.sunrise.substr(19,9));
    $('#wind').text("Wind Speed: " + weatherData.wind + "MPH");
    
}

$(document).ready(function(){
    getLocation();
});