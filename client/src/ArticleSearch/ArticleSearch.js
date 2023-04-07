import { useState, useEffect } from "react";
import React from "react";
import "./ArticleSearch.css";
// import TopicCard from "../Cards/TopicCard";
import Cards from "../Cards/Card";
import TopicCard from "../Cards/TopicCard";
import { useNavigate } from "react-router-dom";
import { HeatMapComponent, Inject, Legend, Tooltip, Adaptor, ITooltipEventArgs } from '@syncfusion/ej2-react-heatmap';
import { registerLicense } from '@syncfusion/ej2-base';

// Registering Syncfusion license key
registerLicense('Mgo+DSMBaFt+QHFqVk5rXVNbdV5dVGpAd0N3RGlcdlR1fUUmHVdTRHRcQlljT3xSdUxnUHpfc3c=;Mgo+DSMBPh8sVXJ1S0d+X1lPd11dXmJWd1p/THNYflR1fV9DaUwxOX1dQl9gSXpTcEdiWnZaeXFXQ2M=;ORg4AjUWIQA/Gnt2VFhhQlJMfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hSn5XdkNhWHxXdH1QQ2hf;MTY0NjY1MkAzMjMxMmUzMTJlMzMzOFQraGVUVDhwZU96ajFwTkhnTEpzdVdVd2FBTjhZSkNBeTZ2b0dEdm91UkE9;MTY0NjY1M0AzMjMxMmUzMTJlMzMzOEs0VWQxSWkvbmJ3WHNRVWdpQ2NKTHFaejJKbkN3dXFtbTExMEtxd0dhRDg9;NRAiBiAaIQQuGjN/V0d+XU9HflRDX3xKf0x/TGpQb19xflBPallYVBYiSV9jS31TckVlW35deXBcQGJYUg==;MTY0NjY1NUAzMjMxMmUzMTJlMzMzOFFyN0Y2MmpibS9OZTJCSjNEOVFUMHpvZjluanFROVo1dVI2MnlOYnIvdTA9;MTY0NjY1NkAzMjMxMmUzMTJlMzMzOGFTZXM3QUtVdHR1aDRGWmNSREpxRDJUQVZGR1Y4NHNzbFhmV3grYXpoN0E9;Mgo+DSMBMAY9C3t2VFhhQlJMfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hSn5XdkNhWHxXdH1TTmlf;MTY0NjY1OEAzMjMxMmUzMTJlMzMzOGtZZWZkdVJhbnJhaHhiZlBCbTM5U1RVMHJMcVB2NUVzaXc1OGxmRllBSnM9;MTY0NjY1OUAzMjMxMmUzMTJlMzMzOERTRWFQS1dpa2lqZ0VRdUdGQ3FUakwxaTZRL09XbjZpaE1yWXZNdHozNTQ9;MTY0NjY2MEAzMjMxMmUzMTJlMzMzOFFyN0Y2MmpibS9OZTJCSjNEOVFUMHpvZjluanFROVo1dVI2MnlOYnIvdTA9');


function ArticleSearch() {

  const [searchInput, setSearchInput] = useState("");
  const [articles, setArticles] = useState([]);
  const [topics, setTopics] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [showButton, setShowButton] = useState(false)
  const [prwtMapData, setPrwtMapData] = useState([]);
  const [prtdMapData, setPrtdMapData] = useState([]);
  const [wordCloud, setWordCloud] = useState({});
  const [words, setWords] = useState([]);


//   const topics = [
//     {
//         "title": "Topic 0",
//         "words": ["games", "shooter", "first", "dummy"]
//     },
//     {
//         "title": "Topic 1",
//         "words": ["wars", "space", "saber", "dummy"]
//     },
//     {
//         "title": "Topic 2",
//         "words": ["palpatine", "sith", "vader", "dummy"]
//     }
// ]

useEffect(() => {
  fetchTopics();
  fecthPrtdMap();
  fetchArticles();
  fetchPrwtMap();
  fetchWordCloud();
},[])

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
  setWords(data.words)
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
    setWordCloud(data.image)
    setIsLoading(false)
  }



function filterData(event){
  setSearchInput(event.target.value)
}

  const handleClick = () => {
      var key=searchInput.split(' ').join('_')
      submitArticle(key);
      setShowButton(true)
  }


  async function submitArticle(a) {
    setIsLoading(true)
    try {
      await fetch(`/api/articles/${a}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json()",
        },
      })
      
    } catch (error) {
      console.log(error)
    }
  }

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

  function tooltipTemplate(args) {
    args.content = [args.yLabel + ' | ' + args.xLabel + ' : ' + args.value + ' %'];
  }

    return (
        
  <div>

    <main>
      <section className="banner">
        <h2>Topic Model</h2>
      </section>
      
      <form className="search">
        <input type="text" placeholder="Enter article..."  onChange={filterData} value={searchInput}/>
          {!showButton && <button type="submit" id="search-btn" className="btn" onClick={handleClick}>Run Script</button>}
      </form>
      {isLoading && topics=="" && <p>Loading Topics...</p>}
      <section className="main-info">
        <div className="topics">
          {!isLoading && topics && (topics.length > 0 ? topics.map(topic => (
          <TopicCard
            topic={topic}
            key={topic.title}
          />
          )) : <p>
                  No topics found
               </p>
        )}
        </div>
        <div className="graphs">
          {/* {!isLoading &&
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
            height="600px"
          >
            <Inject services={[Legend, Tooltip, Adaptor]} />
          </HeatMapComponent> 
          } */}
          {!isLoading && 
            <HeatMapComponent
            titleSettings={{
              text: 'Probabaility of the Top 70 Words Being in a Topic (x10,000)',
              textStyle: {
                size: '15px',
                fontWeight: '500',
                fontStyle: 'Normal',
                fontFamily: 'Segoe UI'
              }
            }}
            xAxis={{
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
            yAxis={{
              labels: words,
              minimum: 0,
              maximum: 69
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
          }
          {!isLoading && 
            <img src={`data:image/png;base64,${wordCloud}`} alt="Word Cloud" height={500} width={800}/>
          }
        
    
        </div>
      </section>
      
    </main>

    <footer>
      <p>&copy; 2023 Topic Model Search</p>
    </footer>

    <script src="app.js"></script>
  </div>
    )
}
export default ArticleSearch;