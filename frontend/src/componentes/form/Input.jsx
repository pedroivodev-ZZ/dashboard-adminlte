import React from 'react'

const Input = ({type, inputId, placeholder, value, onChange}) => 
    <input type={type} className="form-control" id={inputId} placeholder={placeholder}
    value={value} onChange={onChange} />

export default Input