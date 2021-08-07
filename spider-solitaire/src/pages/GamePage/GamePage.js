import './GamePage.css';

import React, { useState, useRef } from 'react';
import GoBack from '../../components/GoBack/GoBack';
import CardHolder from '../../components/CardHolder/CardHolder';
import Card from '../../components/Card/Card';
import CardDistrubitor from '../../components/CardDistrubitor/CardDistrubitor';
import { getDeckData } from '../../utils/GameUtils';

const data = getDeckData();

function GamePage(){
  const[deckData, setDeckData] = useState(data);
  
  const dragCard = useRef();
  const dragCardHolder = useRef();
  
  const handleDragStart = (e, { cardHolderIndex, cardIndex }) => {

    dragCard.current = { cardHolderIndex, cardIndex };
    dragCardHolder.current = e.target;
    dragCardHolder.current.addEventListener('dragend', handleDragEnd);

    setTimeout(() => {
      e.target.style.display = "none";
    }, 0);
  }

  const handleDragEnd = (e) => {
    console.log('Ending Drag');
    dragCardHolder.current.style.display = "block";
    dragCardHolder.current.removeEventListener('dragend', handleDragEnd);
    dragCard.current = null;
    dragCardHolder.current = null;
  }

  return(
    <>
      <GoBack />
      <div className='game-area-top-containers'>
        <div className='game-completed-card-area'></div>
        <div className='game-completed-card-area'></div>
        <div className='game-completed-card-area'></div>
        <div className='game-completed-card-area'></div>
        <CardDistrubitor />
      </div>
      <div className='game-area-container'>
        {deckData.map((cardHolder, cardHolderIndex) => {
          return <CardHolder key={cardHolder.name}>
                    {cardHolder.cards.map((card, cardIndex) => {
                      const isLastCard = (cardHolder.cards.length - 1) === cardIndex;
                      
                      return <Card 
                              key={`${cardHolderIndex}-${cardIndex}`} 
                              onDragStart={(e) => handleDragStart(e, { cardHolderIndex, cardIndex })} 
                              content={card} 
                              isLastCard={isLastCard}
                             />
                    })}
                 </CardHolder>
        })}
      </div>  
    </>
  );
}

export default GamePage;