import './CardHolder.css';
import React from 'react';

function CardHolder(props){
    return (
     <div className="card-holder-container">
      {props.children}
     </div>
    )
}

export default CardHolder;