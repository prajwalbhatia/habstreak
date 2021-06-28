import React from 'react';

//Css
import './card.css';

function Card({cardClass , withLine , children  , ...rest}) {
    return(
        <div 
        className={cardClass ? `card ${cardClass}` : "card"}
        {...rest}
        >
            {withLine ?  <div className="card-line"></div> : null}
            {children}
        </div>
    );
}

export default Card;