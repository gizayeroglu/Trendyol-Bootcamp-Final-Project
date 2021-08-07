import './Card.css';

import React from 'react';
import cardImage from '../../assets/club.png';

function Card({content, isLastCard, onDragStart}){
  
  let classes = isLastCard ? `card card-front` : `card card-back`;

  return(
    <>
      <div onDragStart={onDragStart} draggable={isLastCard} className={classes}>
        <span className='content-left-top'>{content}<img src={cardImage} alt='club'/></span>
        <span className='content-right-bottom'>{content}<img src={cardImage} alt='club'/></span>
      </div>
    </>
  )
}

export default Card;