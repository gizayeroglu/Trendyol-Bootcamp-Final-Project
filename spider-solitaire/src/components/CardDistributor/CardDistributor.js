import "./CardDistributor.css";

import React from "react";

function CardDistributor ({ getNewCards }) {
  return (
    <>
      <div className='card-distrubitor-container'>
        <div className='distubitor-card' onClick={(e) => getNewCards(e)}></div>
        <div className='distubitor-card' onClick={(e) => getNewCards(e)}></div>
        <div className='distubitor-card' onClick={(e) => getNewCards(e)}></div>
        <div className='distubitor-card' onClick={(e) => getNewCards(e)}></div>
        <div className='distubitor-card' onClick={(e) => getNewCards(e)}></div>
      </div>
    </>
  );
}

export default CardDistributor ;
