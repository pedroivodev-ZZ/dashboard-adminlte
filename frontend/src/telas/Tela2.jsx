import React, { Component } from 'react'

class Tela2 extends Component {
    componentDidMount() {
        window.dispatchEvent(new Event('resize'))
    }

    render() {
        return (
            <div className="content-wrapper">
                {/* Content Header (Page header) */}
                <section className="content-header">
                    <h1>
                    Tela2
                        <small>Tela2 Control panel</small>
                    </h1>
                    <ol className="breadcrumb">
                        {/* <li><a href="#"><i className="fa fa-dashboard"></i> Home Tela2</a></li> */}
                        <li className="active">Tela2</li>
                    </ol>
                </section>
                {/* Main content */}
                <section className="content">
                Tela2
                </section>
            </div>
        )
    }
}

export default Tela2