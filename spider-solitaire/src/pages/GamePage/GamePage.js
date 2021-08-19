import './GamePage.css';

import React, { useState, useRef, useEffect } from 'react';
import GoBack from '../../components/GoBack/GoBack';
import CardHolder from '../../components/CardHolder/CardHolder';
import Card from '../../components/Card/Card';
import CardDistributor from '../../components/CardDistributor/CardDistributor';
import TimeUpCounter from '../../components/TimeUpCounter/TimeUpCounter';
import { getCardHoldersWithCards, checkSetOfCards, isAnyCardHolderWithoutCards, updateCardDraggable, isValidDrop, getHintedData } from '../../utils/GameUtils';

const data = getCardHoldersWithCards(54);

function GamePage() {
  const [deckData, setDeckData] = useState(data);
  const [gameScore, setGameScore] = useState(0);
  const [highestScore, setHighestScore] = useState(0);
  const [lastMove, setLastMove] = useState({});

  const dragCard = useRef();
  const dragCardHolder = useRef();

  const handleDragStart = (e, { cardHolderIndex, cardIndex }) => {
    dragCard.current = { cardHolderIndex, cardIndex };
    dragCardHolder.current = e.target;
    dragCardHolder.current.addEventListener('dragend', handleDragEnd);

    setTimeout(() => {
      e.target.style.display = 'none';

      let currentNode = e.target.nextSibling;

      while (currentNode) {
        currentNode.style.display = 'none';
        currentNode = currentNode.nextSibling;
      }
    }, 0);
  };

  const handleDragEnd = (e) => {
    dragCardHolder.current.style.display = 'block';

    let currentNode = dragCardHolder.current.nextSibling;

    while (currentNode) {
      currentNode.style.display = 'block';
      currentNode = currentNode.nextSibling;
    }
    dragCardHolder.current.removeEventListener('dragend', handleDragEnd);
    dragCard.current = null;
    dragCardHolder.current = null;
  };

  const handleDrop = (e, { cardHolderIndex }) => { 
    e.preventDefault();

    const droppedCardHolderIndex = cardHolderIndex;
    const draggedCardHolderIndex = dragCard.current.cardHolderIndex;
    const draggedCardIndex = dragCard.current.cardIndex;

    const isValid = isValidDrop(deckData, droppedCardHolderIndex, draggedCardHolderIndex, draggedCardIndex);

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
      
      const { isScore, cards } = checkSetOfCards([...newDeckData[droppedCardHolderIndex].cards, ...removedCards]);
      newDeckData[droppedCardHolderIndex].cards = cards;

      const updatedCardsData = updateCardDraggable(newDeckData);
      setDeckData(updatedCardsData);

      if(isScore) {
        setGameScore(gameScore + 300);
        setLastMove({}); // If the set is completed, clean last move state
      } else {
        setLastMove({droppedCardHolderIndex, draggedCardHolderIndex, removedCardsCount});
      }

      dragCard.current = null;
    }
  };

  const dragOver = (e) => {
    e.preventDefault();
  };

  const distributeNewCards = (e) => {
    const isExist = isAnyCardHolderWithoutCards(deckData);

    if(isExist) {
      alert('There must be at least one card in each column before you can deal a new row cards !');
      return;
    }

    e.target.style.display = 'none';
    const distrubitedData = getCardHoldersWithCards(10);
    const newDeckData = [...deckData];
    
    for (const data of distrubitedData) {
      const foundedHolder = newDeckData.find(el => el.name === data.name);

      if(foundedHolder) {
        const { isScore, cards } = checkSetOfCards([...foundedHolder.cards, ...data.cards]);
        foundedHolder.cards = cards;

        if(isScore) setGameScore(gameScore + 300);
      } 
    }
      
    const updatedCardsData = updateCardDraggable(newDeckData);
    setDeckData(updatedCardsData);
    setLastMove({}); // If the new cards distributed, clean last move state
  };
  
  const handleHint = () => {
    const hintedData = getHintedData([...deckData]);
    if(!hintedData) return alert(`I couldn't find a move either`);
      
    setDeckData(hintedData);
    
    setTimeout(()=>{
      const newData = [...hintedData];

      for (const data of newData) {
        for (const card of data.cards) {
          if(card.isHighlighted) card.isHighlighted = false;
        }
      }

      setDeckData(newData);
    }, 1000);
  };

  const handleTakeBackCardMove = () => {
    const droppedIndexBefore = lastMove.droppedCardHolderIndex;
    const draggedIndexBefore = lastMove.draggedCardHolderIndex;
    const removedCardsCount = lastMove.removedCardsCount;

    try {     
      const newDeckData = [...deckData];
      
      const droppedCards = newDeckData[droppedIndexBefore].cards;
      const restoredCards = droppedCards.splice(droppedCards.length-removedCardsCount, removedCardsCount);

      newDeckData[draggedIndexBefore].cards = [...newDeckData[draggedIndexBefore].cards, ...restoredCards];
      
      const updatedCardsData = updateCardDraggable(newDeckData);
      setDeckData(updatedCardsData);
      setLastMove({});
    } catch (ex) {
      alert('There is no last move');
    }
  };

  useEffect(() => {
    if(gameScore === 2400){
      alert('Congrats ! 🔥');
    }
    const highestScore = localStorage.getItem('highestScore');
    if(!highestScore) localStorage.setItem('highestScore', highestScore);
    setHighestScore(localStorage.getItem('highestScore'));

    if(gameScore >= highestScore){
      localStorage.setItem('highestScore', gameScore);
      setHighestScore(gameScore);
    }
  },[gameScore]); 

  return (
    <>
      <div className='game-outputs'>
        <GoBack />
        <span className='score'>
          <i className='fas fa-trophy'></i> Score: {gameScore}
        </span>
        <span className='highest-score'>
          <i className='fas fa-dragon'></i> Highest Score: {highestScore}
        </span>
        <span className='game-time'>
          <i className='fas fa-hourglass-half'></i> <TimeUpCounter />
        </span>
        <button className='undo-move-button' onClick={handleTakeBackCardMove}>Undo Last Move</button>
        <button className='hint-button' onClick={handleHint}>Hint</button>
        <button className='refresh-page-button' onClick={() => window.location.reload(false)}>Restart</button>
      </div>
      <div className='game-area-top-containers'>
         {gameScore >= 300 ? <Card isOpen='true' symbol='K' /> : <div className='game-completed-card-area'></div>}
         {gameScore >= 600 ? <Card isOpen='true' symbol='K' /> : <div className='game-completed-card-area'></div>}
         {gameScore >= 900 ? <Card isOpen='true' symbol='K' /> : <div className='game-completed-card-area'></div>}
         {gameScore >= 1200 ? <Card isOpen='true' symbol='K' /> : <div className='game-completed-card-area'></div>}
         {gameScore >= 1500 ? <Card isOpen='true' symbol='K' /> : <div className='game-completed-card-area'></div>}
         {gameScore >= 1800 ? <Card isOpen='true' symbol='K' /> : <div className='game-completed-card-area'></div>}
         {gameScore >= 2100 ? <Card isOpen='true' symbol='K' /> : <div className='game-completed-card-area'></div>}
         {gameScore >= 2400 ? <Card isOpen='true' symbol='K' /> : <div className='game-completed-card-area'></div>}
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
                    isHighlighted={card.isHighlighted}
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
