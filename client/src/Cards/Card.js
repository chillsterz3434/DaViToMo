import React from 'react';
// import TopicCard from './TopicCard';

const Card = (props) => (
  <div className={props.className}> 
    {props.children}
  </div>
);
// function Card() {
//   const topics = [
//     {
//         "id": 1,
//         "title": "Topic 0",
//         "words": ["games", "shooter", "first", "dummy"]
//     },
//     {
//         "id": 2,
//         "title": "Topic 1",
//         "words": ["wars", "space", "saber", "dummy"]
//     },
//     {
//         "id": 3,
//         "title": "Topic 2",
//         "words": ["palpatine", "sith", "vader", "dummy"]
//     }
//   ]
//   return (
//     <>
//         {topics.map(topic => (
          
//             <TopicCard key={topic.id}
//                 title={topic.title}
//                 words={topic.words}
//                 />
//         ))}
//     </>
//   )
// }


export default Card;
