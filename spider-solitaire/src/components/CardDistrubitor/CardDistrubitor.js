import "./CardDistrubitor.css";

import React from "react";

function CardDistrubitor({ getNewCards }) {
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

export default CardDistrubitor;
