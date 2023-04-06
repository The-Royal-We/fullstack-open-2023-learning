import { useState, useEffect } from "react";
import Display from "./components/Display";
import { getAllCountries } from "./services/countries";

const App = () => {
  const [filterInput, setFilterInput] = useState(null);
  const [countries, setCountries] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    getAllCountries().then((countriesData) => {
      setCountries(countriesData);
    });
    setFilterInput("");
  }, []);

  useEffect(() => {}, [selectedCountry]);

  const handleFilterInputChange = (event) => {
    setFilterInput(event.target.value.toLowerCase());
    setSelectedCountry(null);
  };

  const handleSelectCountry = (countryName) => () => {
    setSelectedCountry(
      countries.find((country) => country.name.common === countryName)
    );
  };

  if (!countries) {
    return null;
  }

  const countrySummaries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(filterInput)
  );

  return (
    <div>
      find countries <input onChange={handleFilterInputChange} />
      <Display
        countrySummaries={countrySummaries}
        selectedCountry={selectedCountry}
        handleSelectCountry={handleSelectCountry}
      />
    </div>
  );
};

export default App;
