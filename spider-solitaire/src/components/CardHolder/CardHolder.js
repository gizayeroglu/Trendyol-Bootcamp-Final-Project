import './CardHolder.css';
import React from 'react';
import Card from '../Card/Card';

function CardHolder({ cards = [] }){
    return(
        cards.map((card, index) => {
          return(
            <>
             <Card key={index} content={card} isLastCard={index === (cards.length-1)}/>
            </>
          )
        })
    )
}

export default CardHolder;