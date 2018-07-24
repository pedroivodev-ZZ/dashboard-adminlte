import React from 'react'

import FormGroup from './FormGroup'
import Input from './Input'

const FormGroupInput = ({
        labelText, labelCssClass,
        type, inputId, inputCssClass, placeholder, value, onChange
    }) => 
    <FormGroup htmlFor={inputId} labelCssClass={labelCssClass} labelText={labelText}>
        <div className={inputCssClass}>
            <Input type={type} inputId={inputId} placeholder={placeholder}
            value={value} onChange={onChange} />
        </div>
    </FormGroup>

export default FormGroupInput