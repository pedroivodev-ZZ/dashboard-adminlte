import React from 'react'
import PropTypes from 'prop-types'

const Box = ({ titulo, novoButton, novoButtonText, novoButtonClick, children }) => (
    <div className="box">
        <div className="box-header">
            <h3 className="box-title">{titulo}</h3>
            {
                novoButton === true ?
                <button className="btn btn-info btn-flat pull-right"
                onClick={novoButtonClick}>
                    {novoButtonText}
                </button>
                : null
            }
        </div>
        <div className="box-body">
            {children}
        </div>
    </div>
)

Box.defaultProps = {
    novoButton: true,
    novoButtonClick: () => {}
}

Box.propTypes = {
    novoButtonClick: PropTypes.func,
    novoButtonText: PropTypes.string,
    novoButton: PropTypes.bool,
    children: PropTypes.node
}

export default Box