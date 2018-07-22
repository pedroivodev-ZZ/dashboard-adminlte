import React from 'react'
import PropTypes from 'prop-types'
import IconButton from './IconButton'

const EditButton = ({ clickAction, style }) => (
    <IconButton style={style} clickAction={clickAction} colorClass="btn-warning" iconClass="fa-edit" />
)

EditButton.propTypes = {
    clickAction: PropTypes.func
}

export default EditButton