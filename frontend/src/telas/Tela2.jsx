import React, { Component } from 'react'
import ContentHeader from '../componentes/base_layout/ContentHeader'

class Tela2 extends Component {
    componentDidMount() {
        window.dispatchEvent(new Event('resize'))
    }

    render() {
        return (
            <div className="content-wrapper">
                <ContentHeader title="Tela2" description="Tela2 Control panel" path={['Telas2']} />
                <section className="content">
                Tela2
                </section>
            </div>
        )
    }
}

export default Tela2