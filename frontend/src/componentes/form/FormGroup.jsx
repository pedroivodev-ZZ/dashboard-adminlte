import React from 'react'

const FormGroup = ({ labelText, labelCssClass, htmlFor, children }) => 
    <div className="form-group">
        <label htmlFor={htmlFor} className={`${labelCssClass} control-label`}>{labelText}</label>
        {children}
    </div>

export default FormGroup