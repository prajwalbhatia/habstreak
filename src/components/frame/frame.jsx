import React from 'react';
import PropTypes from 'prop-types';

//COMPONENTS
import Header from "components/header/header";
import Navigation from "components/navigation/navigation";

//CSS
import "./frame.css";

function Frame(props) {
    const {
        containerClass,
        withHeader,
        headerTitle,
        withSearchBox,
        children,
        withInternalNavigation,
        withNavigation = true,
        withDate,
        internalNavigation
    } = props;
    return (
        <>
            {
                withNavigation &&
                <Navigation />
            }
            <div className={`frame ${containerClass}`}>
                {
                    withHeader &&
                    <Header
                        headerText={headerTitle}
                        withSearchBox={withSearchBox}
                        withInternalNavigation={withInternalNavigation}
                        internalNavigation={internalNavigation}
                        withDate={withDate}
                    />
                }
                <div className="frame-children">
                    {children}
                </div>
            </div>
        </>
    )
}

Frame.propTypes =
{
    containerClass: PropTypes.string,
    withHeader: PropTypes.bool,
    headerTitle: PropTypes.string,
    withSearchBox: PropTypes.bool,
    headerIcon: PropTypes.element,
    withDate: PropTypes.bool,
    withInternalNavigation : PropTypes.bool,
    internalNavigation : PropTypes.string
}

Frame.defaultProps = {
    containerClass: '',
    withHeader: true,
    headerTitle: 'FRAME',
    withSearchBox: true
}


export default React.memo(Frame);


