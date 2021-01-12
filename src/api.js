import axios from 'axios'
const url = "http://localhost:4000"

export const users = {
    fetchAll: () => axios.get(`${url}/api/users`).then(res => res.data),
    create: user => axios.post(`${url}/api/register`, user),
    delete: user => axios.delete(`${url}/api/${user.username}`),
    login: credentials =>
      axios.post(`${url}/api/login`, credentials).then(res => res.data.access_token),
    
}

export const setAuthorizationHeader = (token = null) => {
    if (token) {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      } else {
        delete axios.defaults.headers.common.Authorization;
      }
}
