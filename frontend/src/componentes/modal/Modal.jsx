import React, { Component } from 'react'

import $ from 'jquery'
import '../../fixes/jquery-fix'

class Modal extends Component {
    componentDidMount() {
        $(this.refs.modal).on('show.bs.modal', () => {
            if (this.props.show) {
                this.props.show()
            }
        })

        $(this.refs.modal).on('shown.bs.modal', () => {
            if (this.props.shown) {
                this.props.shown()
            }
        })

        $(this.refs.modal).on('hide.bs.modal', () => {
            if (this.props.hide) {
                this.props.hide()
            }
        })

        $(this.refs.modal).on('hidden.bs.modal', () => {
            if (this.props.hidden) {
                this.props.hidden()
            }
        })

        $(this.refs.modal).on('loaded.bs.modal', () => {
            if (this.props.loaded) {
                this.props.loaded()
            }
        })
    }

    salvarOnClick() {
        if (this.props.salvarOnClick) {
            this.props.salvarOnClick()
        }
    }

    render() {
        return (
            <div ref="modal" className="modal fade" id={this.props.modalId}
            data-backdrop={this.props.backdrop === undefined ? "true" : this.props.backdrop}
            data-keyboard={this.props.keyboard === undefined ? "true" : this.props.keyboard}
            style={{display: 'none'}}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span></button>
                            <h4 className="modal-title">{this.props.titulo}</h4>
                        </div>
                        <div className="modal-body">
                            {this.props.children}
                        </div>
                        {
                            (this.props.footer || this.props.footer === undefined)
                            ? <div className="modal-footer">
                                <button type="button" className="btn btn-default pull-left" data-dismiss="modal">Fechar</button>
                                <button type="button" className="btn btn-primary" onClick={this.salvarOnClick.bind(this)}>Salvar</button>
                            </div>
                            : null
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Modal