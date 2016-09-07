//var subInput: String = document.getElementById("inputBox").value;
var submitButton = document.getElementById("button1");
var backButton = document.getElementById("button2");
var para1 = document.getElementById("inputWeather");
var para2 = document.getElementById("outputWeather");
var para3 = document.getElementById("inputErrorMessage");
function updater(updatedData) {
    //Switch which block is displayed
    para1.style.display = "none";
    para2.style.display = "block";
    para3.style.display = "none";
    //Import and display information based on input
    document.getElementById("location").innerHTML = "Current weather of " + updatedData.name + "(" + updatedData.sys.country + "):";
    document.getElementById("currentWeatherIcon").src = "http://openweathermap.org/img/w/" + updatedData.weather[0].icon + ".png";
    document.getElementById("currentWeather").innerHTML = updatedData.weather[0].main + "(" + updatedData.weather[0].description + ").";
    document.getElementById("currentTemperatureIcon").src = "http://www.fancyicons.com/free-icons/139/oxe/png/24/termometer_24.png";
    document.getElementById("currentTemperature").innerHTML = "Current temperature: " + Math.round((updatedData.main.temp * 10)) / 10 + "&degC.";
    document.getElementById("windDirectionIcon").src = "http://www.fancyicons.com/free-icons/108/weather/png/24/wind_flag_storm_24.png";
    document.getElementById("windDirection").innerHTML = "Wind: " + msToKm(updatedData.wind.speed) + "km/h (" + degToCompass(updatedData.wind.deg) + ").";
    document.getElementById("humidityIcon").src = "http://www.fancyicons.com/free-icons/226/green-spring/png/24/dew_24.png";
    document.getElementById("humidity").innerHTML = "Air humidity: " + updatedData.main.humidity + "%.";
}
function degToCompass(num) {
    //Convert degrees to conventional wind directions
    var val = Math.floor((num / 45) + 0.5);
    var arr = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    return arr[(val % 8)];
}
function msToKm(num) {
    //Converts m/s to km/h
    var val = Math.round(num * 3.6);
    return val;
}
function buttonRequest(callback) {
    var cityInput = document.getElementById("inputBox").value;
    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "?&APPID=b3e208636567c80497f8dfb32db7f04e" + "&units=metric",
        type: "POST",
        processData: false,
    })
        .done(function (data) {
        if (data.cod != 404) {
            var updatedData = data;
            callback(updatedData);
        }
        else {
            para3.style.display = "block";
        }
    })
        .fail(function (error) {
        console.log(error.getAllResponseHeaders());
    });
}
//Clicking the 'submit' button or pressing 'enter' will cause api call to be made and UI to update
submitButton.addEventListener("click", function () {
    buttonRequest(updater);
});
$('#inputBox').bind('keypress', function (e) {
    if (e.keyCode == 13) {
        buttonRequest(updater);
    }
});
//Implementation of 'back' button
backButton.addEventListener("click", function () {
    backbutton();
});
//Go back to initial display
function backbutton() {
    para1.style.display = "block";
    para2.style.display = "none";
    para3.style.display = "none";
}
