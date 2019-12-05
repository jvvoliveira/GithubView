import axios from "axios";

let originalGet = null;
let originalPost = null;
let originalDelete = null;
let originalPatch = null;

let mockResponses = {};

const mockGet = async (url, options) => {
  const res = mockResponses[url];  
  if (!res) throw new Error("Network Error");

  if (res.status && res.status > 399) {
    const error = new Error({ res });
    error.response = res;
    throw error;
  }
  return mockResponses[url];
};

export const axiosToMock = axios => {
  mockResponses = {};
  originalGet = axios.get;
  originalPost = axios.post;
  originalDelete = axios.delete;
  originalPatch = axios.patch;
  axios.addMockResponse = (url, responseObject) => {
    mockResponses[url] = responseObject;
  };
  axios.setMockResponses = responses => {
    mockResponses = responses;
  };
  axios.get = mockGet;
  axios.post = mockGet;
  axios.delete = mockGet;
  axios.patch = mockGet;
};

export const mockToAxios = axios => {
  axios.get = originalGet;
  axios.post = originalPost;
  axios.delete = originalDelete;
  axios.patch = originalPatch;
  mockResponses = {};
};

export const mockAxios = () => {
  axiosToMock(axios);
  return axios;
}

export const restoreAxios = () => {
  axiosToMock(axios);
};
