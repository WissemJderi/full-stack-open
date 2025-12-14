import axios from "axios";
const baseUrl = "http://localhost:3001/api/persons";

const getAll = () => {
  return axios.get(`${baseUrl}`).then((response) => response.data);
};
const add = (newPerson) => {
  return axios.post(`${baseUrl}`, newPerson).then((response) => response.data);
};

const changeNumber = (id, personData) => {
  return axios
    .put(`${baseUrl}/${id}`, personData)
    .then((response) => response.data);
};
const remove = (id) => axios.delete(`${baseUrl}/${id}`);
export default {
  add,
  getAll,
  remove,
  changeNumber,
};
