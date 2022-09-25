import axios from 'axios';

const axiosClient = axios.create();

axiosClient.defaults.baseURL = 'http://localhost:3000/api/';

if (localStorage.getItem('token')) {
  axiosClient.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
}

axiosClient.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';

axiosClient.interceptors.request.use(function (response) {
  return response;
}, function (error) {
  if (error.response.status === 401) {
      console.log('need to refresh token');

      // axiosClient.get()
    }

    return Promise.reject(error);
});

export default axiosClient