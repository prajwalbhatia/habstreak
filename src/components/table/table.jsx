import React, { useState } from 'react';
import PropTypes from 'prop-types';

//CSS
import './table.css';
import { cloneDeep as _cloneDeep } from 'lodash';

//CONSTANTS
import { theme } from "constants/index";


function Table(props) {
  const { tableHead, tabData, tableData, action, currentTab } = props;

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
                <h4 className="font-rob-med">{`${title} (${count})`}</h4>
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
            <div className='table-progress-bar'>
              <div
                className='inner-bar'
                style={{ width: data[headingData.uid] }}
              ></div>
            </div>
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
            null
        }

      </>
    )
  }

  //FUNCTIONS
  return (
    <div className='table-parent-container'>
      {renderTableTab()}
      <div className="flex-dir-col table-container">

        <div className="flex-dir-col table-head">
          <div className="d-flex table-row">
            {renderTableHeading()}
          </div>
        </div>

        <div className="flex-dir-col table-body">
          {renderTableData()}
        </div>
      </div>
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
  currentTab: PropTypes.string
}

export default Table
