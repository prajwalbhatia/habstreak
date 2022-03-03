import React from 'react';
import { noop } from 'lodash';
import PropTypes from 'prop-types';

//Css
import './button.css';

export function PrimaryButton(props) {
    const { btnContainerClass, btnClass, click, tooltip, tooltipData, ...rest } = props;
    return (
        <div className={btnContainerClass ? `button-container ${btnContainerClass}` : `button-container`}>
            <button
                className={btnClass ? `btn primary-btn ${btnClass}` : `btn primary-btn`}
                onClick={(e) => click(e)}
                type="button"
                {...rest}
            >
                {props.name}
                {
                    tooltip
                        ?
                        <div>
                            <span class="tooltip" data-tooltip={tooltipData}></span>
                        </div >
                        :
                        null
                }
            </button>
        </div>
    );
}
export function SecondaryButton(props) {
    const { btnContainerClass, btnClass, click, tooltip, tooltipData, ...rest } = props;
    return (
        <div className={btnContainerClass ? `button-container ${btnContainerClass}` : `button-container`}>
            <button
                className={btnClass ? `btn secondary-btn ${btnClass}` : `btn secondary-btn`}
                onClick={(e) => click(e)}
                type="button"
                {...rest}
            >
                {props.name}
                {
                    tooltip
                        ?
                        <div>
                            <span class="tooltip" data-tooltip={tooltipData}></span>
                        </div >
                        :
                        null
                }
            </button>
        </div>
    );
}

export function OutlinedPrimaryButton(props) {
    const { btnContainerClass, btnClass, click, tooltip, tooltipData, ...rest } = props;
    return (
        <div className={btnContainerClass ? `button-container ${btnContainerClass}` : `button-container`}>
            <button
                className={btnClass ? `btn outline-primary-btn ${btnClass}` : `btn outline-primary-btn`}
                onClick={(e) => click(e)}
                type="button"
                {...rest}
            >
                {props.name}

                {
                    tooltip
                        ?
                        <div>
                            <span class="tooltip" data-tooltip={tooltipData}></span>
                        </div >
                        :
                        null
                }
            </button>
        </div>
    );
}


export function IconButton(props) {
    const { btnContainerClass, btnClass, tooltip, tooltipData, click } = props;
    return (
        <div
            className={
                btnContainerClass
                    ?
                    `icon-button-container ${btnContainerClass}`
                    :
                    `icon-button-container`
            }
            onClick={(e) => click(e)}
        >
            {props.icon}
            {
                tooltip
                    ?
                    <div>
                        <span class="tooltip" data-tooltip={tooltipData}></span>
                    </div >
                    :
                    null
            }
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