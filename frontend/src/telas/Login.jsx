import React from 'react'
import ComponentCustom from '../componentes/ComponentCustom'
import 'admin-lte/plugins/iCheck/square/blue.css'

import $ from 'jquery'
import '../fixes/jquery-fix'
import 'admin-lte/plugins/iCheck/icheck.min'

import UsuarioApi from '../api/UsuarioApi'

class Login extends ComponentCustom {
    constructor() {
        super()

        this.state = {
            email: '',
            senha: ''
        }
    }

    componentDidMount() {
        window.document.querySelector('body').setAttribute('class', 'hold-transition login-page')
        $('input').iCheck({
            checkboxClass: 'icheckbox_square-blue',
            radioClass: 'iradio_square-blue',
            increaseArea: '20%'
        })
    }

    login(event) {
        event.preventDefault()
        const { history } = this.props

        UsuarioApi.login(
            this.state.email,
            this.state.senha
            //'pedroivofe@gmail.com', 'abc'
        ).then(({data}) => {
            sessionStorage.setItem('dados-usuario', JSON.stringify(data.usuario))
            history.push('/main/home')
        })
    }

    render() {
        return (
            <div className="login-box">
                <div className="login-logo">
                    <a href="../../index2.html"><b>Admin</b>LTE</a>
                </div>
                {/* /.login-logo */}
                <div className="login-box-body">
                    <p className="login-box-msg">Sign in to start your session</p>

                    <form>
                        <div className="form-group has-feedback">
                            <input type="email" className="form-control" placeholder="Email"
                            onChange={this.set.bind(this, 'email')}
                            value={this.state.email} />
                            <span className="glyphicon glyphicon-envelope form-control-feedback"></span>
                        </div>
                        <div className="form-group has-feedback">
                            <input type="password" className="form-control" placeholder="Password"
                            onChange={this.set.bind(this, 'senha')}
                            value={this.state.senha} />
                            <span className="glyphicon glyphicon-lock form-control-feedback"></span>
                        </div>
                        <div className="row">
                            <div className="col-xs-8">
                                <div className="checkbox icheck">
                                    <label>
                                        <input type="checkbox" /> Remember Me
                                    </label>
                                </div>
                            </div>
                            {/* /.col */}
                            <div className="col-xs-4">
                                <button type="submit" onClick={this.login.bind(this)} className="btn btn-primary btn-block btn-flat">Sign In</button>
                            </div>
                            {/* /.col */}
                        </div>
                    </form>

                    <div className="social-auth-links text-center">
                        <p>- OR -</p>
                        <a className="btn btn-block btn-social btn-facebook btn-flat"><i className="fa fa-facebook"></i> Sign in using
                        Facebook</a>
                        <a className="btn btn-block btn-social btn-google btn-flat"><i className="fa fa-google-plus"></i> Sign in using
                        Google+</a>
                    </div>
                    {/* /.social-auth-links */}
                    <a>I forgot my password</a><br />
                    <a href="register.html" className="text-center">Register a new membership</a>

                </div>
                {/* /.login-box-body */}
            </div>
            // /.login-box
        )
    }
}

export default Login