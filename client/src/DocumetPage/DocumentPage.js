import React, { useEffect, useState } from "react";
import "./DocumentPage.css"
import TopicCard from "../Cards/TopicCard";
import DocumentCard from "../Cards/DocumentCard";
import { useLocation } from "react-router-dom";
import { HeatMapComponent, Inject, Legend, Tooltip, Adaptor, ITooltipEventArgs } from '@syncfusion/ej2-react-heatmap';


function DocumentPage() {

  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [prtdMapData, setPrtdMapData] = useState([]);
  const [articles, setArticles] = useState([]);
  const [prwtMapData, setPrwtMapData] = useState([]);
  // const [wordCloud, setWordCloud] = useState({})


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
    fetchArticles();
    fetchPrwtMap();
    // fetchWordCloud();
  }, [])


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

  async function fetchPrwtMap() {
    setIsLoading(true)
    const response = await fetch('api/graphs/prwtmap')
    if(!response.ok) {
      throw new Error('Request failed with status '+response.status)
    }
    const data = await response.json()
    console.log(data)
    setPrwtMapData(data.data)
    setIsLoading(false)
  }

  // async function fetchWordCloud() {
  //   setIsLoading(true)
  //   const response = await fetch('api/graphs/wordcloud')
  //   if(!response.ok) {
  //     throw new Error('Request failed with status '+response.status)
  //   }
  //   const data = await response.json()
  //   console.log(data)
  //   setWordCloud(data)
  //   setIsLoading(false)
  // }

  function tooltipTemplate(args) {
    args.content = [args.yLabel + ' | ' + args.xLabel + ' : ' + args.value + ' %'];
  }


  return(

<main>
<section className="banner">
      <h2>{location.state.title}</h2>
    </section>
  <div className="heatmap">
    <h2>Heatmap</h2>
    {/* <HeatMapComponent
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
        labels: 
          articles
        ,
        labelRotation: 90,
        labelIntersectAction: 'None',
        visible: false
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
    >
      <Inject services={[Legend, Tooltip, Adaptor]} />
    </HeatMapComponent> */}
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
        valueType:"Numeric",
        minimum:1,
        maximum:100
      }}
      yAxis={{
        valueType:"Numeric",
        minimum:1,
        maximum:100
      }}
      paletteSettings = {{
        colorGradientMode: 'Row'
    }}
      legendSettings={{
        visible: false
      }}
      renderingMode= { 'SVG' }
      tooltipRender={tooltipTemplate}
      dataSource={prwtMapData}
    >
      <Inject services={[Legend, Tooltip, Adaptor]} />
    </HeatMapComponent>
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