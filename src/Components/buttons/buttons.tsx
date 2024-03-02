import React, { FC, ReactNode, MouseEvent } from "react";
import noop from "lodash/noop";
import ClipLoader from "react-spinners/ClipLoader";

// Css
import "Styles/Components/buttons.scss";

interface ButtonProps {
  btnContainerClass?: string;
  btnClass?: string;
  click: (event: MouseEvent<HTMLButtonElement>) => void;
  tooltip?: boolean;
  tooltipData?: string;
  index?: number;
  name: string;
  loading?: boolean;
  disabled?: boolean;
  typeVal?: "button" | "submit" | undefined;
}

export const PrimaryButton: FC<ButtonProps> = ({
  btnContainerClass,
  btnClass,
  click,
  tooltip,
  tooltipData,
  index,
  loading,
  typeVal,
  ...rest
}) => {
  return (
    <div key={index} className={`button-container ${btnContainerClass || ""}`}>
      <button
        className={`btn primary-btn ${btnClass || ""}`}
        onClick={(e) => click(e)}
        type={typeVal ? typeVal : "button"}
        {...rest}
      >
        {loading ? <ClipLoader size={20} /> : rest.name}
        {tooltip ? (
          <div>
            <span className="tooltip" data-tooltip={tooltipData}></span>
          </div>
        ) : null}
      </button>
    </div>
  );
};

export const SecondaryButton: FC<ButtonProps> = ({
  btnContainerClass,
  btnClass,
  click,
  tooltip,
  tooltipData,
  loading,
  ...rest
}) => {
  return (
    <div className={`button-container ${btnContainerClass || ""}`}>
      <button
        className={`btn secondary-btn ${btnClass || ""}`}
        onClick={(e) => click(e)}
        type="button"
        {...rest}
      >
        {loading ? <ClipLoader size={20} /> : rest.name}
        {tooltip ? (
          <div>
            <span className="tooltip" data-tooltip={tooltipData}></span>
          </div>
        ) : null}
      </button>
    </div>
  );
};

export const OutlinedPrimaryButton: FC<ButtonProps> = ({
  btnContainerClass,
  btnClass,
  click,
  tooltip,
  tooltipData,
  loading,
  ...rest
}) => {
  return (
    <div className={`button-container ${btnContainerClass || ""}`}>
      <button
        className={`btn outline-primary-btn ${btnClass || ""}`}
        onClick={(e) => click(e)}
        type="button"
        {...rest}
      >
        {loading ? <ClipLoader size={20} color={"#F96E46"} /> : rest.name}
        {tooltip ? (
          <div>
            <span className="tooltip" data-tooltip={tooltipData}></span>
          </div>
        ) : null}
      </button>
    </div>
  );
};

interface IconButtonProps {
  btnContainerClass?: string;
  tooltip?: boolean;
  tooltipData?: string;
  click: (event: MouseEvent<HTMLDivElement>) => void;
  icon: ReactNode;
}

export const IconButton: FC<IconButtonProps> = ({
  btnContainerClass,
  tooltip,
  tooltipData,
  click,
  icon,
}) => {
  return (
    <div
      className={`icon-button-container ${btnContainerClass || ""}`}
      onClick={(e) => click(e)}
    >
      {icon}
      {tooltip ? (
        <div>
          <span className="tooltip" data-tooltip={tooltipData}></span>
        </div>
      ) : null}
    </div>
  );
};

PrimaryButton.defaultProps = {
  click: noop,
};

SecondaryButton.defaultProps = {
  click: noop,
};

OutlinedPrimaryButton.defaultProps = {
  click: noop,
};

IconButton.defaultProps = {
  click: noop,
};
