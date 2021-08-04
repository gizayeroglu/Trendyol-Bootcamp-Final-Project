import './CardHolder.css';
import React from 'react';
import Card from '../Card/Card';

function CardHolder(){
    const cardRank = [
        'K',
        'Q',
        'J',
        '10',
        '9',
        '8',
        '7',
        '6',
        '5',
        '4',
        '3',
        '2',
        'A',
    ];

    const deck = cardRank
    .concat(cardRank)
    .sort(() => Math.random() - 0.5);

    return(
        deck.map((f) => {
          return(
            <>
              <Card content={f}/>
            </>
            )
        })
    )
}

export default CardHolder;