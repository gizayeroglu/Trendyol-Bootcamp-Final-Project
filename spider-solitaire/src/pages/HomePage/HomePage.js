import { useHistory } from 'react-router-dom';

import Header from '../../components/Header/Header';
import spiderSolitaire from '../../assets/spiderSolitaire.jpg';
import '../HomePage/HomePage.css';

  function HomePage(){
  const history = useHistory();

  const onCardClick = () => {
    history.push(`play`);
  }
  
  return(
    <>
      <Header />
      <div className = 'play-game-card' onClick={onCardClick}>
        <img src = {spiderSolitaire} alt = 'Play Spider Solitare' /> 
        <div className = 'card-text'>
          <h4><b>Play Spider Solitare</b></h4>
          <p>Easy</p>
        </div>
      </div>
    </>
  );
}

export default HomePage;