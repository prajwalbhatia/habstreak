import React from "react";
import { useHistory } from "react-router";

import { IoArrowBackCircleOutline } from "react-icons/io5";
import { IconContext } from "react-icons"

import "./header.css";

//REDUX
import { useDispatch } from "react-redux";

//LIBRARIES
import moment from 'moment';

//Actions
import { createStreakData } from "redux/actions/streak";

//Component 
import Search from "../search/search";
import { OutlinedPrimaryButton } from "components/button/button";
import { IconButton } from "components/button/button";
import Modal from "components/modal";


function Header(props) {
    const dispatch = useDispatch();
    const history = useHistory();

    //FUNCTIONS
    /**
  * 
  * @param {String} type - type of action we want to take ('create' or 'update')
  * @param {Object} data - Pre loaded data in case of update
  * @param {String} streakId - In case of update id of streak we want to update
  */
    const dialog = (type, data, streakId) => {
        Modal.show({
            title: 'New Streak',
            // icon: <AiFillFire />,
            primaryButtonText: 'ADD',
            secondaryButtonText: "Cancel",
            content: [
                {
                    uid: "title",
                    type: "text",
                    eleType: "input",
                    placeholder: 'STREAK NAME'
                },
                // {
                //     label: "Days",
                //     uid: "days",
                //     type: "text",
                //     eleType: "input",
                // },
                {
                    group: true,
                    items: [{
                        uid: "date-from",
                        type: "text",
                        eleType: "input",
                        min: moment(new Date()).format('YYYY-MM-DD'),
                        placeholder: 'FROM',
                        icon: 'icon-calendar'
                    },
                    {
                        uid: "date-to",
                        type: "text",
                        eleType: "input",
                        min: moment(new Date()).format('YYYY-MM-DD'),
                        placeholder: 'TO',
                        icon: 'icon-calendar'
                    }
                    ]
                },
                // {
                //     label: "Description",
                //     uid: "description",
                //     type: "text",
                //     eleType: "textArea",
                // },
            ],
            btnClickHandler: (data) => {
                if (data.type === "primary") {
                    delete data.type
                    dispatch(createStreakData(data));
                }
                Modal.hide();
            },
        });
    };

    //FUNCTIONS

    return (
        <header className="header">
            <div className="header-text-container">
                {props.withBackIcon && <IconContext.Provider
                    value={{ style: { fontSize: '2rem', marginTop: '4px', marginRight: '5px', cursor: 'pointer' } }}>  <IoArrowBackCircleOutline
                        onClick={() => {
                            history.goBack();
                        }}
                    /> </IconContext.Provider>}
                <h1 className="heading">{props.headerText}</h1>
                {props.withDate ? <h5 className="date">{moment().format('dddd, Do MMMM YYYY')}</h5> : null}
            </div>

            <div className="d-flex">
                {
                    props?.withSearchBox
                        ?
                        <Search
                            data={(searchText) => {

                            }}
                            containerClass={'mr-30'}
                        />
                        :
                        null
                }

                <div className="pos-relative">
                    <IconButton
                        click={() => { }}
                        icon={<i className="demo-icon icon-notifications" />}
                        btnContainerClass={'mr-30'}
                    />

                    {/* <div className='notification-dropdown-container' style={{ height: 'calc(3 * 40px )' }}>
                        <ol>
                            <div className="d-flex"><li>Streak 1 dsadsdsa</li>  <span className="pointer ml-10"></span></div>
                            <li>Streak 1</li>
                            <li>Streak 1</li>
                        </ol>
                    </div> */}
                </div>

                <OutlinedPrimaryButton
                    name={'Add New Streak'}
                    click={() => dialog('create')}
                    btnContainerClass=""
                    btnClass='add-btn'
                />
            </div>

        </header>
    );
}

export default Header;