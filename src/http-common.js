import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8080/CaseModel",
  headers: {
    "Content-type": "application/json"
  }
});