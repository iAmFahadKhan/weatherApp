//loader

document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
        document.querySelector('.loader').style.display = 'none';
        document.querySelector('.card').style.display = 'block';
    }, 1500);

    // Dark mode toggle
    const toggleButton = document.getElementById('dark-mode-toggle');
    toggleButton.addEventListener('click', function() {
        document.body.classList.toggle('light-mode');
    });
});
let weather = {
    apiKey: "cae795879a5e809b0aa5c86295da7d7c",
    fetchWeather: function (lat, lon) {
        fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${this.apiKey}`
        )
        .then((response) => {
            if (!response.ok) {
                alert("No weather found.");
                throw new Error("No weather found.");
            }
            return response.json();
        })
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        const { name } = data;
        const { description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".description").innerText = 'condition:'+description;
        document.querySelector(".temp").innerText = temp.toFixed() + "°C";
        document.querySelector(".humidity").innerText =
            "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText =
            "Wind speed: " + speed + " km/h";
        document.querySelector(".weather").classList.remove("loading");

        
        const bgVideo = document.querySelector(".bg-video video");
        const videoSources = {
            clear: "sunny.mp4",
            rain: "rain.mp4",
            snow: "cold.mp4",
            thunderstorm: "rain.mp4",
            clouds: "windy.mp4",
            mist: "mist.mp4",
            smoke: "fog.mp4",
            haze: "sunny.mp4",
            dust: "mist.mp4",
            fog: "fog.mp4",
            sand: "sunny.mp4",
            ash: "mist.mp4",
    
        };

        
        if (videoSources.hasOwnProperty(description)) {
            const videoSource = videoSources[description];
            bgVideo.src = videoSource;
        } else {
            // 
            bgVideo.src = "sunny.mp4";
        }

        
        bgVideo.load();
        bgVideo.play();
    },
    fetchGeolocation: function (city) {
        fetch(
            `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${this.apiKey}`
        )
        .then((response) => {
            if (!response.ok) {
                alert("No location found.");
                throw new Error("No location found.");
            }
            return response.json();
        })
        .then((data) => {
            if (data.length === 0) {
                alert("No location found.");
                throw new Error("No location found.");
            }
            const { lat, lon } = data[0];
            this.fetchWeather(lat, lon);
        });
    },
    search: function () {
        this.fetchGeolocation(document.querySelector(".search-bar").value);
    },
};

document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        weather.search();
    }
});


weather.fetchGeolocation("Ahmedabad");
