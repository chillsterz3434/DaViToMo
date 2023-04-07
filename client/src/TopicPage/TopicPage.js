import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./TopicPage.css"
import TopicCard from "../Cards/TopicCard";
import DocumentCard from "../Cards/DocumentCard";

function TopicPage() {

  const location = useLocation();

const [isLoading, setIsLoading] = useState(false);

const [topics, setTopics] = useState([]);



useEffect(() => {
  fetchTopics();
  
}, [])



async function fetchTopics() {
  setIsLoading(true)
  const response = await fetch('api/topics')
  if (!response.ok) {
    throw new Error('Request failed with status '+response.status)
  }
  const data = await response.json()
  setTopics(data)
  setIsLoading(false)
}





  return (
    <div>
  <main>
    <section className="banner">
      <h2>Topic Selection</h2>
    </section>
    <section className="top-topics">
    <h2>
      
      {
          location.state.words.slice(0,3).map(word => (
            <>"{word}" </>
          ))
        } 
        </h2>
    </section>
    <section className="related-info">
      <div className="word-info">
        <h3>Words</h3>
        
        {
          location.state.words.map(word => (
            <ul>{word}</ul>
          ))
        }
      </div>
      <div className="doc-info">
        <h3>Related Articles</h3>
        {location.state.articles.map(doc => (
          <DocumentCard
          doc={doc}
          key={doc.id}
          />
          // <ul>{doc}</ul>
        ))}
      </div>
      <div className="topic-info">
        <h3>Related Topics</h3>
        {topics.map(topic => (
          <TopicCard
          topic={topic}
          key={topic.title}
          />
        ))}
      </div>
    </section>
  </main>
  <footer>
    {/* <!-- Footer content --> */}
  </footer>
  <script src="script.js"></script>
  </div>
  )

}

export default TopicPage;


