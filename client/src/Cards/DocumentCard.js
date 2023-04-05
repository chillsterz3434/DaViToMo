import React from 'react';
import PropTypes from 'prop-types'
import Card from './Card';
import './DocumentCard.css'
import {useNavigate} from 'react-router-dom'


const DocumentCard = (props) => {

    const navigate = useNavigate();

    const toDocumentPage=()=> {
        navigate('/document', {state:{id:props.doc.id, title:props.doc.title, text:props.doc.text}})
    }

    return(
        <button className='document-card' onClick={()=>{toDocumentPage()}}>
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


DocumentCard.propTypes = {
    document: PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      text: PropTypes.string,
    }),
  }



export default DocumentCard;