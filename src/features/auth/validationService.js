import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const user = cookies.get("user") ?? 0;
const API_URL = "https://localhost:475/auth/";
const headers = {
  Authorization: "Bearer " + user.Token,
  "Content-Type": "application/json",
};

const checkExistingUsername = async (username) => {
  var config = {
    method: "post",
    url: API_URL + "cusername",
    headers: headers,
    data: JSON.stringify(username),
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

const checkExistingMail = async (email) => {
  var config = {
    method: "post",
    url: API_URL + "cmail",
    headers: headers,
    data: JSON.stringify(email),
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

const validationService = {
  checkExistingMail,
  checkExistingUsername,
};

export default validationService;
