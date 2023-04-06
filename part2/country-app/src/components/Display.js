import React, { useState, useEffect } from "react";
import { getWeather } from "../services/weather";

const WeatherInfo = ({ latlng, capital }) => {
  const [currentWeatherInfo, setCurrentWeatherInfo] = useState(null);

  useEffect(() => {
    getWeather(latlng)
      .then((weatherData) => {
        setCurrentWeatherInfo(weatherData.list[0]);
      })
      .catch((err) => console.log(err));
  }, [latlng]);

  if (!currentWeatherInfo) {
    return null;
  }

  const {
    main: { temp },
    weather,
    wind: { speed },
  } = currentWeatherInfo;

  const { icon, description } = weather[0];

  return (
    <div>
      <h3>Weather in {capital}</h3>
      <p>temperature: {temp} Celsius</p>
      <img
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt={description}
      />
      <p>speed: {speed} m/s</p>
    </div>
  );
};

const CountryLineSummary = ({ countryName, handleSelectCountry }) => (
  <p>
    {countryName}
    <button onClick={handleSelectCountry(countryName)}>show</button>
  </p>
);

const CountryDetail = ({ name, capital, area, languages, flags }) => {
  const capitalDisplay =
    capital.length > 1 ? (
      <div>capitals {capital.join()}</div>
    ) : (
      <div>capital {capital[0]}</div>
    );

  return (
    <div>
      <h2>{name}</h2>
      <div>{capitalDisplay}</div>
      <div>area {area}</div>
      <div>
        <h3>languages</h3>
        <ul>
          {languages.map((lang) => (
            <li key={lang}>{lang}</li>
          ))}
        </ul>
      </div>
      <img src={flags.png} href={flags.png} alt={flags.alt} />
    </div>
  );
};

const CountryDetailView = ({ country }) => {
  const { capital, area, languages, flags, name, latlng } = country;
  const { common } = name;

  return (
    <div>
      <CountryDetail
        key={common}
        name={common}
        capital={capital}
        area={area}
        languages={Object.values(languages)}
        flags={flags}
      />
      <WeatherInfo latlng={latlng} capital={capital} />
    </div>
  );
};

const Display = ({
  countrySummaries,
  selectedCountry,
  handleSelectCountry,
}) => {
  if (countrySummaries.length > 10) {
    return <div>Too many matches, refine filter</div>;
  }
  if (selectedCountry) {
    return <CountryDetailView country={selectedCountry} />;
  } else if (countrySummaries.length === 1) {
    return <CountryDetailView country={countrySummaries[0]} />;
  } else {
    return (
      <div>
        {countrySummaries.map((country) => {
          const name = country.name.common;
          return (
            <CountryLineSummary
              key={name}
              countryName={name}
              handleSelectCountry={handleSelectCountry}
            />
          );
        })}
      </div>
    );
  }
};

export default Display;
