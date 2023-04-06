import axios from "axios";

const getWeather = (latlng) => {
  const lat = latlng[0];
  const lon = latlng[1];
  const apiKey = process.env.REACT_APP_OPEN_WEATHER_API_KEY;

  const params = {
    lat,
    lon,
    units: "metric",
    appid: apiKey,
  };

  return axios
    .get(`https://api.openweathermap.org/data/2.5/forecast`, { params })
    .then((response) => response.data);
};

export { getWeather };
