import axiosInstance from './axios'

class AxiosServie {
  constructor() {

  }

  get(url: string) {
    return axiosInstance.get(`/${url}`).then(response => response);
  }

  post(url: string) {
    return axiosInstance.post(`/${url}`).then(response => response);
  }

  put(url: string) {
    return axiosInstance.put(`/${url}`).then(response => response);
  }

  del(url: string) {
    return axiosInstance.delete(`/${url}`).then(response => response);
  }
}

export default new AxiosServie()