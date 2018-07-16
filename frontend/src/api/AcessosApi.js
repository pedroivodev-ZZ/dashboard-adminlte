import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3004/api/acessos'
})

export const listar = () => api.get(`/`)
export const listarTelasPorUsuario = () => api.get(`/listar_por_usuario`)
export const cadastrar = (acesso) => api.post('/', acesso)
export const atualizar = (acesso) => api.put(`/${acesso.id}`, acesso)
export const remover = (id) => api.delete(`/${id}`)

export default {
    listar, cadastrar, atualizar, remover
}