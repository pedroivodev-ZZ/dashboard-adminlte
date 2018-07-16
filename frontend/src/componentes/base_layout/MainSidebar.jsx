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
        const {nome, telasPermitidas} = JSON.parse(sessionStorage.getItem('dados-usuario'))
        
        this.setState({ nome, telas: telasPermitidas })

        //PubSub.
    }

    menuClickHandler(element, parentLevel) {
        let $parentLi = null
        switch(parentLevel) {
            case 1: $parentLi = $(element).parent()
            break;
            case 2: $parentLi = $(element).parent().parent()
            break;
            case 3: $parentLi = $(element).parent().parent().parent()
            break;
        }

        if (!$parentLi.hasClass('menu-open')) {
            $parentLi.addClass('menu-open')
            $parentLi.find('ul.treeview-menu').first().slideToggle(300)
        } else {
            $parentLi.removeClass('menu-open')
            $parentLi.find('ul.treeview-menu').first().slideToggle(300)
        }
    }

    buildMenuItem(telas, subItem) {
        telas = !telas ? [] : telas
        if (telas.length > 0) {
            return (
                <ul className={!subItem ? "sidebar-menu" : "treeview-menu"}>
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
                                <a onClick={(e) => { this.menuClickHandler(e.target, 1) }}>
                                    <i onClick={(e) => { this.menuClickHandler(e.target, 2) }} className="fa fa-circle-o"></i>
                                    <span onClick={(e) => { this.menuClickHandler(e.target, 2) }}>{tela.nome}</span>
                                    {
                                        (subTelas.length > 0)
                                        ?
                                        <span onClick={(e) => { this.menuClickHandler(e.target, 2) }} className="pull-right-container">
                                            <i onClick={(e) => { this.menuClickHandler(e.target, 3) }}
                                            className="fa fa-angle-left pull-right"></i>
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
                            <p>{this.state.nome}</p>
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