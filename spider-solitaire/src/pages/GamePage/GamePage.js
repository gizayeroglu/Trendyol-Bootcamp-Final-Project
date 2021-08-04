import './GamePage.css';
import Header from '../../components/Header/Header';
import GoBack from '../../components/GoBack/GoBack';
import CardHolder from '../../components/CardHolder/CardHolder';

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
        <Header />
        <GoBack />
        <div className="game-area-container"> 
          {cardHolders.map((cards, index) => {
            return <CardHolder key={index} cards={cards}/>
          })}
        </div>
    </>
    );
}

export default GamePage;