import React, { useState } from 'react';
import { useLocation, withRouter } from 'react-router-dom';

//Libraries
import moment from 'moment';

//Redux
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

//Actions
import { getStreaksDetailData, updateStreakDetailData, emptyStreaksDetail } from "../../redux/actions/streak";

//CSS
import "./streak.css";

//COMPONENTS
import Frame from "../../components/frame/frame";
import { TextInputElement } from "../../components/form-elements/form-elements";
import { PrimaryButton } from '../../components/button/button';

function Streak(props) {
    const location = useLocation();
    const dispatch = useDispatch();
    const [desc, setDesc] = useState({});
    const [streaks, setStreaks] = useState([]);

    //Getting the data from the state
    const streakDetail = useSelector((state) => state.streak.streakDetail);
    //Getting initial data
    useEffect(() => {
        if (props?.match?.params?.id)
            dispatch(getStreaksDetailData(props.match.params.id));

        return () => {
            dispatch(emptyStreaksDetail());
        }

    }, []);

    //Whenver there is a change in streakDetails
    //then we want to update out description array
    //with the latest data 
    useEffect(() => {
        if (streakDetail.length > 0 && JSON.stringify(streaks) !== JSON.stringify(streakDetail)) {
            let streaks = [...streakDetail];
            let descDetail = {};
            streaks.forEach((detail) => {
                descDetail[detail._id] = detail.description;
            });
            setDesc({ ...desc, ...descDetail })
            setStreaks([...streaks]);
        }
    }, [streakDetail])

    /**
     * 
     * @param {Object} detail - Object of detail we want to update
     */
    const updateStreakDetail = (detail) => {
        dispatch(updateStreakDetailData({
            description: desc[detail._id]
        }, detail._id, detail.streakId));
    }

    const checkingStatus = (date) => {
        let status = '';
        if (moment(moment(date).format('YYYY-MM-DD')).isSame(moment(Date.now()).format('YYYY-MM-DD')))
            status = 'Active';
        else if (moment(moment(date).format('YYYY-MM-DD')).isBefore(moment(Date.now()).format('YYYY-MM-DD')))
            status = 'Past';
        else
            status = 'Upcoming';

        return status;
    }

    return (
        <Frame
            containerClass="streak"
            withHeader={true}
            withSearchBox={false}
            headerTitle={location?.state?.streakName}
            withBackIcon={true}
        >
            {/* Streak detail card container */}
            <div className="streak-details">
                {/* Streak detail card */}
                {
                    streaks.length > 0
                        ?
                        streaks.map((detail, index) => {
                            const status = checkingStatus(detail.date);
                            return (
                                <div key={detail._id} className="streak-detail-card">
                                    <div className="day-info" style={{ position: 'relative' }}>
                                        {
                                            detail.reward ?
                                                <div style={{ position: 'absolute', top: 0 }}>{detail?.rewards?.[0]}</div>
                                                :
                                                null
                                        }
                                        <div className="day">Day {index + 1}</div>
                                    </div>
                                    <div className="streak-info">
                                        <h4>{moment(detail?.date).format('MMMM DD, YYYY')}</h4>
                                        <div className="description-block">
                                            <TextInputElement
                                                placeholder={'Description'}
                                                onChange={(e) => {
                                                    setDesc({ ...desc, [detail._id]: e.target.value })
                                                }}
                                                value={desc?.[detail._id]}
                                                type={'text'}
                                                disabled={status === 'Upcoming' ? true : false}
                                            />
                                            <PrimaryButton
                                                name={'Ok'}
                                                click={() => updateStreakDetail(detail)}
                                                btnContainerClass="ml-10"
                                            />
                                        </div>

                                        <div className="status-block">
                                            <span>{status}</span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                        :
                        <div className="empty-container">
                            <p>No streak detail available.</p>
                        </div>
                }
            </div>
        </Frame>
    );
}

export default withRouter(Streak);



