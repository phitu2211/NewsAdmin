const axios = require("axios").default;
let AUTH_TOKEN = "bearer " + localStorage.getItem("token");

// axios.defaults.baseURL = "https://localhost:5001/api/v1/";
axios.defaults.baseURL = "https://apinews.azurewebsites.net/api/v1/";
axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
axios.defaults.headers.post["Content-Type"] = "application/json";

export default axios;
