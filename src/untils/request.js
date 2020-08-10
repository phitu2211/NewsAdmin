const axios = require("axios").default;
// let AUTH_TOKEN =
//   "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbkBhZG1pbi5jb20iLCJqdGkiOiIxOTc2ZDFmMS1kMmFmLTQyYjItYTYwMS1kMDA5NzcwM2Q0YjgiLCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlkIjoiNDE0NTljZTEtNDQwNy00YWFjLWI5ZmItNzJkYzA1OWRiMDA4Iiwicm9sZSI6WyJBZG1pbiIsIlVzZXIiXSwibmJmIjoxNTk0Nzk1NTgwLCJleHAiOjE1OTY4NjkxODAsImlhdCI6MTU5NDc5NTU4MH0.SK51drv-Pn46r1j99j76Si5y0YP3J9q67zmruswZvtM";
let AUTH_TOKEN = "bearer " + localStorage.getItem("token");

// axios.defaults.baseURL = "https://localhost:5001/api/v1/";
axios.defaults.baseURL = "https://apinews.azurewebsites.net/api/v1/";
axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
axios.defaults.headers.post["Content-Type"] = "application/json";

export default axios;
