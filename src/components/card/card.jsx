import React from 'react';

//Css
import './card.css';

function Card(props) {
    return(
        <div className={`card ${props.cardClass}`}>
            {props.children}
        </div>
    );
}

export default Card;