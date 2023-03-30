const data_path = "backend/data/weather.json"
fetch(data_path)
    .then((response) => response.json())
    .then((data) => {
        // Process the JSON data and display it in the output div
        console.log(data)
        const weather = document.querySelector(".weather");
        weather.querySelector("#weather_img").src = data.current.condition.icon
        weather.querySelector("#temp").textContent = `${Math.round(data.current.temp_c)} °C`;
        weather.querySelector("#city").textContent = `${data.location.name}, ${data.location.region}`;
        weather.querySelector("#humidity").textContent += ` ${data.current.humidity}%`;
        weather.querySelector("#wind").textContent += ` ${Math.round(data.current.wind_kph)} km/h`;
        weather.querySelector("#uv").textContent += data.current.uv;
        weather.querySelector("#feelslike").textContent += `${Math.round(data.current.feelslike_c)} °C`;
        weather.querySelector("#last_updated").textContent += `${data.current.last_updated}`
    })
    .catch((error) => console.log(error));