import React from 'react'
import PropTypes from 'prop-types'

const IconButton = ({ style, iconClass, colorClass, clickAction }) => (
    <button style={style} onClick={clickAction} className={`btn ${colorClass} btn-flat`}>
        <i className={`fa ${iconClass}`}></i>
    </button>
)

IconButton.propTypes = {
    colorClass: PropTypes.string,
    iconClass: PropTypes.string,
    clickAction: PropTypes.func
}

export default IconButton