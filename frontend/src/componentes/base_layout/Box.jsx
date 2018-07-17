import React, { Component } from 'react';

class Box extends Component {
    render() {
        return (
            <div className="box">
                <div className="box-header">
                    <h3 className="box-title">{this.props.titulo}</h3>
                </div>
                <div className="box-body">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default Box