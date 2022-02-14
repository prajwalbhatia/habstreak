import React from 'react';
import { noop } from 'lodash';
import PropTypes from 'prop-types';

//Css
import './button.css';

export function PrimaryButton(props) {
    const { btnContainerClass, btnClass, click, ...rest } = props;
    return (
        <div className={btnContainerClass ? `button-container ${btnContainerClass}` : `button-container`}>
            <button
                className={btnClass ? `btn primary-btn ${btnClass}` : `btn primary-btn`}
                onClick={() => click()}
                type="button"
                {...rest}
            >
                {props.name}
            </button>
        </div>
    );
}
export function SecondaryButton(props) {
    const { btnContainerClass, btnClass, click, ...rest } = props;
    return (
        <div className={btnContainerClass ? `button-container ${btnContainerClass}` : `button-container`}>
            <button
                className={btnClass ? `btn secondary-btn ${btnClass}` : `btn secondary-btn`}
                onClick={() => click()}
                type="button"
                {...rest}
            >
                {props.name}
            </button>
        </div>
    );
}

export function OutlinedPrimaryButton(props) {
    const { btnContainerClass, btnClass, click, ...rest } = props;
    return (
        <div className={btnContainerClass ? `button-container ${btnContainerClass}` : `button-container`}>
            <button
                className={btnClass ? `btn outline-primary-btn ${btnClass}` : `btn outline-primary-btn`}
                onClick={() => click()}
                type="button"
                {...rest}
            >
                {props.name}
            </button>
        </div>
    );
}


export function IconButton(props) {
    const { btnContainerClass, btnClass, click } = props;
    return (
        <div
            className={
                btnContainerClass
                    ?
                    `icon-button-container ${btnContainerClass}`
                    :
                    `icon-button-container`
            }
            onClick={() => click()}
        >
            {props.icon}
            {/* <button
                className={btnClass ? `btn outline-primary-btn ${btnClass}` : `btn outline-primary-btn`}
                onClick={() => click()}
                type="button"
                {...rest}
            >
            </button> */}
        </div>
    );
}
PrimaryButton.prototype = {
    click: PropTypes.func,
    btnContainerClass: PropTypes.string,
    btnClass: PropTypes.string
}

SecondaryButton.prototype = {
    click: PropTypes.func,
    btnContainerClass: PropTypes.string,
    btnClass: PropTypes.string
}

PrimaryButton.defaultProps = {
    click: noop
}

SecondaryButton.defaultProps = {
    click: noop
}