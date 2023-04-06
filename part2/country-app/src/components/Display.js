import React from "react";

const CountryLineSummary = ({ summary }) => <p>{summary}</p>;

const Display = ({ countriesToRender }) => {
  if (countriesToRender.length > 10) {
    return <div>Too many matches, refine filter</div>;
  } else {
    return (
      <div>
        {countriesToRender.map((name) => (
          <CountryLineSummary key={name} summary={name} />
        ))}
      </div>
    );
  }
};

export default Display;
