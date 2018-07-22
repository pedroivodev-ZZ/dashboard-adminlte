import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3004/api/acessos'
})

export const listar = () => api.get(`/`)
export const listarTelasPorGrupo = (idGrupo) => api.get(`/telas_por_grupo/?id_grupo=${idGrupo}`)
export const cadastrar = (acesso) => api.post('/', acesso)
export const atualizar = (acesso) => api.put(`/${acesso.id}`, acesso)
export const remover = (id) => api.delete(`/${id}`)

export default {
    listar, listarTelasPorGrupo, cadastrar, atualizar, remover
}