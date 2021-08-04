import './GamePage.css';
import Header from '../../components/Header/Header';
import GoBack from '../../components/GoBack/GoBack';
import CardHolder from '../../components/CardHolder/CardHolder';

function GamePage(){
    return(
    <>
        <Header />
        <GoBack />
        <div className= "game-area-container">
          <CardHolder />
        </div>
    </>
    );
}

export default GamePage;