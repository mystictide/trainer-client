import axios from "axios";
import { storeWithDate } from "../../assets/js/helpers";

// const API_URL = "https://localhost:475/cms/";
const API_URL = "https://tapi.herrguller.cc/cms/";
const secret = import.meta.env.VITE_SECRET;

const getCategories = async () => {
  var config = {
    method: "get",
    url: API_URL + "get/categories",
    headers: {
      Authorization: "Bearer " + secret,
      "Content-Type": "application/json",
    },
  };

  var data = await axios(config)
    .then(function (response) {
      storeWithDate("categories", JSON.stringify(response.data), 1);
      return response.data;
    })
    .catch(function (error) {
      return { data: error.response.data, status: error.response.status };
    });

  return data;
};

const filterExercises = async (reqData) => {
  const secretHandle = reqData.handle ? secret : reqData.secret;
  var config = {
    method: "post",
    url: API_URL + "filter/exercises",
    headers: {
      Authorization: "Bearer " + secretHandle,
      "Content-Type": "application/json",
    },
    data: JSON.stringify(reqData.filter),
  };
  var data = await axios(config)
    .then(function (response) {
      storeWithDate("filteredExercises", JSON.stringify(response.data), 1);
      return response.data;
    })
    .catch(function (error) {
      return { data: error.response.data, status: error.response.status };
    });

  return data;
};

const manageExercise = async (reqData) => {
  var config = {
    method: "post",
    url: API_URL + "manage/exercise",
    headers: {
      Authorization: "Bearer " + secret,
      "Content-Type": "application/json",
    },
    data: JSON.stringify(reqData),
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

const manageCategory = async (reqData) => {
  var config = {
    method: "post",
    url: API_URL + "manage/category",
    headers: {
      Authorization: "Bearer " + secret,
      "Content-Type": "application/json",
    },
    data: JSON.stringify(reqData),
  };

  var data = await axios(config)
    .then(function (response) {
      storeWithDate("categories", JSON.stringify(response.data), 1);
      return response.data;
    })
    .catch(function (error) {
      return { data: error.response.data, status: error.response.status };
    });

  return data;
};

const cmsService = {
  getCategories,
  filterExercises,
  manageExercise,
  manageCategory,
};

export default cmsService;
