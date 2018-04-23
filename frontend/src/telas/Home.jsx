import React, { Component } from 'react'

class Home extends Component {
    componentDidMount() {
        window.dispatchEvent(new Event('resize'))
    }

    render() {
        return (
            <div className="content-wrapper">
                {/* Content Header (Page header) */}
                <section className="content-header">
                    <h1>
                        Tela inicial
                        <small></small>
                    </h1>
                    {/* <ol className="breadcrumb">
                        <li><a href="#"><i className="fa fa-dashboard"></i> Home Tela1</a></li>
                        <li className="active">Tela1</li>
                    </ol> */}
                </section>
                {/* Main content */}
                <section className="content">
                Bem-vindo ao sistema!
                </section>
            </div>
        )
    }
}

export default Home