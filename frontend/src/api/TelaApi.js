import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3004/api/telas'
})

export const listar = () => api.get('/')
export const listarComoArvore = () => api.get('/arvore')
export const cadastrar = (tela) => api.post('/', tela)
export const atualizar = (tela) => api.put(`/${tela.id}`, tela)
export const remover = (id) => api.delete(`/${id}`)

export default {
    listar, listarComoArvore, cadastrar, atualizar, remover
}