import React from "react";
import "./DocumentPage.css"
import TopicCard from "../Cards/TopicCard";
import DocumentCard from "../Cards/DocumentCard";
import { useLocation } from "react-router-dom";

function DocumentPage() {

  const location = useLocation();
  const heatmapData = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];


  const documents = [
    {
      "id": 1,
      "title": "Morty Smith",
      "text": "This is an article about Morty Smith"
    },
    {
      "id": 2,
      "title": "Destiny 2",
      "text": "This is an article about Destiny 2"
    }
  ]
  const topics = [
    {
        "title": "Topic 0",
        "words": ["games", "shooter", "first", "dummy"]
    },
    {
        "title": "Topic 1",
        "words": ["wars", "space", "saber", "dummy"]
    },
    {
        "title": "Topic 2",
        "words": ["palpatine", "sith", "vader", "dummy"]
    }
  ]
  
  // Add code to display the heatmap here
  // Add code to display the document text here
  
  const relatedDocumentsList = document.querySelector('.related-documents ul');
  
  // for (let i = 0; i < relatedDocuments.length; i++) {
  //   const li = document

  return(

<main>
<section className="banner">
      <h2>{location.state.title}</h2>
    </section>
  <div class="heatmap">
    <h2>Heatmap</h2>
    {/* <!-- Add the code to display the heatmap here --> */}

  </div>
<section className="related-info">
  <div class="related-topics">
    <h3>Related Topics</h3>
    {topics.map(topic => (
          <TopicCard
          topic={topic}
          key={topic.title}
          />
        ))}
  </div>
  <div class="document-text">
    <h3>Document Text</h3>
    {location.state.text}
  </div>
  <div class="related-documents">
    <h3>Related Documents</h3>
    {documents.map(doc => (
          <DocumentCard
          doc={doc}
          key={doc.id}
          />
        ))}
  </div>
  </section>
</main>
  ) 
};



export default DocumentPage;