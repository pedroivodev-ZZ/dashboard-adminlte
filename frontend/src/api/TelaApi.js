import axios from 'axios'
//import querystring from 'querystring'

const api = axios.create({
  baseURL: 'http://localhost:3004/api'
})

//export const listar = () => api.get(`telas/filtar/?${querystring.stringify({raiz: true})}`)
export const listar = () => api.get(`telas`)
export const cadastrar = (tela) => api.post('telas', tela)
export const atualizar = (tela) => api.put(`telas/${tela._id}`, tela)
export const remover = (id) => api.delete(`telas/${id}`)

export default {
    listar, cadastrar, atualizar, remover
}