import axios from "axios";

// const API_URL = "http://localhost:747/main/";
const API_URL = "https://tapi.herrguller.cc/main/";
const secret = import.meta.env.VITE_SECRET;

const exercisesByCategory = async (reqData) => {
  var config = {
    method: "get",
    url: API_URL + "get/exercises?category=" + reqData.category,
    headers: {
      Authorization: "Bearer " + secret,
      "Content-Type": "application/json",
    },
  };

  var data = await axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return { data: error.response.data, status: error.response.status };
    });

  return data;
};

const mainService = {
  exercisesByCategory,
};

export default mainService;
