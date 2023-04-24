import React, { useEffect, useState } from "react";
import "./DocumentPage.css"
import TopicCard from "../Cards/TopicCard";
import DocumentCard from "../Cards/DocumentCard";
import { useLocation } from "react-router-dom";


function DocumentPage() {

  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [topics, setTopics] = useState([]);
  const [articles, setArticles] = useState([]);



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
  // const topics = [
  //   {
  //       "title": "Topic 0",
  //       "words": ["games", "shooter", "first", "dummy"]
  //   },
  //   {
  //       "title": "Topic 1",
  //       "words": ["wars", "space", "saber", "dummy"]
  //   },
  //   {
  //       "title": "Topic 2",
  //       "words": ["palpatine", "sith", "vader", "dummy"]
  //   }
  // ]

  useEffect(() => {
    fetchTopics();
  },[])

  async function fetchTopics() {
    setIsLoading(true)
    const response = await fetch('api/alltopics')
    if (!response.ok) {
      throw new Error('Request failed with status '+response.status)
    }
    const data = await response.json()
    setTopics(data)
    setIsLoading(false)
  }

  return(

<main>
<section className="banner">
      <h2>{location.state.title}</h2>
    </section>
  <div className="heatmap">
    <h2>Heatmap</h2>
    
    
  </div>
<section className="related-info">
  <div className="related-topics">
    <h3>Related Topics</h3>
    {isLoading && <p>Loading Topics... This may take a while for large articles...</p>}
    {!isLoading ? topics.map(topic => (
          <TopicCard
          topic={topic}
          key={topic.title}
          />
        )) : <p>
          No topics found
          </p>}
  </div>
  <div className="document-text">
    <h3>Document Corpus</h3>
    {location.state.text}
  </div>
  <div className="related-documents">
    <h3>Related Documents</h3>
    {topics.map(topic => (
      topic.articles.map(doc =>
        <DocumentCard
          doc={doc}
          key={doc.id}
          />
        )
        ))}
  </div>
  </section>
</main>
  ) 
};



export default DocumentPage;