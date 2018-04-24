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
                        <li><a href="#"><i className="fa fa-dashboard"></i> Telas</a></li>
                        {/* <li className="active">Tela1</li> */}
                    </ol>
                </section>
                {/* Main content */}
                <section className="content">
                    <ul>
                        {
                            this.buildTelas(this.state.telas)
                        }
                        {/* <li>
                            Teu cu 1
                            <ul>
                                <li>Teu cu 1.1</li>
                                <li>Teu cu 1.2</li>
                                <li>Teu cu 1.3
                                    <ul>
                                        <li>Teu cu 1.3.1</li>
                                        <li>Teu cu 1.3.2</li>
                                        <li>Teu cu 1.3.3</li>
                                    </ul>
                                </li>
                            </ul>
                        </li> */}
                    </ul>
                </section>
            </div>
        )
    }
}

export default Telas