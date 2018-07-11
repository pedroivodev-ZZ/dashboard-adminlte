import React, { Component } from 'react'
import ContentHeader from '../componentes/base_layout/ContentHeader'

class Home extends Component {
    componentDidMount() {
        window.dispatchEvent(new Event('resize'))
    }

    render() {
        return (
            <div className="content-wrapper">
                <ContentHeader title="Tela inicial" breadcrumb={false} />
                <section className="content">
                Bem-vindo ao sistema!
                </section>
            </div>
        )
    }
}

export default Home