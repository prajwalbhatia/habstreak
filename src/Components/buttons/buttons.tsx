import { FC, ReactNode, MouseEvent } from "react";
import noop from "lodash/noop";
import ClipLoader from "react-spinners/ClipLoader";

import { ButtonProps, IconButtonProps } from "Components/Interfaces/interfaces";

import "Styles/Components/buttons.scss";

export const PrimaryButton: FC<ButtonProps> = ({
  btnContainerClass,
  btnClass,
  click = noop,
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
  click = noop,
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
  click = noop,
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

export const IconButton: FC<IconButtonProps> = ({
  btnContainerClass,
  tooltip,
  tooltipData,
  click = noop,
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
