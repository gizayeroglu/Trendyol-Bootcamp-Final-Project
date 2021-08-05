import './GoBack.css';
import { useHistory } from 'react-router-dom';
import goBackIcon from '../assets/go-back-icon.jpg';

function GoBack(){
  const history = useHistory();

  const handleGoHome = () => {
    history.push('/');
  };

    return(
        <button onClick={handleGoHome} className="go-back-button"><img src={goBackIcon} alt="Go Home Page" className="go-back-icon"/></button>
    )
}

export default GoBack;