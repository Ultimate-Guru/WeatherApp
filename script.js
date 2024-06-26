const url = 'https://api.openweathermap.org/data/2.5/weather';
const APIKEY = '84ae04033440d3fc241b0c91b2ab756e';

$(document).ready(function () {
    weatherFn('Lagos');
});

async function weatherFn(cName) {
    const temp = `${url}?q=${cName}&appid=${APIKEY}&units=metric`;
    try {
        const res = await fetch(temp);
        const data = await res.json();
        if (res.ok) {
            weatherShowFn(data);
        } else {
            alert('City not found. Please try again.');
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function weatherShowFn(data) {
    $('#city-name').text(data.name);
    $('#date').text(moment().format('MMMM Do YYYY, h:mm:ss a'));
    $('#temperature').html(`${data.main.temp}°C`);
    $('#description').text(data.weather[0].description);
    $('#wind-speed').html(`Wind Speed: ${data.wind.speed} m/s`);

    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    $('#weather-icon').attr('src', iconUrl);

    $('#weather-info').fadeIn();
}