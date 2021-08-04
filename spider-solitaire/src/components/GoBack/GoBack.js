import './GoBack.css';
import { useHistory } from 'react-router-dom';

function GoBack(){
  const history = useHistory();

  const handleGoHome = () => {
    history.push('/');
  };

    return(
        <button onClick={handleGoHome} className="go-back-button"> Home </button>
    )
}

export default GoBack;