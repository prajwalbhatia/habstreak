import React from "react";
import { useHistory } from "react-router";

import "./header.css";

//Redux
import { useSelector } from "react-redux";

//LIBRARIES
import moment from 'moment';


//Component 
import Search from "../search/search";
import { OutlinedPrimaryButton } from "components/button/button";
import { IconButton } from "components/button/button";

import { dialogForCreateAndUpdateStreak, dialogForCreateAndUpdateReward } from "utilities";

function Header(props) {
    const history = useHistory();

    const streaks = useSelector((state) => state.streak.streaks);

    const { internalNavigation, headerText } = props;
    return (
        <header className="header">
            <div className="header-text-container">
                <h1 className="heading">{headerText}</h1>
                {props.withInternalNavigation
                    &&
                    <div onClick={() => history.goBack()} className="d-flex header-nav-container">
                        <i className="demo-icon icon-back" />
                        <h5>{internalNavigation}</h5>
                    </div>
                }
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
                    name={headerText === 'Rewards' ? 'Add New Reward' : 'Add New Streak'}
                    click={headerText === 'Rewards' ?
                        () => dialogForCreateAndUpdateReward('create', {}, '', streaks)
                        :
                        () => dialogForCreateAndUpdateStreak()
                    }
                    btnContainerClass=""
                    btnClass='h-40'
                />
            </div>

        </header>
    );
}

export default Header;