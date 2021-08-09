import "./GamePage.css";

import React, { useState, useRef } from "react";
import GoBack from "../../components/GoBack/GoBack";
import CardHolder from "../../components/CardHolder/CardHolder";
import Card from "../../components/Card/Card";
import CardDistrubitor from "../../components/CardDistrubitor/CardDistrubitor";
import { getDeckData } from "../../utils/GameUtils";

const data = getDeckData();

function GamePage() {
  const [deckData, setDeckData] = useState(data);

  const dragCard = useRef();
  const dragCardHolder = useRef();

  const handleDragStart = (e, { cardHolderIndex, cardIndex }) => {
    dragCard.current = { cardHolderIndex, cardIndex };
    dragCardHolder.current = e.target;
    dragCardHolder.current.addEventListener("dragend", handleDragEnd);

    setTimeout(() => {
      e.target.style.display = "none";

      let currentNode = e.target.nextSibling;

      while (currentNode) {
        currentNode.style.display = "none";
        currentNode = currentNode.nextSibling;
      }
    }, 0);

    // if(e.target.nextSibling){
    //   e.target.style.height='150px';
    // }
  };

  const handleDragEnd = (e) => {
    console.log("Ending Drag");
    dragCardHolder.current.style.display = "block";
    // dragCardHolder.current.style.backgroundColor = 'white'; /******************* when drag end it returns white */

    let currentNode = dragCardHolder.current.nextSibling;

    while (currentNode) {
      currentNode.style.display = "block";
      currentNode = currentNode.nextSibling;
    }
    dragCardHolder.current.removeEventListener("dragend", handleDragEnd);
    dragCard.current = null;
    dragCardHolder.current = null;
  };

  const isValidDrop = (
    droppedCardHolderIndex,
    draggedCardHolderIndex,
    draggedCardIndex
  ) => {
    const lastValOfDroppedHolder =
      deckData[droppedCardHolderIndex].cards[
        deckData[droppedCardHolderIndex].cards.length - 1
      ].value;
    const draggedCardVal =
      deckData[draggedCardHolderIndex].cards[draggedCardIndex].value;

    if (draggedCardVal + 1 === lastValOfDroppedHolder) {
      return true;
    }

    return false;
  };

  const handleDrop = (e, { cardHolderIndex }) => {
    e.preventDefault();

    console.log("Dropped place:", cardHolderIndex);
    console.log(
      "Dropped card:",
      dragCard.current.cardHolderIndex,
      dragCard.current.cardIndex
    );

    const droppedCardHolderIndex = cardHolderIndex;
    const draggedCardHolderIndex = dragCard.current.cardHolderIndex;
    const draggedCardIndex = dragCard.current.cardIndex;

    const isValid = isValidDrop(
      droppedCardHolderIndex,
      draggedCardHolderIndex,
      draggedCardIndex
    );

    if (droppedCardHolderIndex !== draggedCardHolderIndex && isValid) {
      const newDeckData = [...deckData];

      const removedCardsCount =
        newDeckData[draggedCardHolderIndex].cards.length - draggedCardIndex;
      const removedCards = newDeckData[draggedCardHolderIndex].cards.splice(
        draggedCardIndex,
        removedCardsCount
      );

      //open last card of dragged holder
      const lastCard =
        newDeckData[draggedCardHolderIndex].cards[
          newDeckData[draggedCardHolderIndex].cards.length - 1
        ];
      if (lastCard) {
        lastCard.isOpen = true;
      }

      newDeckData[droppedCardHolderIndex].cards = [
        ...newDeckData[droppedCardHolderIndex].cards,
        ...removedCards,
      ];

      setDeckData(newDeckData);

      dragCard.current = null;
    }
  };

  const dragOver = (e) => {
    e.preventDefault();
    console.log("Drag Over");
  };

  const getNewCards = (e) => {
    console.log("clicked");
    e.target.style.display = "none";
  };

  let GameScore = 0; // for now just set the score some value
  return (
    <>
      <div className='gameOutputs'>
        <span className='score'>
          <i className='fas fa-trophy'></i> Score: {GameScore}{" "}
        </span>
        <span className='gameTime'>
          <i className='fas fa-hourglass-half'></i> Time: {GameScore}{" "}
        </span>
      </div>
      <GoBack />
      <div className='game-area-top-containers'>
        <div className='game-completed-card-area'></div>
        <div className='game-completed-card-area'></div>
        <div className='game-completed-card-area'></div>
        <div className='game-completed-card-area'></div>
        <div className='game-completed-card-area'></div>
        <div className='game-completed-card-area'></div>
        <div className='game-completed-card-area'></div>
        <div className='game-completed-card-area'></div>
        <CardDistrubitor getNewCards={(e) => getNewCards(e)} />
      </div>
      <div className='game-area-container'>
        {deckData.map((cardHolder, cardHolderIndex) => {
          return (
            <CardHolder
              key={cardHolder.name}
              onDrop={(e) => handleDrop(e, { cardHolderIndex })}
              onDragOver={dragOver}
            >
              {cardHolder.cards.map((card, cardIndex) => {
                return (
                  <Card
                    key={`${cardHolderIndex}-${cardIndex}`}
                    onDragStart={(e) =>
                      handleDragStart(e, { cardHolderIndex, cardIndex })
                    }
                    isOpen={card.isOpen}
                    symbol={card.symbol}
                  />
                );
              })}
            </CardHolder>
          );
        })}
      </div>
    </>
  );
}

export default GamePage;
