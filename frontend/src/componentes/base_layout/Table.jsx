import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Table extends Component {
    render() {
        const { headers, list, rowBuilder } = this.props
        return (
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        {
                            headers.map((header, index) => <th key={index}>{header}</th>)
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        list.map((item, index) => rowBuilder(item, index))
                    }
                </tbody>
            </table>
        )
    }
}

Table.propTypes = {
}

export default Table