export const getDeckData = () => {
  const cardRank = [
      'A',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      'J',
      'Q',
      'K'
  ];
  
  const data = [];
  let count = 0;

  while(count < 54) {
    const symbolIndex = ~~(Math.random() * 13);
    const cardHolderIndex = count % 10;

    if(!data[cardHolderIndex]) {
      const cardHolder = { name: `cardholder${cardHolderIndex}`, cards: [] };
      data[cardHolderIndex] = cardHolder;
    }

    data[cardHolderIndex].cards.push({ symbol:cardRank[symbolIndex], isOpen:false, value:symbolIndex + 1 } );
    count++
  }
  
  //Open last cards for every holder
  for (const cardHolder of data) {
    cardHolder.cards[cardHolder.cards.length - 1].isOpen = true; 
  }

  return data;
}