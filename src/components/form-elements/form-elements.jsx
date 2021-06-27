import React, { useState } from 'react';

//CSS
import "./form-element.css";

export function InputElement ({lable , uid , ...rest}) {
    return (
        <div key={uid} className="element input-container">
            <label for={uid}>{lable}</label>
            <input 
            className="input-element"
            type="text" 
            name={uid}
            id={lable}
            placeholder={`Enter a ${lable?.toLowerCase()}`}
            {...rest}
            />
        </div>
    );
}

export function TextInputElement ({lable , uid, ...rest}) {
    return (
        <div key={uid} className="element textArea-input-container">
            <label for={uid}>{lable}</label>
            <textarea
            className="textArea-input-element"
            type="text" 
            name={uid}
            id={lable}
            placeholder={`Enter a ${lable?.toLowerCase()}`}
            {...rest}
            />
        </div>
    );
}