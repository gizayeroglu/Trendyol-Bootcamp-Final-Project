export const getDeckData = () => {
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
  
  const data = [];
  let count = 0;

  while(count < 54) {
    const symbolIndex = ~~(Math.random() * 13);
    const cardHolderIndex = count % 10;

    if(!data[cardHolderIndex]) {
      const cardHolder = { name: `cardholder${cardHolderIndex+1}`, cards: [] };
      data[cardHolderIndex] = cardHolder;
    }

    data[cardHolderIndex].cards.push(cardRank[symbolIndex]);
    count++
  }

  return data;
}