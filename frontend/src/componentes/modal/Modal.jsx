import React, { Component } from 'react'

import $ from 'jquery'
import '../../fixes/jquery-fix'

export default class Modal extends Component {
    componentDidMount() {
        $(this.refs.modal).on('show.bs.modal', function () {
            if (this.props.show) {
                this.props.show()
            }
        })

        $(this.refs.modal).on('shown.bs.modal', function () {
            if (this.props.shown) {
                this.props.shown()
            }
        })

        $(this.refs.modal).on('hide.bs.modal', function () {
            if (this.props.hide) {
                this.props.hide()
            }
        })

        $(this.refs.modal).on('hidden.bs.modal', function () {
            if (this.props.hidden) {
                this.props.hidden()
            }
        })

        $(this.refs.modal).on('loaded.bs.modal', function () {
            if (this.props.loaded) {
                this.props.loaded()
            }
        })
    }

    salvar() {
        if (this.props.salvar) {
            this.props.salvar()
        }
    }

    render() {
        return (
            <div ref="modal" class="modal fade" id={this.props.modalId}
            data-backdrop={this.props.backdrop === undefined ? "true" : this.props.backdrop}
            data-keyboard={this.props.keyboard === undefined ? "true" : this.props.keyboard}
            style={{display: 'none'}}>
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span></button>
                            <h4 class="modal-title">{this.props.titulo}</h4>
                        </div>
                        <div class="modal-body">
                            <p>{this.props.children}</p>
                        </div>
                        {
                            (this.props.footer || this.props.footer === undefined)
                            ? <div class="modal-footer">
                                <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Fechar</button>
                                <button type="button" class="btn btn-primary" onClick={this.salvar.bind(this)}>Salvar</button>
                            </div>
                            : null
                        }
                    </div>
                </div>
            </div>
        )
    }
}