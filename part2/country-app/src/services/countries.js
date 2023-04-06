import axios from "axios";

const baseUrl = "https://restcountries.com/v3.1/";

const getAllCountries = () => {
  return axios.get(`${baseUrl}/all`).then((response) => response.data);
};

export { getAllCountries };
