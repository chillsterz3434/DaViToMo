import React, { useEffect, useState } from "react";
import "./DocumentPage.css"
import TopicCard from "../Cards/TopicCard";
import DocumentCard from "../Cards/DocumentCard";
import { useLocation } from "react-router-dom";

function DocumentPage() {

  const location = useLocation();
  const heatmapData = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
  const [isLoading, setIsLoading] = useState(false);
  const [prtdMap, setPrtdMap] = useState({})
  const [prwtMap, setPrwtMap] = useState({})
  const [wordCloud, setWordCloud] = useState({})


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

  useEffect(() => {
    fecthPrtdMap();
    fetchPrwtMap();
    fetchWordCloud();
  }, [])

  async function fecthPrtdMap() {
    setIsLoading(true)
    const response = await fetch('api/graphs/prtdmap')
    if(!response.ok) {
      throw new Error('Request failed with status '+response.status)
    }
    const data = await response.json()
    console.log(data)
    setPrtdMap(data)
    setIsLoading(false)
  }

  async function fetchPrwtMap() {
    setIsLoading(true)
    const response = await fetch('api/graphs/prwtmap')
    if(!response.ok) {
      throw new Error('Request failed with status '+response.status)
    }
    const data = await response.json()
    console.log(data)
    setPrwtMap(data)
    setIsLoading(false)
  }

  async function fetchWordCloud() {
    setIsLoading(true)
    const response = await fetch('api/graphs/wordcloud')
    if(!response.ok) {
      throw new Error('Request failed with status '+response.status)
    }
    const data = await response.json()
    console.log(data)
    setWordCloud(data)
    setIsLoading(false)
  }


  return(

<main>
<section className="banner">
      <h2>{location.state.title}</h2>
    </section>
  <div className="heatmap">
    <h2>Heatmap</h2>
    {!isLoading && <img src={`data:image/png;base64,${prtdMap.image}`} width={600} height={500}/>}
    {!isLoading && <img src={`data:image/png;base64,${prwtMap.image}`} width={600} height={500}/>}
    {!isLoading && <img src={`data:image/png;base64,${wordCloud.image}`} width={600} height={500}/>}

  </div>
<section className="related-info">
  <div className="related-topics">
    <h3>Related Topics</h3>
    {topics.map(topic => (
          <TopicCard
          topic={topic}
          key={topic.title}
          />
        ))}
  </div>
  <div className="document-text">
    <h3>Document Text</h3>
    {location.state.text}
  </div>
  <div className="related-documents">
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