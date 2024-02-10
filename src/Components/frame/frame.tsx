import React from 'react';
import PropTypes from 'prop-types';

//COMPONENTS
import Header from "Components/header/header";
import Navigation from "Components/navigation/navigation";

//CSS
import "Styles/Components/frame.scss";

function Frame(props : any) {
    const {
        containerClass,
        withHeader,
        headerTitle,
        withSearchBox,
        children,
        withInternalNavigation,
        withNavigation = true,
        withDate,
        internalNavigation,
        updateData
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
                        updateData={updateData}
                    />
                }
                <div className="frame-children">
                    {children}
                </div>
            </div>
        </>
    )
}

// Frame.propTypes =
// {
//     containerClass: PropTypes.string,
//     withHeader: PropTypes.bool,
//     headerTitle: PropTypes.string,
//     withSearchBox: PropTypes.bool,
//     headerIcon: PropTypes.element,
//     withDate: PropTypes.bool,
//     withInternalNavigation : PropTypes.bool,
//     internalNavigation : PropTypes.string
// }

Frame.defaultProps = {
    containerClass: '',
    withHeader: true,
    headerTitle: 'FRAME',
    withSearchBox: true
}


export default React.memo(Frame);


