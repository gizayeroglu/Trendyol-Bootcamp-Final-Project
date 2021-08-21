import './CardHolder.css';

import React from 'react';

function CardHolder(props) {
  const { onDrop, onDragOver } = props;

  return (
    <div
      onDrop={onDrop}
      onDragOver={onDragOver}
      className='card-holder-container'
    >
      {props.children.length ? props.children : <div className='empty-card-area'></div>}
    </div>
  );
}

export default CardHolder;
