import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3004/api'
})

export const listar = () => api.get(`grupos`)
export const cadastrar = (grupo) => api.post('grupos', grupo)
export const atualizar = (grupo) => api.put(`grupos/${grupo.id}`, grupo)
export const remover = (id) => api.delete(`grupos/${id}`)

export default {
    listar, cadastrar, atualizar, remover
}