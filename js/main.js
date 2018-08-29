//Root url for the open weather app api
const api_root_url = "http://api.openweathermap.org/data/2.5/weather?zip="
const API_KEY = "8cff9147bed07b16c953aaa36f772015"

//Select all elements in the html by using querSelector and putting them in variables
const body = document.querySelector(".body")
const city = document.querySelector(".city")
const zip = document.querySelector(".zip")
const weather = document.querySelector(".weather")
const temp = document.querySelector(".temp")
const humidity = document.querySelector(".humidity")
const icon = document.querySelector(".icon")
const convert = document.querySelector(".convert")
const changeDeg = document.querySelector(".change-deg")

const groups = [{
        condition: "Rain",
        icon: "img/rain.png",
        background: "img/rainwater-bg.jpg",
    },
    {
        condition: "Clouds",
        icon: "img/cloudy.png",
        background: "img/cloudy-bg.jpg",
    },
    {
        condition: "Snow",
        icon: "img/snow.png",
        background: "img/snowy-bg.jpg",
    },
    {
        condition: "Sun",
        icon: "img/sun.png",
        background: "img/sunny-bg.jpg",
    },
    {
        condition: "Thunderstorm",
        icon: "img/thunderstorm.png",
        background: "img/thunderstorm-bg.jpg",
    },
    {
        condition: "Partly Cloudy",
        icon: "img/partly-cloudy.png",
        background: "img/partlycloudy-bg.jpg",
    },
    {
        condition: "Clear",
        icon: "",
        background: "img/clear-bg.jpg",
    },
    {
        condition: "Drizzle",
        icon: "img/rain.png",
        background: "img/rainwater-bg.jpg",
    },
    {
        condition: "Smoke",
        icon: "img/smoke.png",
        background: "img/smoke-bg.jpg",
    }
]



//This is where our converter functions will be
function kelvinToFar(kelvin) {
    return Math.round(kelvin * 9 / 5 - 459.67)
}

function farToCelsius() {
    let value = parseInt(temp.textContent)
    return Math.round((value - 32) * 5 / 9);
}

//ajax function
function getWeather(zipCode) {
    $.ajax({
        type: "GET",
        url: `${api_root_url}${zipCode},us&appid=${API_KEY}`,
        dataType: "json",
        success: function (data) {
            console.log(data)
            temp.textContent = kelvinToFar(data.main.temp)
            city.textContent = data.name
            weather.textContent = data.weather[0].main
            humidity.textContent = data.main.humidity
            // icon.setAttribute("src", groups[data.weather[0].main])
            for (var i = 0 in groups) {

                if (groups[i].condition === data.weather[0].main) {
                    icon.setAttribute("src", groups[i].icon);
                    document.body.style.backgroundImage = `url(${groups[i].background})`;
                }
            }
        },
        error: function (error) {
            console.log("Something went wrong");
        }
    })
}

getWeather("33166");

zip.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        getWeather(zip.value)
    }
})

convert.addEventListener("click", function () {
    if (convert.textContent === "Convert to °C") {
        temp.textContent = farToCelsius();
        convert.textContent = "Convert to °F"
        changeDeg.textContent = "°C"
    } else {
        temp.textContent = Math.floor(temp.textContent * 1.8) + 32;
        convert.textContent = "Convert to °C"
        changeDeg.textContent = "°F"
    }
})