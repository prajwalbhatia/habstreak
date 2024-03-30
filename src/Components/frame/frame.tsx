import React from "react";

import Header from "Components/header/header";
import Navigation from "Components/navigation/navigation";
import { FrameInterface } from "Components/Interfaces/interfaces";

import "Styles/Components/frame.scss";

const Frame: React.FC<FrameInterface> = (props: any) => {
  const {
    containerClass = "",
    withHeader = true,
    headerTitle = "",
    withSearchBox = true,
    children,
    withInternalNavigation,
    withNavigation = true,
    withDate,
    internalNavigation,
    updateData,
  } = props;
  return (
    <>
      {withNavigation && <Navigation />}
      <div className={`frame ${containerClass}`}>
        {withHeader && (
          <Header
            headerText={headerTitle}
            withSearchBox={withSearchBox}
            withInternalNavigation={withInternalNavigation}
            internalNavigation={internalNavigation}
            withDate={withDate}
            updateData={updateData}
          />
        )}
        <div className="frame-children">{children}</div>
      </div>
    </>
  );
};

export default React.memo(Frame);
