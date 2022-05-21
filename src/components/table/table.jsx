import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from "react-router";


//CSS
import './table.css';
import { cloneDeep as _cloneDeep } from 'lodash';

//CONSTANTS
import { theme } from "constants/index";
import { render } from '@testing-library/react';

//COMPONENTS
import { OutlinedPrimaryButton } from "components/button/button";

//Redux
import { useSelector } from "react-redux";

//UTILITIES
import { dialogForCreateAndUpdateStreak, dialogForCreateAndUpdateReward } from "utilities";

function Table(props) {
  const { tableHead, tabData, tableData, action, currentTab, type } = props;
  const history = useHistory();
  const streaks = useSelector((state) => state.streak.streaks);

  //FUNCTIONS
  const renderTableHeading = () => {
    const head = _cloneDeep(tableHead);
    return (
      <>
        <div key={0} className="table-head-data first-head"></div>
        {
          head.map((headingData, index) => {
            if (index > 0)
              return (
                <div key={index} className="table-head-data"><span className="s-12-rr">{headingData.data}</span></div>
              )
          })
        }
      </>
    );
  }


  const renderTableTab = () => {
    const data = _cloneDeep(tabData);
    return (
      <div className="tab-area">
        {
          data.map((tab, index) => {
            const { title, count, active } = tab;
            return (
              <div
                key={index}
                className="tab-item"
                onClick={(e) => {
                  action({
                    actionType: 'tabClicked',
                    data: title
                  })
                }}
              >
                <div className='d-flex'>
                  <h4 className="font-rob-med">{`${title}`}</h4>
                  {title !== 'Searched items' && <h4 className="font-rob-med">{`(${count})`}</h4>}
                </div>
                <div className="center-items">
                  <div className={active ? "active-tab" : ""}></div>
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }

  const deleteRow = (e, streak) => {
    e.stopPropagation();
    action({
      actionType: 'deleteRow',
      data: streak
    })
  }

  const editRow = (e, streak) => {
    e.stopPropagation();
    action({
      actionType: 'editRow',
      data: streak
    })
  }

  const navigate = (streak) => {
    action({
      actionType: 'navigate',
      data: streak
    })
  }



  const dataRow = (headingData, data, index) => {
    switch (headingData.uid) {
      case '':
        return (
          <div key={index} className="table-data bor-16-left first-data">
            <div
              className="ver-line"
              style={{ background: data.theme }}
            ></div>
          </div>
        );
      case 'progress':
        return (
          <div key={index} className='table-data center-items flex-dir-col table-progress-container'>
            <div>
              <span className='rob-med-12-primary'>{data[headingData.uid]}</span>
            </div>

            {
              data[headingData.uid] !== '-'
              &&
              <div className='table-progress-bar'>
                <div
                  className='inner-bar'
                  style={{ width: data[headingData.uid] }}
                ></div>
              </div>
            }
          </div>
        );
      case 'action':
        return (
          <div key={index} className="s-14-rm-grey bor-16-right table-data">
            <div className="d-flex table-btns-container">
              <div
                onClick={(e) => deleteRow(e, data)}
                className="center-items delete-btn">
                <i className="demo-icon icon-delete" />
              </div>

              {
                currentTab !== 'Unfinished'
                  ?
                  <div
                    onClick={(e) => editRow(e, data)}
                    className="center-items edit-btn">
                    <i className="demo-icon icon-edit" />
                  </div>
                  :
                  null
              }
            </div>
          </div>
        );
      case 'title':
        return (
          <div key={index} className="s-14-rm-pr table-data" > {data[headingData.uid]}</div >
        )
      case 'associated':
        return (
          <div
            onClick={() => {
              if (data[headingData.uid]?.title) {
                history.push({
                  pathname: `/streak/${data[headingData.uid].id}`,
                  state: {
                    from: 'Reward',
                    status: data[headingData.uid].state
                  },

                });
              }
            }}
            key={index}
            className="s-14-rm-pr table-data c-pointer" >
            {data[headingData.uid]?.title || '-'}
          </div >
        )
      default:
        return (
          <div key={index} className={data[headingData.uid] === 'DROPPED'
            ?
            "s-14-rm-grey table-data color-red"
            :
            "s-14-rm-grey table-data"
          }>{data[headingData.uid]}</div>
        );
    }
  }

  const renderTableData = () => {
    const data = _cloneDeep(tableData);
    const head = _cloneDeep(tableHead);
    let val = 0;
    return (
      <>
        {
          data.length > 0
            ?
            data.map((dataInner, index) => {
              dataInner.theme = theme[val];
              val += 1;
              if (val === 10) val = 0;
              return (
                <div
                  onClick={() => navigate(dataInner)}
                  key={index} className="d-flex table-row">
                  {
                    head.map((headingData, index) => {
                      return dataRow(headingData, dataInner, index)
                    })
                  }
                </div>
              )
            })
            :
            <div className='center-items h-100 w-100'>
              <h4>No data available</h4>
            </div>
        }

      </>
    )
  }


  const tableDataForLargeScreen = () => {
    return (
      <>
        <div className="flex-dir-col table-head">
          <div className="d-flex table-row">
            {renderTableHeading()}
          </div>
        </div>

        <div
          className={tableData.length > 0 ? "flex-dir-col table-body c-pointer" : "flex-dir-col table-body h-100"}
        >
          {renderTableData()}
        </div>
      </>
    )
  }


  const tableDataForSmallScreen = () => {
    const data = _cloneDeep(tableData);
    let val = 0;
    return (
      <div className='mt-30 d-flex o-scroll table-card-container'>

        {
          data.length > 0
            ?
            data.map((dataInner, index) => {
              val += 1;
              if (val === 10) val = 0;
              return (
                <div
                  onClick={() => navigate(dataInner)}
                  key={index}
                  className='table-card'>
                  <div
                    className='tag'
                    style={{ background: theme[val] }}
                  ></div>

                  <h3 className='font-rob-med mt-5'>{dataInner.title}</h3>
                  <span className='rob-med-14-grey'>
                    {
                      type === 'Streak'
                        ?
                        (dataInner.running === '--' ? '--' : `${dataInner.running} running`)
                        :
                        `${dataInner?.streak?.title || '-'}`
                    }
                  </span>

                  <div className='table-card-dates mt-10 flex-dir-col'>
                    {
                      type === 'Streak'
                        ?
                        <>
                          <div className='d-flex'>
                            <span className='circle mr-10'>
                            </span><span className='rob-med-14-black'>Start: {dataInner.startDate}</span>
                          </div>
                          <div className='d-flex mt-10'>
                            <span className='circle mr-10'></span>
                            <span className='rob-med-14-black '>End: {dataInner.endDate}</span>
                          </div>

                          <div className='d-flex mt-10'>
                            <span className='circle mr-10'>
                            </span><span className='rob-med-14-black'>Rewards: {dataInner.reward}</span>
                          </div>
                        </>

                        :
                        <>
                          <div className='d-flex'>
                            <span className='circle mr-10'>
                            </span><span className='rob-med-14-black'>Date: {dataInner.date}</span>
                          </div>
                          <div className='d-flex mt-10'>
                            <span className='circle mr-10'></span>
                            <span className='rob-med-14-black '>{dataInner.running === '-' ? `Days left:  ${dataInner.running}` : `Days left:  ${dataInner.running} Days`}</span>
                          </div>

                          <div className='d-flex mt-10'>
                            <span className='circle mr-10'>
                            </span><span className='rob-med-14-black'>Progress: <span className='color-primary'>{dataInner.progress}</span></span>
                          </div>
                        </>
                    }
                  </div>

                  <div className='d-flex table-card-btns mt-20'>
                    {
                      currentTab !== 'Unfinished'
                        ?
                        <OutlinedPrimaryButton
                          name={'Edit'}
                          click={(e) => editRow(e, dataInner)}
                          btnContainerClass={'mr-10'}
                          btnClass={'small-screen-btn'}
                        />
                        :
                        null
                    }


                    <OutlinedPrimaryButton
                      name={'Delete'}
                      click={(e) => deleteRow(e, dataInner)}
                      btnClass={'small-screen-btn danger-btn'}
                    />

                  </div>
                </div>
              )
            })
            :
            <div className='center-items h-100 w-100'>
              <h4>No data available</h4>
            </div>
        }


      </div>

    )
  }

  //FUNCTIONS
  return (
    <div className='table-parent-container'>
      {renderTableTab()}
      <div className="flex-dir-col table-container">
        {tableDataForLargeScreen()}

        {tableDataForSmallScreen()}

      </div>

      <OutlinedPrimaryButton
        name={type === 'Reward' ? 'Add New Reward' : 'Add New Streak'}
        click={type === 'Reward' ?
          () => {
            const filterStreak = streaks.filter(streak => streak.tag !== 'unfinished')
            dialogForCreateAndUpdateReward('create', {}, '', filterStreak)
          }
          :
          () => dialogForCreateAndUpdateStreak()
        }
        btnContainerClass="mt-30 small-screen-btn"
        btnClass='h-60 br-16'
      />
    </div>
  )
}

Table.propTypes = {
  tableHead: PropTypes.arrayOf(PropTypes.exact({
    uid: PropTypes.string,
    data: PropTypes.string,
  })).isRequired,
  tabData: PropTypes.arrayOf(PropTypes.exact({
    title: PropTypes.string,
    count: PropTypes.number,
    active: PropTypes.bool
  })).isRequired,
  tableData: PropTypes.arrayOf(PropTypes.object).isRequired,
  action: PropTypes.func.isRequired,
  currentTab: PropTypes.string,
  type: PropTypes.string
}

export default Table
