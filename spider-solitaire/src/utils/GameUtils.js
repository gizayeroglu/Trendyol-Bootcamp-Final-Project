const cardRank = [
  {rank:'A', count:8, value:1},
  {rank:'2', count:8, value:2},
  {rank:'3', count:8, value:3},
  {rank:'4', count:8, value:4},
  {rank:'5', count:8, value:5},
  {rank:'6', count:8, value:6},
  {rank:'7', count:8, value:7},
  {rank:'8', count:8, value:8},
  {rank:'9', count:8, value:9},
  {rank:'10', count:8, value:10},
  {rank:'J', count:8, value:11},
  {rank:'Q', count:8, value:12},
  {rank:'K', count:8, value:13}
];

export const getCardHoldersWithCards = (cardCount) => {
  let cnt = 0;
  const data = [];

  while(cnt < cardCount) {
    const symbolIndex = ~~(Math.random() * 13);
    if (cardRank[symbolIndex].count === 0) continue;

    const cardHolderIndex = cnt % 10;

    if (!data[cardHolderIndex]) {
      const cardHolder = { name: `cardholder${cardHolderIndex}`, cards: [] };
      data[cardHolderIndex] = cardHolder;
    }
    
    data[cardHolderIndex].cards.push({
      symbol: cardRank[symbolIndex].rank,
      isOpen:false,
      isDraggable:false,
      value: cardRank[symbolIndex].value
    });

    cardRank[symbolIndex].count--; 
    cnt++;
  }

  //Open last cards for every holder
  for (const cardHolder of data) {
    cardHolder.cards[cardHolder.cards.length - 1].isOpen = true;
    cardHolder.cards[cardHolder.cards.length - 1].isDraggable = true;
  }

  return data;
};

export const checkSetOfCards = (cards) => {

  if(cards.length < 13 || cards[cards.length-1].value !== 13) return {isScore: false, cards: cards};
  
  let cardsRanksForEachHolder = '';

  for (const card of cards) {
    cardsRanksForEachHolder += card.symbol;
  }

  const foundedCardIndex = cardsRanksForEachHolder.search(/A2345678910JQK/);
  
  if(foundedCardIndex === -1) return {isScore: false, cards: cards};

  cards.splice(foundedCardIndex, foundedCardIndex + 13);
  if(cards.length) cards[cards.length-1].isOpen=true;
  if(cards.length) cards[cards.length-1].isDraggable=true;
  
  return {isScore: true, cards: cards};
}

export const isAnyCardHolderWithoutCards = (deckData) => {
  for (const cardHolder of deckData) {
    if(cardHolder.cards.length === 0) return true;
  }

  return false;
}

export const updateCardDraggable = (deckData) => {

  for (const data of deckData) {
    const cards = data.cards;

    for(let i=cards.length-1; i>0; i--) {

      const childNode = cards[i];
      const parentNode = cards[i-1];

      if(!parentNode || parentNode.isOpen !== true) continue;

      if(childNode && parentNode.value + 1 === childNode.value && childNode.isDraggable === true) {
        parentNode.isDraggable=true;
      }else {
        parentNode.isDraggable=false;
      }
    }

    if(data.cards.length) data.cards[data.cards.length-1].isDraggable=true; 
  }

  return deckData;
}

export const isValidDrop = (deckData, droppedCardHolderIndex, draggedCardHolderIndex, draggedCardIndex) => {
  if(deckData[droppedCardHolderIndex].cards.length === 0) return true;

  const lastValOfDroppedHolder = deckData[droppedCardHolderIndex].cards[deckData[droppedCardHolderIndex].cards.length - 1].value;
  const draggedCardVal = deckData[draggedCardHolderIndex].cards[draggedCardIndex].value;

  if (deckData[draggedCardHolderIndex].cards[draggedCardIndex].isDraggable && draggedCardVal - 1 === lastValOfDroppedHolder ) {
    return true;
  }

  return false;
};