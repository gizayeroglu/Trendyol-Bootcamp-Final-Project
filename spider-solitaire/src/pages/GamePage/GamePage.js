import "./GamePage.css";

import React, { useState, useRef, useEffect } from "react";
import GoBack from "../../components/GoBack/GoBack";
import CardHolder from "../../components/CardHolder/CardHolder";
import Card from "../../components/Card/Card";
import CardDistributor from "../../components/CardDistributor/CardDistributor";
import TimeUpCounter from "../../components/TimeUpCounter/TimeUpCounter";
import { getCardHoldersWithCards } from "../../utils/GameUtils";

const data = getCardHoldersWithCards(54);

function GamePage() {
  const [deckData, setDeckData] = useState(data);
  const [gameScore, setGameScore] = useState(0);

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
  };

  const handleDragEnd = (e) => {
    dragCardHolder.current.style.display = "block";

    let currentNode = dragCardHolder.current.nextSibling;

    while (currentNode) {
      currentNode.style.display = "block";
      currentNode = currentNode.nextSibling;
    }
    dragCardHolder.current.removeEventListener("dragend", handleDragEnd);
    dragCard.current = null;
    dragCardHolder.current = null;
  };

  const isValidDrop = (droppedCardHolderIndex, draggedCardHolderIndex, draggedCardIndex) => {
    if(deckData[droppedCardHolderIndex].cards.length === 0) return true;

    const lastValOfDroppedHolder = deckData[droppedCardHolderIndex].cards[deckData[droppedCardHolderIndex].cards.length - 1].value;
    const draggedCardVal = deckData[draggedCardHolderIndex].cards[draggedCardIndex].value;

    if (deckData[draggedCardHolderIndex].cards[draggedCardIndex].isDraggable && draggedCardVal - 1 === lastValOfDroppedHolder ) {
      return true;
    }

    return false;
  };

  const handleDrop = (e, { cardHolderIndex }) => { 
    e.preventDefault();

    const droppedCardHolderIndex = cardHolderIndex;
    const draggedCardHolderIndex = dragCard.current.cardHolderIndex;
    const draggedCardIndex = dragCard.current.cardIndex;

    const isValid = isValidDrop(droppedCardHolderIndex, draggedCardHolderIndex, draggedCardIndex);

    if (droppedCardHolderIndex !== draggedCardHolderIndex && isValid) {
      const newDeckData = [...deckData];

      const removedCardsCount = newDeckData[draggedCardHolderIndex].cards.length - draggedCardIndex;
      const removedCards = newDeckData[draggedCardHolderIndex].cards.splice(draggedCardIndex, removedCardsCount);

      //open last card of dragged holder
      const lastCard = newDeckData[draggedCardHolderIndex].cards[newDeckData[draggedCardHolderIndex].cards.length - 1];
      if (lastCard) {
        lastCard.isOpen = true;
        lastCard.isDraggable=true;
      }

      newDeckData[droppedCardHolderIndex].cards = [...newDeckData[droppedCardHolderIndex].cards, ...removedCards];

      setDeckData(newDeckData);

      dragCard.current = null;

      const checkIfCardDraggable = isCardDraggable();
      setDeckData(checkIfCardDraggable);
    }
  };

  const dragOver = (e) => {
    e.preventDefault();
  };

  const isAnyCardHolderWithoutCards = () => {
    for (const cardHolder of deckData) {
      if(cardHolder.cards.length === 0) return true;
    }

    return false;
  }
  
  const distributeNewCards = (e) => {
    const isExist = isAnyCardHolderWithoutCards();

    if(isExist) {
      alert('There must be at least one card in each column before you can deal a new row cards !');
      return;
    }

    e.target.style.display = "none";
    const distrubitedData = getCardHoldersWithCards(10);
    const newDeckData = [...deckData];
    
    for (const data of distrubitedData) {
      const foundedHolder = newDeckData.find(el => el.name === data.name);

      if(foundedHolder) {
        foundedHolder.cards = [...foundedHolder.cards, ...data.cards];
      } 
    }
      
    setDeckData(newDeckData);
    const checkIfCardDraggable = isCardDraggable();
    setDeckData(checkIfCardDraggable);
  };

  const isCardDraggable = () => {

    const cardDraggableData = [...deckData];

    for (const data of cardDraggableData) {
      const cards = data.cards;

      for(let i=cards.length-1; i>0; i--) {

        let childNode = cards[i];
        let parentNode = cards[i-1];

        if(!parentNode || parentNode.isOpen !== true) continue;

        if(childNode && parentNode.value + 1 === childNode.value && childNode.isDraggable === true) {
         parentNode.isDraggable=true;
        }else {
          parentNode.isDraggable=false;
        }
      }
      if(data.cards.length) data.cards[data.cards.length-1].isDraggable=true; 
    }
    return cardDraggableData;
  }

  const checkIfTheGameEnd = () => {
    if(gameScore === 2400){
      alert('Congrats !');
    }
  }

  useEffect(()=> {

    const checkingDeckData = [...deckData];

    for (const data of checkingDeckData) {
      
      if(data.cards.length < 13 || data.cards[data.cards.length-1].value !== 13) continue;
      
      let cardsRanksForEachHolder = '';
  
      for (const card of data.cards) {
        cardsRanksForEachHolder += card.symbol;
      }

      const foundedCardIndex = cardsRanksForEachHolder.search(/A2345678910JQK/);
        
      if(foundedCardIndex !== -1){
        data.cards.splice(foundedCardIndex, foundedCardIndex + 13);
        setGameScore(gameScore => gameScore + 300);
        if(data.cards.length) data.cards[data.cards.length-1].isOpen=true;
        if(data.cards.length) data.cards[data.cards.length-1].isDraggable=true;
        setDeckData(checkingDeckData);
      }
    }
    checkIfTheGameEnd();
  },[deckData]);

  return (
    <>
      <div className='gameOutputs'>
        <span className='score'>
          <i className='fas fa-trophy'></i> Score: {gameScore}
        </span>
        <span className='gameTime'>
          <i className='fas fa-hourglass-half'></i> <TimeUpCounter />
        </span>
      </div>
      <GoBack />
      <div className='game-area-top-containers'>
         {gameScore >= 300 ? <Card isOpen='true' symbol='A' /> : <div className='game-completed-card-area'></div>}
         {gameScore >= 600 ? <Card isOpen='true' symbol='A' /> : <div className='game-completed-card-area'></div>}
         {gameScore >= 900 ? <Card isOpen='true' symbol='A' /> : <div className='game-completed-card-area'></div>}
         {gameScore >= 1200 ? <Card isOpen='true' symbol='A' /> : <div className='game-completed-card-area'></div>}
         {gameScore >= 1500 ? <Card isOpen='true' symbol='A' /> : <div className='game-completed-card-area'></div>}
         {gameScore >= 1800 ? <Card isOpen='true' symbol='A' /> : <div className='game-completed-card-area'></div>}
         {gameScore >= 2100 ? <Card isOpen='true' symbol='A' /> : <div className='game-completed-card-area'></div>}
         {gameScore >= 2400 ? <Card isOpen='true' symbol='A' /> : <div className='game-completed-card-area'></div>}
        <CardDistributor  getNewCards={distributeNewCards} />
      </div>
      <div className='game-area-container'>
        {deckData.map((cardHolder, cardHolderIndex) => {
          return (
            <CardHolder key={cardHolder.name} onDrop={(e) => handleDrop(e, { cardHolderIndex })} onDragOver={dragOver}>
              {cardHolder.cards.map((card, cardIndex) => {
                return (
                  <Card
                    key={`${cardHolderIndex}-${cardIndex}`}
                    onDragStart={(e) => handleDragStart(e, { cardHolderIndex, cardIndex })}
                    isOpen={card.isOpen}
                    isDraggable={card.isDraggable}
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
