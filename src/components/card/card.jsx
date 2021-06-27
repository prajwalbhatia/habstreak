import React from 'react';

//Css
import './card.css';

function Card(props) {
    return(
        <div className={props.cardClass ? `card ${props.cardClass}` : "card"}>
            {props.withLine ?  <div className="card-line"></div> : null}
            {props.children}
        </div>
    );
}

export default Card;