import React, { Component } from 'react'
import ContentHeader from '../componentes/base_layout/ContentHeader'

class Tela1 extends Component {
    componentDidMount() {
        window.dispatchEvent(new Event('resize'))
    }

    render() {
        return (
            <div className="content-wrapper">
                <ContentHeader title="Tela1" description="Tela1 Control panel" path={['Telas1']} />
                <section className="content">
                Tela1
                </section>
            </div>
        )
    }
}

export default Tela1