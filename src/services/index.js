import axios from "axios";

export const getUser = nomeUsuario => {
  return axios.get(`https://api.github.com/users/${nomeUsuario}`);
};

export const getReposByUser = (nomeUsuario, page) => {
  return axios.get(
    `https://api.github.com/users/${nomeUsuario}/repos?per_page=8&page=${page}`
  );
};
