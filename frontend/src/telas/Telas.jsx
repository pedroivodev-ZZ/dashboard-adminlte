import React, { Component } from 'react'
import ContentHeader from '../componentes/base_layout/ContentHeader'
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
        TelaApi.listarComoArvore().then((retorno) => {
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
                <ContentHeader title="Telas" description="Controle de telas do sistema" path={['Telas']} />
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