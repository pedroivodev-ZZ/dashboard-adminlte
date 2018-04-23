import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3004/api'
})

export const login = (email, senha) => api.get(`login?email=${email}&senha=${senha}`)

export default {
    login
}