import React from 'react';
import PropTypes from 'prop-types'
import Card from './Card';
import './DocumentCard.css'
import {useNavigate} from 'react-router-dom'


const DocumentCard = (props) => {

    let navigate = useNavigate();
    const handleClick = () =>{
        let path = `/document`
        navigate(path)
    }

    return(
        <button className='document-card' onClick={handleClick}>
        <Card key={props.doc.id} className='document-card'>
            
            <div className='card-content'>
                 <div className='card-header'>
                     <div className='topic-title'>{props.doc.title}</div>
                 </div>
             </div>
            
            
        </Card>
        </button>
    );
};



// TopicCard.propTypes = {
//     topic: PropTypes.shape({
//         title: PropTypes.string,
//         words: PropTypes.arrayOf(PropTypes.string),
//     }),
// }



export default DocumentCard;