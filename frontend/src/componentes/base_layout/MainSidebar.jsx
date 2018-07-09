import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import $ from 'jquery'
import '../../fixes/jquery-fix'

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
        //alert(this.context.history)
        let dadosUsuario = JSON.parse(sessionStorage.getItem('dados-usuario'))
        this.setState({ telas: dadosUsuario.telasPermitidas }, () => {
            //carregarTree()
        })
    }

    buildMenuItem(telas, subItem) {
        telas = !telas ? [] : telas
        if (telas.length > 0) {
            // data-widget={!subItem ? "tree" : ""}
            return (
                <ul className={'widget-tree ' +` treeParent${telas[0].fk_id_tela} `+ (!subItem ? "sidebar-menu" : "treeview-menu")}>
                {
                    telas.map((tela, index) => {
                        let subTelas = !tela.telas ? [] : tela.telas

                        return (
                            tela.path ? 
                            <li key={tela.id} className="treeview">
                                
                                <Link className={"link"+tela.id} to={tela.path}>
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
                            <li id={"item-"+tela.id} key={tela.id} className="treeview">
                                <a onClick={(e) => {
                                    if (!$(e.target).parent().hasClass('menu-open')) {
                                        $(e.target).parent().addClass('menu-open')
                                        $(e.target).parent().find('ul.treeview-menu').first().fadeIn(500)
                                    } else {
                                        $(e.target).parent().removeClass('menu-open')
                                        $(e.target).parent().find('ul.treeview-menu').first().fadeOut(500)
                                    }
                                }}>
                                    <i onClick={(e) => {
                                        if (!$(e.target).parent().parent().hasClass('menu-open')) {
                                            $(e.target).parent().parent().addClass('menu-open')
                                            $(e.target).parent().parent().find('ul.treeview-menu').first().fadeIn(500)
                                        } else {
                                            $(e.target).parent().parent().removeClass('menu-open')
                                            $(e.target).parent().parent().find('ul.treeview-menu').first().fadeOut(500)
                                        }
                                    }} className="fa fa-circle-o"></i>
                                    <span onClick={(e) => {
                                        if (!$(e.target).parent().parent().hasClass('menu-open')) {
                                            $(e.target).parent().parent().addClass('menu-open')
                                            $(e.target).parent().parent().find('ul.treeview-menu').first().fadeIn(500)
                                        } else {
                                            $(e.target).parent().parent().removeClass('menu-open')
                                            $(e.target).parent().parent().find('ul.treeview-menu').first().fadeOut(500)
                                        }
                                    }}>{tela.nome}</span>
                                    {
                                        (subTelas.length > 0)
                                        ? <span onClick={(e) => {
                                            if (!$(e.target).parent().parent().hasClass('menu-open')) {
                                                $(e.target).parent().parent().addClass('menu-open')
                                                $(e.target).parent().parent().find('ul.treeview-menu').first().fadeIn(500)
                                            } else {
                                                $(e.target).parent().parent().removeClass('menu-open')
                                                $(e.target).parent().parent().find('ul.treeview-menu').first().fadeOut(500)
                                            }
                                        }} className="pull-right-container">
                                            <i onClick={(e) => {
                                                if (!$(e.target).parent().parent().parent().hasClass('menu-open')) {
                                                    $(e.target).parent().parent().parent().addClass('menu-open')
                                                    $(e.target).parent().parent().parent().find('ul.treeview-menu').first().fadeIn(500)
                                                } else {
                                                    $(e.target).parent().parent().parent().removeClass('menu-open')
                                                    $(e.target).parent().parent().parent().find('ul.treeview-menu').first().fadeOut(500)
                                                }
                                            }} className="fa fa-angle-left pull-right"></i>
                                        </span>
                                        : null
                                    }
                                </a>
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