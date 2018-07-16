import React, { Component } from 'react'
import ContentHeader from '../componentes/base_layout/ContentHeader'
import Modal from '../componentes/modal/Modal'
import TelaApi from '../api/TelaApi'

import $ from 'jquery'
import '../fixes/jquery-fix'
//import 'admin-lte/bower_components/bootstrap/dist/js/bootstrap.min'

class Telas extends Component {
    constructor() {
        super()
        this.state = {
            telas: []
        }
    }
    componentDidMount() {
        window.dispatchEvent(new Event('resize'))

        TelaApi.listar().then((retorno) => {
            this.setState({ telas: retorno.data })
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
                                                    <td style={{with: '45%'}}>{tela.nome}</td>
                                                    <td style={{with: '50%'}}>{tela.path}</td>
                                                    <td style={{with: '5%', textAlign: 'center'}}>
                                                        <button onClick={() => {
                                                            $('#teste').modal('toggle')
                                                        }} style={{marginRight: '5px'}} className="btn btn-warning btn-flat">
                                                            <i class="fa fa-edit"></i>
                                                        </button>
                                                        <button className="btn btn-danger btn-flat">
                                                            <i class="fa fa-remove"></i>
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
                    {/* <ul>
                        {
                            this.buildTelas(this.state.telas)
                        }
                    </ul> */}
                    <Modal titulo="Teste" modalId="teste">
                        Testando
                    </Modal>
                </section>
            </div>
        )
    }
}

export default Telas