import React from "react";

const CountryLineSummary = ({ summary }) => <p>{summary}</p>;

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

const Display = ({ countriesToRender }) => {
  if (countriesToRender.length > 10) {
    return <div>Too many matches, refine filter</div>;
  } else if (countriesToRender.length === 1) {
    const country = countriesToRender[0];
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
  } else {
    return (
      <div>
        {countriesToRender.map((country) => {
          const name = country.name.common;
          return <CountryLineSummary key={name} summary={name} />;
        })}
      </div>
    );
  }
};

export default Display;
