import React from 'react'
import ComponentCustom from '../ComponentCustom'
//import { createBrowserHistory } from 'history'

class UserMenu extends ComponentCustom {
    constructor() {
        super()

        this.state = {
            nome: ''
        }
    }

    componentDidMount() {
        const { nome } = JSON.parse(sessionStorage.getItem('dados-usuario'))

        this.setState({ nome })
    }

    minhaConta() {

    }

    sair() {
        //const history = createBrowserHistory()
        sessionStorage.removeItem('dados-usuario')
        const { history } = this.props
        history.push('/login')
    }

    render() {
        return (
            <li className="dropdown user user-menu">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                    <img src="dist/img/user2-160x160.jpg" className="user-image" alt="User" />
                    <span className="hidden-xs">Alexander Pierce</span>
                </a>
                <ul className="dropdown-menu">
                    {/* User image */}
                    <li className="user-header">
                        <img src="dist/img/user2-160x160.jpg" className="img-circle" alt="User" />

                        <p>
                            Alexander Pierce - Web Developer
                            <small>Member since Nov. 2012</small>
                        </p>
                    </li>
                    {/* Menu Body */}
                    <li className="user-body">
                        <div className="row">
                            <div className="col-xs-4 text-center">
                                <a>Followers</a>
                            </div>
                            <div className="col-xs-4 text-center">
                                <a>Sales</a>
                            </div>
                            <div className="col-xs-4 text-center">
                                <a>Friends</a>
                            </div>
                        </div>
                        {/* /.row */}
                    </li>
                    {/* Menu Footer*/}
                    <li className="user-footer">
                        <div className="pull-left">
                            <button onClick={this.minhaConta.bind(this)} className="btn btn-default btn-flat">Minha conta</button>
                        </div>
                        <div className="pull-right">
                            <button onClick={this.sair.bind(this)} className="btn btn-default btn-flat">Sair</button>
                        </div>
                    </li>
                </ul>
            </li>
        )
    }
}

export default UserMenu