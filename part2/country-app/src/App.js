import { useState, useEffect } from "react";
import Display from "./components/Display";
import { getAllCountries } from "./services/countries";

const App = () => {
  const [filterInput, setFilterInput] = useState(null);
  const [countries, setCountries] = useState(null);

  useEffect(() => {
    getAllCountries().then((countriesData) => {
      setCountries(countriesData);
    });
    setFilterInput("");
  }, []);

  const handleFilterInputChange = (event) => {
    setFilterInput(event.target.value.toLowerCase());
  };

  if (!countries) {
    return null;
  }

  const countriesToRender = countries.filter((country) =>
    country.name.common.toLowerCase().includes(filterInput)
  );

  return (
    <div>
      find countries <input onChange={handleFilterInputChange} />
      <Display countriesToRender={countriesToRender} />
    </div>
  );
};

export default App;
