import React from "react";

const CountryLineSummary = ({ countryName, handleSelectCountry }) => (
  <p>
    {countryName}
    <button onClick={handleSelectCountry(countryName)}>show</button>
  </p>
);

const CountryDetail = ({ name, capital, area, languages, flags }) => {
  const capitalDisplay =
    capital.length > 1 ? (
      <div>Captitals {capital.join()}</div>
    ) : (
      <div>Captital {capital[0]}</div>
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
  const { capital, area, languages, flags, name } = country;
  const { common } = name;

  return (
    <CountryDetail
      key={common}
      name={common}
      capital={capital}
      area={area}
      languages={Object.values(languages)}
      flags={flags}
    />
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
