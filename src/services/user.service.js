import axios from "../untils/request";
export const userService = {
  login
};

function login(email, password) {
  return axios
    .post("https://apinews.azurewebsites.net/api/v1/login", {
      email: email,
      password: password
    })
    .then(response => {
      if (response.data.data.token) {
        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem(
          "user",
          JSON.stringify(response.data.data.infoAccount)
        );
      }
      return response;
    });
}
