import React, { Component } from 'react'
import ContentHeader from '../componentes/base_layout/ContentHeader'
import Modal from '../componentes/modal/Modal'
import TelaApi from '../api/TelaApi'

import $ from 'jquery'
import '../fixes/jquery-fix'
import 'admin-lte/bower_components/bootstrap/js/modal'

class Telas extends Component {
    constructor() {
        super()
        this.state = {
            alteracao: false,
            telas: [], nome: '', path: '', idTelaMae: '0'
        }

        this.idTela = 0
    }
    componentDidMount() {
        this.editar = this.editar.bind(this)

        window.dispatchEvent(new Event('resize'))

        TelaApi.listar().then((retorno) => {
            this.setState({ telas: retorno.data })
        })
    }

    set(nomeCampo, event) {
        let state =  {}
        state[nomeCampo] = event.target.value
        this.setState(state)
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

    editar({ tela }) {
        this.idTela = tela.id
        this.setState({ alteracao: true, nome: tela.nome, path: tela.path, idTelaMae: tela.fk_id_tela })
        $('#modal_tela').modal('toggle')
    }

    excluir() {

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
                console.log(dado)
                $('#modal_tela').modal('toggle')
                this.idTela = 0
                this.setState({ nome: '', path: '' })

                TelaApi.listar().then((retorno) => {
                    this.setState({ telas: retorno.data })
                })
            })
            .catch(err => console.log(err))
        } else {
            TelaApi.cadastrar({
                nome: this.state.nome,
                path: this.state.path
            })
            .then(res => res.json())
            .then((dado) => {
                $('#modal_tela').modal('toggle')
                this.idTela = 0
                this.setState({ nome: '', path: '' })

                TelaApi.listar().then((retorno) => {
                    this.setState({ telas: retorno.data })
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
                            <div className="box">
                                <div className="box-header">
                                    <h3 className="box-title">Total: {this.state.telas.length}</h3>
                                </div>
                                <div className="box-body">
                                    <table ref="example1" className="table table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th>Nome</th>
                                                <th>Path</th>
                                                <th>Ações</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.telas.map((tela, index) =>
                                                    <tr key={index}>
                                                        <td style={{ with: '45%' }}>{tela.nome}</td>
                                                        <td style={{ with: '50%' }}>{tela.path}</td>
                                                        <td style={{ with: '5%', textAlign: 'center' }}>
                                                            <button onClick={
                                                            () => {
                                                                this.editar({ tela })
                                                            }
                                                            } style={{ marginRight: '5px' }} className="btn btn-warning btn-flat">
                                                                <i className="fa fa-edit"></i>
                                                            </button>
                                                            <button className="btn btn-danger btn-flat">
                                                                <i className="fa fa-remove"></i>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
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