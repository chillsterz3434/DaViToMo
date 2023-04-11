import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./TopicPage.css"
import TopicCard from "../Cards/TopicCard";
import DocumentCard from "../Cards/DocumentCard";
import { HeatMapComponent, Inject, Legend, Tooltip, Adaptor, ITooltipEventArgs } from '@syncfusion/ej2-react-heatmap';
import { registerLicense } from '@syncfusion/ej2-base';

function TopicPage() {

  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [topics, setTopics] = useState([]);
  const [prtdMapData, setPrtdMapData] = useState([]);
  const [articles, setArticles] = useState([]);
  



useEffect(() => {
  fetchTopics();
  fecthPrtdMap();
  fetchArticles();  
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

async function fetchArticles() {
  setIsLoading(true)
  const response = await fetch('api/articles')
  if(!response.ok) {
    throw new Error('Request failed with status '+response.status)
  }
  const data = await response.json()
  console.log(data)
  setArticles(data)
  setIsLoading(false)
}

async function fecthPrtdMap() {
  setIsLoading(true)
  const response = await fetch('api/graphs/prtdmap')
  if(!response.ok) {
    throw new Error('Request failed with status '+response.status)
  }
  const data = await response.json()
  console.log(data)
  setPrtdMapData(data.data)
  setIsLoading(false)
}

function tooltipTemplate(args) {
  args.content = [args.yLabel + ' | ' + args.xLabel + ' : ' + args.value + ' %'];
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
    <section className="graph">
      {!isLoading &&
            <HeatMapComponent
            titleSettings={{
              text: 'Probabaility of a Topic Being in an Article',
              textStyle: {
                size: '15px',
                fontWeight: '500',
                fontStyle: 'Normal',
                fontFamily: 'Segoe UI'
              }
            }}
            xAxis={{
              labels: articles,
              labelRotation: 90,
              labelIntersectAction: 'None',
            }}
            yAxis={{
              labels: [
                'Topic 0',
                'Topic 1',
                'Topic 2',
                'Topic 3',
                'Topic 4',
                'Topic 5',
                'Topic 6',
                'Topic 7',
                'Topic 8',
                'Topic 9',
                'Topic 10',
                'Topic 11'
                
              ]
            }}
            paletteSettings = {{
              colorGradientMode: 'Row'
          }}
            legendSettings={{
              visible: false
            }}
            renderingMode= { 'SVG' }
            tooltipRender={tooltipTemplate}
            dataSource={prtdMapData}
            height="600px"
          >
            <Inject services={[Legend, Tooltip, Adaptor]} />
          </HeatMapComponent> 
          }
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


