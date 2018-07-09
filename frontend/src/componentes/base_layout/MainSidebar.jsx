import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import {carregarTree} from '../../fixes/main-sidebar-fix'

class MainSidebar extends Component {
    constructor() {
        super()
        this.state = {
            acessos: []
        }
    }

    componentDidMount() {
        //alert(this.props.history)
        //this.props.history.push('/main/telas')
        let dadosUsuario = JSON.parse(sessionStorage.getItem('dados-usuario'))
        this.setState({ telas: dadosUsuario.telasPermitidas }, () => {
            carregarTree()
        })
    }

    buildMenuItem(telas, subItem) {
        telas = !telas ? [] : telas
        if (telas.length > 0) {
            return (
                <ul className={!subItem ? "sidebar-menu" : "treeview-menu"} data-widget={!subItem ? "tree" : ""}>
                {
                    telas.map((tela, index) => {
                        let subTelas = !tela.telas ? [] : tela.telas

                        return (
                            tela.path ? 
                            <li key={tela.id} className="treeview">
                                
                                <Link to={tela.path} onClick={(e) => {
                                    //e.preventDefault()
                                    //this.props.history.push(tela.path)
                                }}>
                                <i className="fa fa-circle-o"></i>
                                <span>{tela.nome}</span>
                                {
                                    (subTelas.length > 0)
                                    ? <span className="pull-right-container"><i className="fa fa-angle-left pull-right"></i></span>
                                    : null
                                }
                                </Link>
                                { this.buildMenuItem(subTelas, true) }
                            </li>
                            : 
                            <li key={tela.id} className="treeview">
                                {/* <Link to="#" onClick={(e) => {alert();e.preventDefault()}}>*/}
                                <a>
                                <i className="fa fa-circle-o"></i>
                                <span>{tela.nome}</span>
                                {
                                    (subTelas.length > 0)
                                    ? <span className="pull-right-container"><i className="fa fa-angle-left pull-right"></i></span>
                                    : null
                                }
                                </a>
                                {/* </Link> */}
                                { this.buildMenuItem(subTelas, true) }
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
            <aside className="main-sidebar">
                {/* sidebar: style can be found in sidebar.less */}
                <section className="sidebar">
                    {/* Sidebar user panel */}
                    <div className="user-panel">
                        <div className="pull-left image">
                            <img src="dist/img/user2-160x160.jpg" className="img-circle" alt="User" />
                        </div>
                        <div className="pull-left info">
                            <p>Alexander Pierce</p>
                            <a><i className="fa fa-circle text-success"></i> Online</a>
                        </div>
                    </div>
                    {/* sidebar menu: : style can be found in sidebar.less */}
                    {
                        this.buildMenuItem(this.state.telas)
                    }
                </section>
                {/* /.sidebar */}
            </aside>
        )
    }
}

export default MainSidebar