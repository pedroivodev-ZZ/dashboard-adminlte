import React, { Component } from 'react'

class ControleUsuarios extends Component {
    componentDidMount() {
        window.dispatchEvent(new Event('resize'))
    }

    render() {
        return (
            <div className="content-wrapper">
                {/* Content Header (Page header) */}
                <section className="content-header">
                    <h1>
                        Controle de Usuarios
                        <small></small>
                    </h1>
                    <ol className="breadcrumb">
                        <li><a href="#"><i className="fa fa-dashboard"></i> Controle de Usuarios</a></li>
                        {/* <li className="active">Tela1</li> */}
                    </ol>
                </section>
                {/* Main content */}
                <section className="content">
                Controle de Usuarios
                </section>
            </div>
        )
    }
}

export default ControleUsuarios