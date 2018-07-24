import React from 'react'
import ComponentCustom from '../componentes/ComponentCustom'

import ContentHeader from '../componentes/base_layout/ContentHeader'

import Modal from '../componentes/modal/Modal'
import Box from '../componentes/base_layout/Box'
import Table from '../componentes/base_layout/Table'
import EditButton from '../componentes/buttons/EditButton'
import RemoveButton from '../componentes/buttons/RemoveButton'

import FormGroupInput from '../componentes/form/FormGroupInput'

import UsuarioApi from '../api/UsuarioApi'
import GruposApi from '../api/GruposApi'

import $ from 'jquery'
import '../fixes/jquery-fix'
import 'admin-lte/bower_components/bootstrap/js/modal'

class Usuarios extends ComponentCustom {
    constructor() {
        super()
        this.state = {
            alteracao: false,
            usuarios: [], idGrupo: '', grupos: [],
            nome: '', email: '', senha: ''
        }
    }

    componentDidMount() {
        window.dispatchEvent(new Event('resize'))

        GruposApi.listar().then(({data}) => {
            if (data.responseStatus === 1) {
                this.setState({ grupos: data.grupos })
            }
        })

        UsuarioApi.listar().then(({data}) => {
            if (data.responseStatus === 1) {
                this.setState({ usuarios: data.usuarios })
            }
        })
    }

    abrirCadastroNovaTela() {
        this.idUsuario = 0
        this.setState({ alteracao: false, nome: '', email: '', senha: '', idGrupo: '' })
        $('#modal_usuarios').modal('toggle')
    }

    editar({ usuario }) {
        const { id, nome, email, grupo } = usuario

        this.idUsuario = id

        this.setState({ alteracao: true, nome, email, idGrupo: grupo.id })

        $('#modal_usuarios').modal('toggle')
    }

    excluir({usuario}) {
        UsuarioApi.remover(usuario.id)
        .then(({data}) => {
            if (data.responseStatus === 1) {
                this.idUsuario = 0

                UsuarioApi.listar().then(({data}) => {
                    this.setState({ usuarios: data.usuarios })
                })
            }
        })
        .catch(err => console.log(err))
    }

    salvarAlteracoes() {
        if (this.state.alteracao) {
            UsuarioApi.atualizar({
                id: this.idUsuario,
                nome: this.state.nome,
                email: this.state.email,
                fkIdGrupo: this.state.idGrupo
            })
            .then(({data}) => {
                if (data.responseStatus === 1) {
                    $('#modal_usuarios').modal('toggle')
                    this.idUsuario = 0

                    this.setState({ nome: '', email: '', senha: '', fkIdGrupo: '' })

                    UsuarioApi.listar().then(({data}) => {
                        if (data.responseStatus === 1) {
                            this.setState({ usuarios: data.usuarios })
                        }
                    })
                }
            })
            .catch(err => console.log(err))
        } else {
            UsuarioApi.cadastrar({
                nome: this.state.nome,
                email: this.state.email,
                senha: this.state.senha,
                fkIdGrupo: this.state.idGrupo
            })
            .then(({data}) => {
                if (data.responseStatus === 1) {
                    $('#modal_usuarios').modal('toggle')
                    this.idUsuario = 0

                    this.setState({ nome: '', email: '', senha: '', fkIdGrupo: '' })

                    UsuarioApi.listar().then(({data}) => {
                        if (data.responseStatus === 1) {
                            this.setState({ usuarios: data.usuarios })
                        }
                    })
                }
            })
            .catch(err => console.log(err))
        }
    }

    render() {
        return (
            <div className="content-wrapper">
                <ContentHeader title="Usuários" description="Controle de usuários do sistema" path={['Usuários']} />
                <section className="content">
                    <div className="row">
                        <div className="col-xs-12">
                            <Box titulo={"Total: " + this.state.usuarios.length} novoButtonText="Nova tela"
                                novoButtonClick={this.abrirCadastroNovaTela.bind(this)}>
                                <Table headers={['Nome', 'E-mail', 'Grupo', 'Ações']} list={this.state.usuarios} 
                                rowBuilder={
                                    (usuario, index) =>
                                    <tr key={index}>
                                        <td style={{ with: '45%' }}>{usuario.nome}</td>
                                        <td style={{ with: '50%' }}>{usuario.email}</td>
                                        <td style={{ with: '50%' }}>{usuario.grupo.nome}</td>
                                        <td style={{ with: '5%', textAlign: 'center' }}>
                                            <EditButton style={{ marginRight: '5px' }}
                                            clickAction={() => {this.editar({ usuario })}} />
                                            <RemoveButton clickAction={() => {this.excluir({ usuario })}} />
                                        </td>
                                    </tr>
                                } />
                            </Box>
                        </div>
                    </div>

                    <Modal titulo={this.state.alteracao ? "Edição" : "Cadastro"} modalId="modal_usuarios"
                    salvarOnClick={this.salvarAlteracoes.bind(this)}>
                        <div className="form-horizontal">
                            <div className="form-group">
                                <label htmlFor="slGrupos" className="col-sm-2 control-label">Grupos</label>

                                <div className="col-sm-10">
                                    <select id="slGrupos" className="form-control"
                                    value={!this.state.idGrupo ? '0' : this.state.idGrupo} onChange={this.set.bind(this, 'idGrupo')}>
                                        <option value="0">--- SELECIONE ---</option>
                                        {
                                            this.state.grupos.map((grupo, index) =>
                                                <option key={index} value={grupo.id}>{grupo.nome}</option>
                                            )
                                        }  
                                    </select>
                                </div>
                            </div>
                            <FormGroupInput labelCssClass="col-sm-2" labelText="Nome"
                                inputId="txtNome" inputCssClass="col-sm-10" type="text" placeholder="Nome"
                                value={this.state.nome} onChange={this.set.bind(this, 'nome')} />

                            <FormGroupInput labelCssClass="col-sm-2" labelText="E-mail"
                                inputId="txtEmail" inputCssClass="col-sm-10" type="email" placeholder="E-mail"
                                value={this.state.email} onChange={this.set.bind(this, 'email')} />
                            {
                            this.state.alteracao ? null :
                            <FormGroupInput labelCssClass="col-sm-2" labelText="Senha"
                                inputId="txtSenha" inputCssClass="col-sm-10"  type="password" placeholder="Senha"
                                value={this.state.senha} onChange={this.set.bind(this, 'senha')} />
                            }
                        </div>
                    </Modal>
                </section>
            </div>
        )
    }
}

export default Usuarios