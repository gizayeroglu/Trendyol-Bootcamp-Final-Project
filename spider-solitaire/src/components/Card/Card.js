import "./Card.css";

import React from "react";
import cardImage from "../../assets/club.png";

function Card({ symbol, isOpen, onDragStart }) {
  let classes = isOpen ? `card card-front` : `card card-back`;

  return (
    <>
      <div onDragStart={onDragStart} draggable={isOpen} className={classes}>
        <span className='content-left-top'>
          {symbol}
          <img src={cardImage} alt='club' />
        </span>
        <span className='content-right-bottom'>
          {symbol}
          <img src={cardImage} alt='club' />
        </span>
      </div>
    </>
  );
}

export default Card;
