import React, { Component } from 'react'

class ControleAcessos extends Component {
    componentDidMount() {
        window.dispatchEvent(new Event('resize'))
    }

    render() {
        return (
            <div className="content-wrapper">
                {/* Content Header (Page header) */}
                <section className="content-header">
                    <h1>
                        Controle de Acessos
                        <small></small>
                    </h1>
                    <ol className="breadcrumb">
                        <li><a><i className="fa fa-dashboard"></i> Controle de Acessos</a></li>
                        {/* <li className="active">Tela1</li> */}
                    </ol>
                </section>
                {/* Main content */}
                <section className="content">
                Controle de Acessos
                </section>
            </div>
        )
    }
}

export default ControleAcessos