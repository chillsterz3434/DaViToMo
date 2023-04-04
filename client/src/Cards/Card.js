import React from 'react';
// import TopicCard from './TopicCard';

const Card = (props) => (
  <div className={props.className}> 
    {props.children}
  </div>
);


export default Card;
