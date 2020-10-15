import axios from "axios";

export const IP_ADDRESS = "http://127.0.0.1:8000/";
export const GET_QUESTION = "api/get_all_question/";
export const GET_INTIAL_MOVIE = "api/get_popular_movies/";
export const POST_ANSWER = "api/post_answer/";
export const RESET_ANSWER = "api/reset_server/";
export const MOVIE_REC = "api/get_recommendation_for_movie/?movie_id=";
//export const GET_LATEST_MOVIE ="api/get_latest_movie/?top_n=10";

export const get = (url) => {
  return axios({
    method: "GET",
    url,
    headers: {
      Accept: "*/*",
    },
  })
    .then(function (response) {
      return response.data;
    })
    .catch(handleError);
};

export const post = (url, data) => {
  return axios({
    method: "POST",
    url,
    headers: {
      Accept: "*/*",
      "Access-Control-Allow-Origin": "*",
    },
    data,
  })
    .then(function (response) {
      return response.data;
    })
    .catch(handleError);
};

const handleError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    if (error.response.status === 500) {
      console.log("server down.");
    }
    const { data } = error.response;

    throw data;
  } else if (error.request) {
    console.log("server down.");
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log("Error", error.message);
  }
};
