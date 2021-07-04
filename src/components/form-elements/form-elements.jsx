import React, { useState } from 'react';

import PropTypes from "prop-types";

//CSS
import "./form-element.css";

export function InputElement ({lable , type , uid , ...rest}) {
    return (
        <div key={uid} className="element input-container">
            <label for={uid}>{lable}</label>
            <input 
            className="input-element"
            type={type} 
            name={uid}
            id={lable}
            placeholder={`Enter a ${lable?.toLowerCase()}`}
            {...rest}
            />
        </div>
    );
}

export function TextInputElement ({lable , type , uid, ...rest}) {
    return (
        <div key={uid} className="element textArea-input-container">
            <label for={uid}>{lable}</label>
            <textarea
            className="textArea-input-element"
            type={type} 
            name={uid}
            id={lable}
            placeholder={`Enter a ${lable?.toLowerCase()}`}
            {...rest}
            />
        </div>
    );
}

InputElement.defaultProps = {
    type : 'text'
}