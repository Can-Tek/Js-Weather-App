const weatherForm = document.querySelector('.weatherFrm');
const cityInput = document.querySelector('.cityInput');
const card = document.querySelector('.card');
const apiKey = "b5f52bb96d004f5125297cd15f0c4475";

weatherForm.addEventListener('submit', async event => {
    event.preventDefault();
    const city = cityInput.value;
    if (city) {
        try {
            const weatherData = await getWeather(city); 
            displayWeather(weatherData);
        } catch (error) {
            console.log(error);
            displayError(error.message);
        }
    } else {
        displayError("Please enter a city");
    }
});

async function getWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiUrl);
    if (!response.ok) { 
        throw new Error('Could not fetch weather data');
    }
    return await response.json();
}

function displayWeather(data) {
    const { name: city, 
            main: { temp, humidity }, 
            weather: [{ description, id }] } = data; 
    
    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h2");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const emojiDisplay = document.createElement("h1");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `Temperature: ${Math.floor(temp - 273.15)}°C`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    emojiDisplay.textContent = getWeatherEmoji(id);
    
    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(emojiDisplay);
    
    cityDisplay.classList.add('cityDisplay');
    tempDisplay.classList.add('tempDisplay');
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    emojiDisplay.classList.add("WeatherEmoji");
}

function getWeatherEmoji(weather) {
    if (weather < 300 && weather >= 200) {
        return "⛈️";
    } else if (weather < 400 && weather >= 300) {
        return "🌧️";
    } else if (weather < 600 && weather >= 500) {
        return "🌧️";
    } else if (weather < 700 && weather >= 600) {
        return "❄️";
    } else if (weather < 800 && weather >= 700) {
        return "🌫️";
    } else if (weather <= 804 && weather >= 800) { 
        return "☀️";
    } else if (weather === 900) {
        return "🌀";
    } else {
        return "🌈";
    }
}

function displayError(message) {
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("error");
    
    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay); 
}
