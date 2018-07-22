import React from 'react'
import PropTypes from 'prop-types'
import IconButton from './IconButton'

const RemoveButton = ({ clickAction, style }) => (
    <IconButton style={style} clickAction={clickAction} colorClass="btn-danger" iconClass="fa-remove" />
)

RemoveButton.propTypes = {
    clickAction: PropTypes.func
}

export default RemoveButton