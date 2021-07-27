import React, { useState } from 'react';
import { useLocation, withRouter } from 'react-router-dom';

//Libraries
import moment from 'moment';

//Redux
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

//Actions
import { getStreaksDetailData, updateStreakDetailData } from "../../redux/actions/streak";

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
    //Getting the data from the state
    const streakDetail = useSelector((state) => state.streak.streakDetail);
    //Getting initial data
    useEffect(() => {
        if (props?.match?.params?.id)
            dispatch(getStreaksDetailData(props.match.params.id));
    }, [dispatch, props]);

    //Whenver there is a change in streakDetails
    //then we want to update out description array
    //with the latest data 
    useEffect(() => {
        streakDetail.map((detail) => {
            setDesc({ ...desc, [detail._id]: detail.description });
        })
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
                    streakDetail.map((detail, index) => {
                        const statusActive = moment(moment(detail.date).format('YYYY-MM-DD')).isSame(moment(Date.now()).format('YYYY-MM-DD'))
                        return (
                            <div key={detail._id} className="streak-detail-card">
                                <div className="day-info">
                                    <div className="day">Day {index + 1}</div>
                                </div>
                                <div className="streak-info">
                                    <h4>{moment(detail?.date).format('MMMM Do, YYYY')}</h4>
                                    <div className="description-block">
                                        <TextInputElement
                                            placeholder={'Description'}
                                            onChange={(e) => {
                                                setDesc({ ...desc, [detail._id]: e.target.value })
                                            }}
                                            value={desc?.[detail._id]}
                                            type={'text'}
                                            disabled={statusActive ? false : true}
                                        />
                                        <PrimaryButton
                                            name={'Ok'}
                                            click={() => updateStreakDetail(detail)}
                                            btnContainerClass="ml-10"
                                        />
                                    </div>

                                    <div className="status-block">
                                        <span>{statusActive ? 'Active' : 'Upcoming'}</span>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </Frame>
    );
}

export default withRouter(Streak);



