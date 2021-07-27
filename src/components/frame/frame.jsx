import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

//COMPONENTS
import Header from "../header/header";

//CSS
import "./frame.css";

export default function Frame(props) {
 
    const {
        containerClass,
        withHeader,
        headerTitle,
        withSearchBox,
        children,
        withBackIcon
    } = props;
    return (
        <div className={`frame ${containerClass}`}>
            {
                withHeader &&
                <Header
                    headerText={headerTitle}
                    withSearchBox={withSearchBox}
                    withBackIcon={withBackIcon}
                />
            }
            <div className="frame-children">
                {children}
            </div>
        </div>
    )
}

Frame.propTypes =
{
    containerClass: PropTypes.string,
    withHeader: PropTypes.bool,
    headerTitle: PropTypes.string,
    withSearchBox: PropTypes.bool,
    headerIcon: PropTypes.element
}

Frame.defaultProps = {
    containerClass: '',
    withHeader: true,
    headerTitle: 'FRAME',
    withSearchBox: true
}




