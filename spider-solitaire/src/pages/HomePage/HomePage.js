import "../HomePage/HomePage.css";

import { useHistory } from "react-router-dom";
import Header from "../../components/Header/Header";
import spiderSolitaire from "../../assets/preview-reversed-spider-solitaire.webp";

function HomePage() {
  const history = useHistory();

  const onCardClick = () => {
    history.push(`play`);
  };

  return (
    <>
      <Header />
      <div className='play-game-card' onClick={onCardClick}>
        <img src={spiderSolitaire} alt='Preview Reversed Spider Solitaire' />
        <div className='card-text'>
          <h4>
            <b>Play Reversed Spider Solitare</b>
          </h4>
          <p>Easy</p>
        </div>
      </div>
    </>
  );
}

export default HomePage;
