import axios from 'axios';

let token = '';
 if(localStorage.getItem('user')) {
  token = JSON.parse(localStorage.getItem('user')).accessToken
 }

export default axios.create({
  baseURL: "http://localhost:3000/api/",
  headers: {
    "Content-type": "application/json",
    "x-access-token": token
  }
});
