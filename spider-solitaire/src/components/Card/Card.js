import './Card.css';
import React, { useState } from 'react';
import cardImage from '../../assets/club.png';

function Card({content, isLastCard}){
  
  const [isUp, setIsUp] = useState(isLastCard ? true : false);

  let classes = isUp ? 'card card-front' : 'card card-back';

  // const dragStart = e => {
  //   const target = e.target;
  //   e.dataTranfer.setData('card_id', target.id);

  //   setTimeout(() => {
  //     target.style.display = 'none';
  //   },0);
  // }

  // const dragOver = e => {
  //   e.stopPropagation();
  // }

  return(
    <>
      <div className={classes} draggable
      //  onDragStart={dragStart} 
      //  onDragOver={dragOver}
      >
        <span className='content-left-top'>{content}<img src={cardImage} alt='club'/></span>
        <span className='content-right-bottom'>{content}<img src={cardImage} alt='club'/></span>
      </div>
    </>
  )
}

export default Card;