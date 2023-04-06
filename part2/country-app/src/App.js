import { useState, useEffect } from "react";
import Display from "./components/Display";
import { getAllCountries } from "./services/countries";

const App = () => {
  const [filterInput, setFilterInput] = useState(null);
  const [countries, setCountries] = useState(null);

  useEffect(() => {
    getAllCountries().then((countriesData) => {
      setCountries(countriesData.map((country) => country.name.common));
    });
    setFilterInput("");
  }, []);

  const handleFilterInputChange = (event) => {
    setFilterInput(event.target.value);
  };

  if (!countries) {
    return null;
  }

  const countriesToRender = countries.filter((name) =>
    name.toLowerCase().includes(filterInput.toLowerCase())
  );

  return (
    <div>
      find countries <input onChange={handleFilterInputChange} />
      <Display countriesToRender={countriesToRender} />
    </div>
  );
};

export default App;
