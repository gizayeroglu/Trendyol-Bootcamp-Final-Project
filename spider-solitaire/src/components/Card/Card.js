import './Card.css';
import React, { useState } from 'react';
import cardImage from '../../assets/club.png';

function Card({content, isLastCard}){
  
  const [isUp, setIsUp] = useState(isLastCard ? true : false);

  const classes = isUp ? "card card-front" : "card card-back";

  return(
    <>
      <div className={classes} draggable onDragOver={(e) => e.preventDefault()} onDragEnd={() => console.log("sürükleme")}>
        <span className="content-left-top">{content}<img src={cardImage} alt="club"/></span>
        <span className="content-right-bottom">{content}<img src={cardImage} alt="club"/></span>
      </div>
    </>
  )
}

export default Card;