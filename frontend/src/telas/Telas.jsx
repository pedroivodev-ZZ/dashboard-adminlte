import React from 'react'
import ComponentCustom from '../componentes/ComponentCustom'
import PubSub from 'pubsub-js'

import ContentHeader from '../componentes/base_layout/ContentHeader'
import Modal from '../componentes/modal/Modal'
import Box from '../componentes/base_layout/Box'
import Table from '../componentes/base_layout/Table'
import EditButton from '../componentes/buttons/EditButton'
import RemoveButton from '../componentes/buttons/RemoveButton'
import TelaApi from '../api/TelaApi'

import { ATUALIZAR_MENU } from '../PubSubMessages.ts'

import $ from 'jquery'
import '../fixes/jquery-fix'
import 'admin-lte/bower_components/bootstrap/js/modal'

class Telas extends ComponentCustom {
    constructor() {
        super()
        this.state = {
            alteracao: false,
            telas: [], nome: '', path: '', idTelaMae: '0'
        }

        this.idTela = 0
    }
 
    componentDidMount() {
        window.dispatchEvent(new Event('resize'))

        this.editar = this.editar.bind(this)

        TelaApi.listar().then(({data}) => {
            this.setState({ telas: data.telas })
        })
    }

    buildTelas(telas) {
        if (telas) {
            return (
                <ul>
                    {
                        telas.map((tela, index) => {
                            return (
                                <li key={index}>
                                    {tela.nome}
                                    {this.buildTelas(tela.telas)}
                                </li>
                            )
                        })
                    }
                </ul>
            )
        } else {
            return null
        }
    }

    abrirCadastroNovaTela() {
        this.idTela = 0
        this.setState({ alteracao: false, nome: '', path: '', idTelaMae: '0' })
        $('#modal_tela').modal('toggle')
    }

    editar({ tela }) {
        this.idTela = tela.id
        this.setState({ alteracao: true, nome: tela.nome, path: tela.path, idTelaMae: tela.fk_id_tela })
        $('#modal_tela').modal('toggle')
    }

    excluir({tela}) {
        TelaApi.remover(tela.id)
        .then(({data}) => {
            this.idTela = 0

            PubSub.publish(ATUALIZAR_MENU)

            TelaApi.listar().then(({data}) => {
                this.setState({ telas: data.telas })
            })
        })
        .catch(err => console.log(err))
    }

    salvarAlteracoes() {
        if (this.state.alteracao) {
            TelaApi.atualizar({
                id: this.idTela,
                nome: this.state.nome,
                path: this.state.path,
                idTelaMae: this.state.idTelaMae
            })
            .then((dado) => {
                $('#modal_tela').modal('toggle')
                this.idTela = 0

                PubSub.publish(ATUALIZAR_MENU)

                this.setState({ nome: '', path: '' })

                TelaApi.listar().then(({data}) => {
                    this.setState({ telas: data.telas })
                })
            })
            .catch(err => console.log(err))
        } else {
            TelaApi.cadastrar({
                nome: this.state.nome,
                path: this.state.path
            })
            .then((dado) => {
                $('#modal_tela').modal('toggle')
                this.idTela = 0

                PubSub.publish(ATUALIZAR_MENU)

                this.setState({ nome: '', path: '' })

                TelaApi.listar().then(({data}) => {
                    this.setState({ telas: data.telas })
                })
            })
            .catch(err => console.log(err))
        }
    }

    render() {
        return (
            <div className="content-wrapper">
                <ContentHeader title="Telas" description="Controle de telas do sistema" path={['Telas']} />
                <section className="content">
                    <div className="row">
                        <div className="col-xs-12">
                            <Box titulo={"Total: " + this.state.telas.length} novoButtonText="Nova tela"
                                novoButtonClick={this.abrirCadastroNovaTela.bind(this)}>
                                <Table headers={['Nome', 'Path', 'Ações']} list={this.state.telas} 
                                rowBuilder={
                                    (tela, index) =>
                                    <tr key={index}>
                                        <td style={{ with: '45%' }}>{tela.nome}</td>
                                        <td style={{ with: '50%' }}>{tela.path}</td>
                                        <td style={{ with: '5%', textAlign: 'center' }}>
                                            <EditButton style={{ marginRight: '5px' }}
                                            clickAction={() => {this.editar({ tela })}} />
                                            <RemoveButton clickAction={() => {this.excluir({ tela })}} />
                                        </td>
                                    </tr>
                                } />
                            </Box>
                        </div>
                    </div>
                    <Modal titulo={this.state.alteracao ? "Edição" : "Cadastro"} modalId="modal_tela"
                    salvarOnClick={this.salvarAlteracoes.bind(this)}>
                        <div className="form-horizontal">
                            <div className="form-group">
                                <label htmlFor="slTelas" className="col-sm-2 control-label">Nome</label>

                                <div className="col-sm-10">
                                    <select ref="txtNome" className="form-control"
                                    value={!this.state.idTelaMae ? '0' : this.state.idTelaMae} onChange={this.set.bind(this, 'idTelaMae')}>
                                        <option value="0">--- SELECIONE ---</option>
                                        {
                                            this.state.telas.map((tela, index) =>
                                                <option key={index} value={tela.id}>{tela.nome}</option>
                                            )
                                        }  
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="txtNome" className="col-sm-2 control-label">Nome</label>

                                <div className="col-sm-10">
                                    <input type="text" className="form-control" ref="txtNome" placeholder="Nome"
                                    value={this.state.nome} onChange={this.set.bind(this, 'nome')} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="txtPath" className="col-sm-2 control-label">Caminho</label>

                                <div className="col-sm-10">
                                    <input type="text" className="form-control" ref="txtPath" placeholder="Caminho"
                                    value={this.state.path} onChange={this.set.bind(this, 'path')} />
                                </div>
                            </div>
                        </div>
                    </Modal>
                </section>
            </div>
        )
    }
}

export default Telas