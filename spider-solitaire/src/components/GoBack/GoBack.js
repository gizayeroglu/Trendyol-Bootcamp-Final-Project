import './GoBack.css';

import React from 'react';
import { useHistory } from 'react-router-dom';

function GoBack(){
  const history = useHistory();

  const handleGoHome = () => {
    history.push('/');
  };

    return(
      <button onClick={handleGoHome} className='go-back-button'>
        <i class='fas fa-home'></i>
      </button>
    )
}

export default GoBack;