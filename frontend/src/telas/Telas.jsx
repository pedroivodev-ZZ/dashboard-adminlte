import React, { Component } from 'react'
import TelaApi from '../api/TelaApi'

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
            this.setState({telas: retorno.data})
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
                {/* Content Header (Page header) */}
                <section className="content-header">
                    <h1>
                        Telas
                        <small>Controle de telas do sistema</small>
                    </h1>
                    <ol className="breadcrumb">
                        <li><a><i className="fa fa-dashboard"></i> Telas</a></li>
                        {/* <li className="active">Tela1</li> */}
                    </ol>
                </section>
                {/* Main content */}
                <section className="content">
                    <ul>
                        {
                            this.buildTelas(this.state.telas)
                        }
                    </ul>
                </section>
            </div>
        )
    }
}

export default Telas