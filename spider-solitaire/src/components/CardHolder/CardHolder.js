import './CardHolder.css';
import React from 'react';
import Card from '../Card/Card';

function CardHolder({ cards = [] }){

  // const drop = e => {
  //   e.preventDefault();
  //   const card_id = e.dataTransfer.getData('card_id');

  //   const card = document.getElementById(card_id);
  //   card.style.display = 'block';

  //   e.target.appendChild(card);
  // }

  // const dragOver = e => {
  //   e.preventDefault();
  // }
    return(
        cards.map((card, index) => {
          return(
            <>
              <Card key={index} 
              content={card}
              isLastCard={index === (cards.length-1)}
              // onDrop={drop}
              // onDragOver={dragOver}
              />
            </>
          )
        })
    )
}

export default CardHolder;