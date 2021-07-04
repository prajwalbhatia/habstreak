import React from 'react';
import {useLocation} from 'react-router-dom';

//CSS
import "./streak.css";

import { VscDebugRestart  } from "react-icons/vsc";

//COMPONENTS
import Frame from "../../components/frame/frame";

function Streak (props) {
    const location = useLocation();
    return(
        <Frame
            containerClass="streak"
            withHeader={true}
            withSearchBox={false}
            headerTitle={location?.state?.streakName}
            headerIcon={<VscDebugRestart/>}
        >
            {/* Streak detail card container */}
            <div className="streak-details"> 
                {/* Streak detail card */}
                <div className="streak-detail-card">
                    <div className="day-info">
                        <div className="day">Day 1</div>
                    </div>
                    <div className="streak-info">
                        <h4>10th July ,2021 </h4>
                        <p>Today I have learned about promises</p>                        
                        <div className="status-block">
                            <span>Active</span>
                        </div>
                    </div>
                </div>

                {/* Streak detail card */}
                <div className="streak-detail-card">
                    <div className="day-info">
                        <div className="day">Day 1</div>
                    </div>
                    <div className="streak-info">
                        <h4>10th July ,2021 </h4>
                        <p>Today I have learned about promises</p>                        
                        <div className="status-block">
                            <span>Active</span>
                        </div>
                    </div>
                </div>

                {/* Streak detail card */}
                <div className="streak-detail-card">
                    <div className="day-info">
                        <div className="day">Day 1</div>
                    </div>
                    <div className="streak-info">
                        <h4>10th July ,2021 </h4>
                        <p>Today I have learned about promises</p>                        
                        <div className="status-block">
                            <span>Active</span>
                        </div>
                    </div>
                </div>

                {/* Streak detail card */}
                <div className="streak-detail-card">
                    <div className="day-info">
                        <div className="day">Day 1</div>
                    </div>
                    <div className="streak-info">
                        <h4>10th July ,2021 </h4>
                        <p>Today I have learned about promises</p>                        
                        <div className="status-block">
                            <span>Active</span>
                        </div>
                    </div>
                </div>

                {/* Streak detail card */}
                <div className="streak-detail-card">
                    <div className="day-info">
                        <div className="day">Day 1</div>
                    </div>
                    <div className="streak-info">
                        <h4>10th July ,2021 </h4>
                        <p>Today I have learned about promises</p>                        
                        <div className="status-block">
                            <span>Active</span>
                        </div>
                    </div>
                </div>

                {/* Streak detail card */}
                <div className="streak-detail-card">
                    <div className="day-info">
                        <div className="day">Day 1</div>
                    </div>
                    <div className="streak-info">
                        <h4>10th July ,2021 </h4>
                        <p>Today I have learned about promises</p>                        
                        <div className="status-block">
                            <span>Active</span>
                        </div>
                    </div>
                </div>
            </div>
        </Frame>
    );
}

export default Streak;



