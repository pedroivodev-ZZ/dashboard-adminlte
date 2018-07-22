import React from 'react'
import ComponentCustom from '../componentes/ComponentCustom'

import ContentHeader from '../componentes/base_layout/ContentHeader'

import Modal from '../componentes/modal/Modal'
import Box from '../componentes/base_layout/Box'
import Table from '../componentes/base_layout/Table'
import EditButton from '../componentes/buttons/EditButton'
import RemoveButton from '../componentes/buttons/RemoveButton'
import GruposApi from '../api/GruposApi'

import $ from 'jquery'
import '../fixes/jquery-fix'
import 'admin-lte/bower_components/bootstrap/js/modal'

class Grupos extends ComponentCustom {
    constructor() {
        super()
        this.state = {
            alteracao: false,
            grupos: [], nome: ''
        }

        this.idGrupo = 0
    }

    componentDidMount() {
        window.dispatchEvent(new Event('resize'))

        GruposApi.listar()
        .then(({data}) => {
            this.setState({grupos: data.grupos})
        })
    }

    abrirCadastroNovaTela() {
        this.idGrupo = 0
        this.setState({ alteracao: false, nome: '' })
        $('#modal_grupos').modal('toggle')
    }

    salvarAlteracoes() {
        if (this.state.alteracao) {
            GruposApi.atualizar({
                id: this.idGrupo,
                nome: this.state.nome
            })
            .then((dado) => {
                $('#modal_grupos').modal('toggle')
                this.idGrupo = 0

                this.setState({ nome: '' })

                GruposApi.listar().then(({data}) => {
                    this.setState({ grupos: data.grupos })
                })
            })
            .catch(err => console.log(err))
        } else {
            GruposApi.cadastrar({
                nome: this.state.nome
            })
            .then((dado) => {
                $('#modal_grupos').modal('toggle')
                this.idGrupo = 0

                this.setState({ nome: '' })

                GruposApi.listar().then(({data}) => {
                    this.setState({ grupos: data.grupos })
                })
            })
            .catch(err => console.log(err))
        }
    }

    editar({grupo}) {
        this.idGrupo = grupo.id
        this.setState({ alteracao: true, nome: grupo.nome })
        $('#modal_grupos').modal('toggle')
    }

    excluir({grupo}) {
        GruposApi.remover(grupo.id)
        .then(({data}) => {
            this.idGrupo = 0

            GruposApi.listar().then(({data}) => {
                this.setState({ grupos: data.grupos })
            })
        })
        .catch(err => console.log(err))
    }

    render() {
        return (
            <div className="content-wrapper">
                <ContentHeader title="Grupos" description="Controle de grupos do sistema" path={['Grupos']} />
                <section className="content">
                    <div className="row">
                        <div className="col-xs-12">
                            <Box titulo={"Total: " + this.state.grupos.length} novoButtonText="Nova tela"
                                novoButtonClick={this.abrirCadastroNovaTela.bind(this)}>
                                <Table headers={['Nome', 'Ações']} list={this.state.grupos} 
                                rowBuilder={
                                    (grupo, index) =>
                                    <tr key={index}>
                                        <td style={{ with: '45%' }}>{grupo.nome}</td>
                                        <td style={{ with: '5%', textAlign: 'center' }}>
                                            <EditButton style={{ marginRight: '5px' }}
                                            clickAction={() => {this.editar({ grupo })}} />
                                            <RemoveButton clickAction={() => {this.excluir({ grupo })}} />
                                        </td>
                                    </tr>
                                } />
                            </Box>
                        </div>
                    </div>

                    <Modal titulo={this.state.alteracao ? "Edição" : "Cadastro"} modalId="modal_grupos"
                    salvarOnClick={this.salvarAlteracoes.bind(this)}>
                        <div className="form-horizontal">
                            <div className="form-group">
                                <label htmlFor="txtNome" className="col-sm-2 control-label">Nome</label>

                                <div className="col-sm-10">
                                    <input type="text" className="form-control" ref="txtNome" placeholder="Nome"
                                    value={this.state.nome} onChange={this.set.bind(this, 'nome')} />
                                </div>
                            </div>
                        </div>
                    </Modal>
                </section>
            </div>
        )
    }
}

export default Grupos