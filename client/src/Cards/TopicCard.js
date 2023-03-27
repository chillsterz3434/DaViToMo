import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types'
import Card from './Card';
import './TopicCard.css'



const TopicCard = (props) => {

    return(
        <Card key={props.topic.title} className='topic-card'>
            <div className='card-content'>
                 <div className='card-header'>
                     <div className='topic-title'>{props.title}</div>
                 </div>
                 <div className='card-firstthree'>
                    
                 {props.words.slice(0,3)?.map(word => (
                     <div className='word' key={word}>
                         {word}
                         </div>
                 ))}
             </div>
             </div>
        </Card>
    );
};

TopicCard.propTypes = {
    topic: PropTypes.shape({
        title: PropTypes.string,
        words: PropTypes.arrayOf(PropTypes.string),
    }),
}



export default TopicCard;