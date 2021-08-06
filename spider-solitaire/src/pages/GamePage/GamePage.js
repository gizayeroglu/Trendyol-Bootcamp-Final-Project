import './GamePage.css';
import GoBack from '../../components/GoBack/GoBack';
import CardHolder from '../../components/CardHolder/CardHolder';
import CardDistrubitor from '../../components/CardDistrubitor/CardDistrubitor';

function GamePage(){
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
  
  const cardHolders = [];
  let count = 0;

  while(count < 54) {
    const symbolIndex = Math.floor(Math.random() * 13);
    const cardHolderIndex = count % 10;

    if(!cardHolders[cardHolderIndex]) {
      cardHolders[cardHolderIndex] = [];
    }

    cardHolders[cardHolderIndex].push(cardRank[symbolIndex]);
    count++
  }

  return(
    <>
      <GoBack />
      <div className='game-area-top-containers'>
        <div className='game-completed-card-area'></div>
        <div className='game-completed-card-area'></div>
        <div className='game-completed-card-area'></div>
        <div className='game-completed-card-area'></div>
        <CardDistrubitor />
      </div>
      <div className='game-area-container'>
        {cardHolders.map((cards, index) => {
          return (
          <div className='card-holder-container'>
            <CardHolder key={index} cards={cards}/>
          </div>
          )
        })}
      </div>  
    </>
  );
}

export default GamePage;