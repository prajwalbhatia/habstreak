import { Skeleton } from "@mui/material";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import cloneDeep from "lodash/cloneDeep";
import { theme } from "Constants/index";

import { dialogForUpgrade } from "Utilities";

import { OutlinedPrimaryButton } from "Components/buttons/buttons";

import useGetPlanType from "Hooks/useGetPlanType";
import useAddStreak from "Hooks/useAddStreak";
import useAddReward from "Hooks/useAddReward";

import "Styles/Components/table.scss";

const Table: any = (props: any) => {
  const navigate = useNavigate();
  const { tableHead, tabData, tableData, action, currentTab, type, loading } =
    props;
  const planType = useGetPlanType();
  const { addStreak, SnackbarComponent } = useAddStreak();
  const { addReward, SnackbarComponent: SnackBarComponentReward } =
    useAddReward();

  //FUNCTIONS
  const renderTableHeading = () => {
    const head = cloneDeep(tableHead);
    return (
      <>
        <div key={0} className="table-head-data first-head"></div>
        {head.map((headingData: any, index: any) => {
          if (index > 0)
            return (
              <div key={index} className="table-head-data">
                <span className="s-12-rr">{headingData.data}</span>
              </div>
            );
        })}
      </>
    );
  };

  const renderTableTab = () => {
    const data = cloneDeep(tabData);
    return (
      <div className="tab-area">
        {data.map((tab: any, index: any) => {
          const { title, count, active } = tab;
          return (
            <div
              key={index}
              className="tab-item"
              onClick={(e) => {
                action({
                  actionType: "tabClicked",
                  data: title,
                });
              }}
            >
              <div className="d-flex">
                <h4 className="font-rob-med">{`${title}`}</h4>
                {title !== "Searched items" && (
                  <h4 className="font-rob-med">{`(${count})`}</h4>
                )}
              </div>
              <div className="center-items">
                <div className={active ? "active-tab" : ""}></div>
              </div>
            </div>
          );
        })}
        {SnackbarComponent}
        {SnackBarComponentReward}
      </div>
    );
  };

  const deleteRow = (e: any, streak: any) => {
    e.stopPropagation();
    if (planType === "prime") {
      action({
        actionType: "deleteRow",
        data: streak,
      });
    } else dialogForUpgrade(navigate);
  };

  const editRow = (e: any, streak: any) => {
    e.stopPropagation();
    action({
      actionType: "editRow",
      data: streak,
    });
  };

  const cloneRow = (e: any, streak: any) => {
    e.stopPropagation();
    action({
      actionType: "cloneRow",
      data: streak,
    });
  };

  const navigateTo = (streak: any) => {
    action({
      actionType: "navigate",
      data: streak,
    });
  };

  const dataRow = (headingData: any, data: any, index: any) => {
    switch (headingData.uid) {
      case "":
        return (
          <div key={index} className="table-data bor-16-left first-data">
            <div className="ver-line" style={{ background: data.theme }}></div>
          </div>
        );
      case "progress":
        return (
          <div
            key={index}
            className="table-data center-items flex-dir-col table-progress-container"
          >
            <div>
              <span className="rob-med-12-primary">
                {data[headingData.uid]}
              </span>
            </div>

            {data[headingData.uid] !== "-" && (
              <div className="table-progress-bar">
                <div
                  className="inner-bar"
                  style={{ width: data[headingData.uid] }}
                ></div>
              </div>
            )}
          </div>
        );
      case "action":
        return (
          <div key={index} className="s-14-rm-grey bor-16-right table-data">
            <div className="d-flex table-btns-container">
              {currentTab === "Unfinished" ? (
                <div
                  onClick={(e) => cloneRow(e, data)}
                  className="center-items edit-btn"
                >
                  <i className="demo-icon icon-clone" />
                </div>
              ) : null}

              <div
                onClick={(e) => deleteRow(e, data)}
                className="center-items delete-btn"
              >
                <i className="demo-icon icon-delete" />
              </div>

              {currentTab !== "Unfinished" ? (
                <div
                  onClick={(e) => editRow(e, data)}
                  className="center-items edit-btn"
                >
                  <i className="demo-icon icon-edit" />
                </div>
              ) : null}
            </div>
          </div>
        );
      case "title":
        return (
          <div key={index} className="s-14-rm-pr table-data">
            {" "}
            {data[headingData.uid]}
          </div>
        );
      case "associated":
        return (
          <div
            onClick={() => {
              if (data[headingData.uid]?.title) {
                navigate(`/streak/${data[headingData.uid].id}`);
              }
            }}
            key={index}
            className="s-14-rm-pr table-data c-pointer"
          >
            {data[headingData.uid]?.title || "-"}
          </div>
        );
      default:
        return (
          <div
            key={index}
            className={
              data[headingData.uid] === "DROPPED"
                ? "s-14-rm-grey table-data color-red"
                : "s-14-rm-grey table-data"
            }
          >
            {data[headingData.uid]}
          </div>
        );
    }
  };

  const renderTableData = () => {
    const data = cloneDeep(tableData);
    const head = cloneDeep(tableHead);
    let val = 0;
    return (
      <>
        {loading ? (
          Array(data.length || 1)
            .fill(0)
            .map((val: any, index: any) => (
              <Skeleton
                variant="rounded"
                sx={{ minWidth: 150, minHeight: 50, margin: 1 }}
              />
            ))
        ) : data.length > 0 ? (
          data.map((dataInner: any, index: any) => {
            dataInner.theme = theme[val];
            val += 1;
            if (val === 10) val = 0;
            return (
              <>
                <div
                  onClick={() => navigateTo(dataInner)}
                  key={index}
                  className="d-flex table-row"
                >
                  {head.map((headingData: any, index: any) => {
                    return dataRow(headingData, dataInner, index);
                  })}
                </div>
              </>
            );
          })
        ) : (
          <div className="center-items h-100 w-100">
            <h4>No data available</h4>
          </div>
        )}
      </>
    );
  };

  const tableDataForLargeScreen = () => {
    return (
      <>
        <div className="flex-dir-col table-head">
          <div className="d-flex table-row">{renderTableHeading()}</div>
        </div>

        <div
          className={
            tableData.length > 0
              ? "flex-dir-col table-body c-pointer"
              : "flex-dir-col table-body h-100"
          }
        >
          {renderTableData()}
        </div>
      </>
    );
  };

  const tableDataForSmallScreen = () => {
    const data = cloneDeep(tableData);
    let val = 0;
    return (
      <div className="d-flex o-scroll table-card-container">
        {loading ? (
          Array(data.length || 1)
            .fill(0)
            .map((val: any, index: any) => (
              <Skeleton
                variant="rounded"
                sx={{ minWidth: 218, height: `calc(100% - 20px)`, margin: 1 , borderRadius : 4 }}
              />
            ))
        ) : data.length > 0 ? (
          data.map((dataInner: any, index: any) => {
            val += 1;
            if (val === 10) val = 0;
            return (
              <div
                onClick={() => navigate(dataInner)}
                key={index}
                className="table-card"
              >
                <div className="tag" style={{ background: theme[val] }}></div>

                <h3 className="font-rob-med mt-5">{dataInner.title}</h3>
                <span
                  onClick={() => {
                    if (
                      type !== "Streak" &&
                      typeof dataInner?.streak === "object"
                    ) {
                      navigate(`/streak/${dataInner?.streak?._id}`);
                    }
                  }}
                  className={
                    dataInner?.streak?.title
                      ? "rob-med-14-grey c-pointer"
                      : "rob-med-14-grey"
                  }
                >
                  {type === "Streak"
                    ? dataInner.running === "--"
                      ? "--"
                      : `${dataInner.running} running`
                    : `${dataInner?.streak?.title || "-"}`}
                </span>

                <div className="table-card-dates mt-10 flex-dir-col">
                  {type === "Streak" ? (
                    <>
                      <div className="d-flex">
                        <span className="circle mr-10"></span>
                        <span className="rob-med-14-black">
                          Start: {dataInner.startDate}
                        </span>
                      </div>
                      <div className="d-flex mt-10">
                        <span className="circle mr-10"></span>
                        <span className="rob-med-14-black ">
                          End: {dataInner.endDate}
                        </span>
                      </div>

                      <div className="d-flex mt-10">
                        <span className="circle mr-10"></span>
                        <span className="rob-med-14-black">
                          Rewards: {dataInner.reward}
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="d-flex">
                        <span className="circle mr-10"></span>
                        <span className="rob-med-14-black">
                          Date: {dataInner.date}
                        </span>
                      </div>
                      <div className="d-flex mt-10">
                        <span className="circle mr-10"></span>
                        <span className="rob-med-14-black ">
                          {dataInner.running === "-"
                            ? `Days left:  ${dataInner.running}`
                            : `Days left:  ${dataInner.running} Days`}
                        </span>
                      </div>

                      <div className="d-flex mt-10">
                        <span className="circle mr-10"></span>
                        <span className="rob-med-14-black">
                          Progress:{" "}
                          <span className="color-primary">
                            {dataInner.progress}
                          </span>
                        </span>
                      </div>
                    </>
                  )}
                </div>

                <div className="d-flex table-card-btns mt-20">
                  {currentTab !== "Unfinished" ? (
                    <OutlinedPrimaryButton
                      name={"Edit"}
                      click={(e) => editRow(e, dataInner)}
                      btnContainerClass={"mr-10"}
                      btnClass={"small-screen-btn"}
                    />
                  ) : null}

                  <OutlinedPrimaryButton
                    name={"Delete"}
                    click={(e) => deleteRow(e, dataInner)}
                    btnClass={"small-screen-btn danger-btn"}
                  />
                </div>
              </div>
            );
          })
        ) : (
          <div className="center-items h-100 w-100">
            <h4>No data available</h4>
          </div>
        )}
      </div>
    );
  };

  //FUNCTIONS
  return (
    <div className="table-parent-container">
      {renderTableTab()}
      <div className="flex-dir-col table-container">
        {tableDataForLargeScreen()}

        {tableDataForSmallScreen()}
      </div>

      <OutlinedPrimaryButton
        name={type === "Reward" ? "Add New Reward" : "Add New Streak"}
        click={
          type === "Reward"
            ? () => {
                addReward();
              }
            : () => {
                addStreak();
              }
        }
        btnContainerClass="mt-30 small-screen-btn"
        btnClass="h-60 br-16"
        loading={loading}
      />
    </div>
  );
};

Table.propTypes = {
  tableHead: PropTypes.arrayOf(
    PropTypes.exact({
      uid: PropTypes.string,
      data: PropTypes.string,
    })
  ).isRequired,
  tabData: PropTypes.arrayOf(
    PropTypes.exact({
      title: PropTypes.string,
      count: PropTypes.number,
      active: PropTypes.bool,
    })
  ).isRequired,
  tableData: PropTypes.arrayOf(PropTypes.object).isRequired,
  action: PropTypes.func.isRequired,
  currentTab: PropTypes.string,
  type: PropTypes.string,
};

export default Table;
