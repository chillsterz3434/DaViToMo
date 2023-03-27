import React, {useState, useEffect} from 'react';
// import PropTypes from 'prop-types'
// import Card from './Card';
import './TopicCard.css'



const TopicCard = (props) => {

    const [topthree, setTopthree] = useState([]);
//     return(
//         <Card key={props.topic.id} className='topic-card'>
//             <div className="card-content">
//                 <div className='topic-title'>{props.topic.title}</div>
//             </div>
//         </Card>
//     );
// };

// TopicCard.propTypes = {
//     topic: PropTypes.shape({
//         title: PropTypes.string
//     }),

// function getTopThree(words) {
//     for(let i=0; i<3; i++){
//         topthree[i] = words[i];
//     }
//     setTopthree(topthree)
// }

// useEffect(() => {
//     getTopThree(props.words);
// })

return(
    <>
    <button className='card'>
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
    </button>
        
    </>
)

}





export default TopicCard;