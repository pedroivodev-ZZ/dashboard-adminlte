import React, { Component } from 'react'

export default class ContentHeader extends Component {
    render() {
        const { path, title, description, breadcrumb } = this.props
        return (
            <section className="content-header">
                <h1>
                    { title }
                    <small>{ description }</small>
                </h1>
                {
                    breadcrumb === false ? null :
                    <ol className={"breadcrumb"}>
                        {path ? path.map((item, index) => <li key={index}><a><i className="fa fa-dashboard">{item}</i></a></li>) : null}
                    </ol>
                }
            </section>
        )
    }
}