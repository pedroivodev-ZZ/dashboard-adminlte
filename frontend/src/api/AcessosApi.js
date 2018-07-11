import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3004/api'
})

export const listar = () => api.get(`acessos`)
export const cadastrar = (acesso) => api.post('acessos', acesso)
export const atualizar = (acesso) => api.put(`acessos/${acesso.id}`, acesso)
export const remover = (id) => api.delete(`acessos/${id}`)

export default {
    listar, cadastrar, atualizar, remover
}