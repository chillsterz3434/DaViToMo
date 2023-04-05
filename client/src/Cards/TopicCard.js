import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types'
import Card from './Card';
import './TopicCard.css'
import {Routes, Route, useNavigate} from 'react-router-dom'
import HomePage from '../HomePage/HomePage';


const TopicCard = (props) => {

    const navigate = useNavigate();

    const toTopicPage=()=>{
      navigate('/topics', {state:{title:props.topic.title, words:props.topic.words, articles:props.topic.articles}});
    }
  


    return(
        <button className='topic-card' onClick={()=>{toTopicPage()}}>
        <Card key={props.topic.title} className='topic-card'>
            
            <div className='card-content'>
                 <div className='card-header'>
                     <div className='topic-title'>{props.topic.title}</div>
                 </div>
                 <div className='card-firstthree'>
                    
                 {props.topic.words.slice(0,3)?.map(word => (
                     <div className='word' key={word}>
                         {word}
                         </div>
                 ))}
             </div>
             </div>
            
            
        </Card>
        </button>
    );
};



TopicCard.propTypes = {
    topic: PropTypes.shape({
        title: PropTypes.string,
        words: PropTypes.arrayOf(PropTypes.string),
        articles: PropTypes.arrayOf(PropTypes.string),
    }),
}



export default TopicCard;