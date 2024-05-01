import { baseUrl, getMethod, token } from "../utils/private";

export const getAllMovies = (page) => {
  let url = `${baseUrl}movie/popular?api_key=${token}&language=en-US&page=${
    page ? page : 1
  }`;
  return fetch(url, getMethod);
};
export const getMovieDetail = (movie_id) => {
  let url = `${baseUrl}movie/${movie_id}?api_key=${token}&language=en-US`;
  return fetch(url, getMethod);
};
export const getCastDetails = (movie_id) => {
  let url = `${baseUrl}movie/${movie_id}/credits?api_key=${token}&language=en-US`;
  return fetch(url, getMethod);
};
export const getUpcomingMovies = (page) => {
  let url = `${baseUrl}movie/upcoming?api_key=${token}&language=en-US&page=${
    page ? page : 1
  }`;
  return fetch(url, getMethod);
};
export const getTopRatedMovies = (page) => {
  let url = `${baseUrl}movie/top_rated?api_key=${token}&language=en-US&page=${
    page ? page : 1
  }`;
  return fetch(url, getMethod);
};
export const getSearchResult = (movie_name, page) => {
  let url = `${baseUrl}search/movie?api_key=${token}&language=en-US&query=${movie_name}&page=${
    page ? page : 1
  }`;
  return fetch(url, getMethod);
};
