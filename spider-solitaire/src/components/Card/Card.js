import './Card.css';
import React, { useState } from 'react';

function Card({content}){
  const [isUp, setIsUp] = useState(false);

  const makeCardUp = () => {
      setIsUp(true);
  }

  let classes = "card-back";

  if(isUp) {
      classes = "card-front";
  }

  return(
    <>
      <div className={classes} onClick={makeCardUp} draggable onDragOver={(e) => e.preventDefault()}>
        <span className="content-left-top">{content}</span>
        <span className="content-right-bottom">{content}</span>
      </div>
    </>
  )
}

export default Card;