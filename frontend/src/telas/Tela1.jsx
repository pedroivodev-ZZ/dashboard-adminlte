import React, { Component } from 'react'

class Tela1 extends Component {
    componentDidMount() {
        window.dispatchEvent(new Event('resize'))
    }

    render() {
        return (
            <div className="content-wrapper">
                {/* Content Header (Page header) */}
                <section className="content-header">
                    <h1>
                        Tela1
                        <small>Tela1 Control panel</small>
                    </h1>
                    <ol className="breadcrumb">
                        {/* <li><a href="#"><i className="fa fa-dashboard"></i> Home Tela1</a></li> */}
                        <li className="active">Tela1</li>
                    </ol>
                </section>
                {/* Main content */}
                <section className="content">
                Tela1
                </section>
            </div>
        )
    }
}

export default Tela1