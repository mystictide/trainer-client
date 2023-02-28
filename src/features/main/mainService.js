import axios from "axios";
import { storeWithDate } from "../../assets/js/helpers";

const API_URL = "https://localhost:475/main/";
const headers = {
  "Content-Type": "application/json",
};

const getArtist = async (req) => {
  var config = {
    method: "get",
    url: API_URL + "get/artist?ID=" + req.id,
    headers: headers,
  };

  var data = await axios(config)
    .then(function (response) {
      localStorage.setItem("artist", JSON.stringify(response.data));
      return response.data;
    })
    .catch(function (error) {
      return { data: error.response.data, status: error.response.status };
    });

  return data;
};

const getArtists = async () => {
  var config = {
    method: "get",
    url: API_URL + "get/artists",
    headers: headers,
  };

  var data = await axios(config)
    .then(function (response) {
      storeWithDate("artists", JSON.stringify(response.data), 7);
      return response.data;
    })
    .catch(function (error) {
      return { data: error.response.data, status: error.response.status };
    });

  return data;
};

const mainService = {
  getArtist,
  getArtists,
};

export default mainService;
