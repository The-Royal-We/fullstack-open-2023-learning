import axios from "axios";

const baseUrl = "http://localhost:3001/notes";

const getAll = () => {
  return axios.get(baseUrl).then((respsonse) => respsonse.data);
};

const create = (newObject) => {
  return axios.post(baseUrl, newObject).then((respsonse) => respsonse.data);
};

const update = (id, newObject) => {
  return axios
    .put(`${baseUrl}/${id}`, newObject)
    .then((respsonse) => respsonse.data);
};

export { getAll, create, update };
