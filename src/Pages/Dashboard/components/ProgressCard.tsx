import React from "react";
import { ProgressCardProps } from "../constants/dashboard.interfaces";

const ProgressCard: React.FC<ProgressCardProps> = ({
  title,
  iconClass,
  percentageData,
  count,
  onClick,
  icon,
  type,
}) => {
  return (
    <div className="flex-dir-col progress-card">
      <div className="flex-dir-col title-container">
        <div className={`center-items title-icon ${iconClass}`}>
          <i className={`demo-icon icon-${icon}`} />
        </div>
        <h3 className="d-flex">{title}</h3>
      </div>
      <div className="d-flex progress-bar">
        <div className="d-flex bar">
          <div
            className={`bar-complete bar-comp-${type}`}
            style={{ width: `${percentageData}%` }}
          ></div>
        </div>
        <h4 className={`percentage prog-${type}`}>{`${percentageData}%`}</h4>
      </div>
      <div
        className={`count-container count-container-${type} c-pointer`}
        onClick={onClick}
      >
        <h4>{`${count} ${
          title === "Streak Unsuccessful"
            ? "Streak unsuccessful"
            : `${title} completed`
        }`}</h4>
      </div>
    </div>
  );
};

export default ProgressCard;
