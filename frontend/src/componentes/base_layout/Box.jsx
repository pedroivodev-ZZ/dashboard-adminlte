import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Box extends Component {
    render() {
        const { novoButton, novoButtonText, novoButtonClick } = this.props
        return (
            <div className="box">
                <div className="box-header">
                    <h3 className="box-title">{this.props.titulo}</h3>
                    {
                        (novoButton === undefined || novoButton === true) ?
                        <button className="btn btn-info btn-flat pull-right"
                        onClick={novoButtonClick}>
                            {novoButtonText}
                        </button>
                        : null
                    }
                </div>
                <div className="box-body">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

Box.propTypes = {
    novoButtonClick: PropTypes.func,
    novoButtonText: PropTypes.string,
    novoButton: PropTypes.bool
}

export default Box