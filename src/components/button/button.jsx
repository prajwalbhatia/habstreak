import React from 'react';

//Css
import './button.css';

export function PrimaryButton(props) {
    const {btnContainerClass , btnClass} = props;
    return(
        <div className={`button-container ${btnContainerClass}`}>
            <button 
                className={`btn primary-btn ${btnClass}`} 
                onClick={() => props.click()}
                type="button">
                    {props.name}
            </button>
        </div>
    );
}
