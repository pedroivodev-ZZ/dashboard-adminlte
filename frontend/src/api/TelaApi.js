import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3004/api'
})

export const listar = () => api.get(`telas`)
export const cadastrar = (tela) => api.post('telas', tela)
export const atualizar = (tela) => api.put(`telas/${tela.id}`, tela)
export const remover = (id) => api.delete(`telas/${id}`)

export default {
    listar, cadastrar, atualizar, remover
}