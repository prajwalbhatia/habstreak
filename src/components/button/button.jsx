import React from 'react';

//Css
import './button.css';

export function PrimaryButton(props) {
    const {btnContainerClass , btnClass} = props;
    return(
        <div className={btnContainerClass ? `button-container ${btnContainerClass}` : `button-container`}>
            <button 
                className={btnClass ? `btn primary-btn ${btnClass}` : `btn primary-btn`} 
                onClick={() => props.click()}
                type="button">
                    {props.name}
            </button>
        </div>
    );
}

export function SecondaryButton(props) {
    const {btnContainerClass , btnClass} = props;
    return(
        <div className={btnContainerClass ? `button-container ${btnContainerClass}` : `button-container`}>
            <button 
                className={btnClass ? `btn secondary-btn ${btnClass}` : `btn secondary-btn`} 
                onClick={() => props.click()}
                type="button">
                    {props.name}
            </button>
        </div>
    );
}
