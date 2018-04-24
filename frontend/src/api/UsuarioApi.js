import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3004/api'
})

export const login = (email, senha) => api.get(`usuarios/login?email=${email}&senha=${senha}`)

export const listar = () => api.get('usuarios')
export const cadastrar = (usuario) => api.post('usuarios', usuario)
export const atualizar = (usuario) => api.put(`usuarios/${usuario._id}`, usuario)
export const remover = (id) => api.delete(`usuarios/${id}`)

export default {
  login,
  listar, cadastrar, atualizar, remover
}