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