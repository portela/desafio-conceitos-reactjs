import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3333",
});

export default {
  listRepositories() {
    return api.get(`/repositories`);
  },

  removeRepository(id) {
    return api.delete(`/repositories/${id}`);
  },
};
