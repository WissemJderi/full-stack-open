import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};
const getAll = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
};

const create = async (newBlog) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

const addLike = async (newBlog, blogId) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.put(`${baseUrl}/${blogId}`, newBlog, config);
  return response.data;
};

const removeBlog = async (blogId) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.delete(`${baseUrl}/${blogId}`, config);
  return response.data;
};

export default { getAll, setToken, create, addLike, removeBlog };
