import { useState, useEffect } from "react";
import React from "react";
import "./ArticleSearch.css";
// import TopicCard from "../Cards/TopicCard";
import Cards from "../Cards/Card";
import TopicCard from "../Cards/TopicCard";

//TODO: get topics from server


function ArticleSearch() {

  const [searchInput, setSearchInput] = useState("");
  const [article, setArticle] = useState("");
  const [data, setData] = useState("");
  const [buttonContent, setButtonContent] = useState("")
  const [topics, setTopics] = useState([])
  const [isLoading, setIsLoading] = useState(false)

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
  if(topics.length<6){
    fetchTopics()
  }
  

})



function filterData(event){
  setSearchInput(event.target.value)
}

  const handleClick = () => {
    if(article==""){
      var key=searchInput.split(' ').join('_')
      setArticle(key);
      setButtonContent("")
      setSearchInput("")
    }
  }

  const form = document.querySelector('form')
      if(form){
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          submitArticle(article)
        }, []);
      }
  


  async function submitArticle(a) {
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
    // console.log(data)
    
  }

  


 

  


    return (
        
  <div>

    <main>
      <section className="banner">
        <h2>Topic Model</h2>
      </section>
      
      <form>
        <input type="text" placeholder="Enter article..."  onChange={filterData} value={searchInput}/>
        {!topics && <button type="submit" id="search-btn" className="btn" onClick={handleClick}>{!buttonContent ? "Run Script" : buttonContent}</button>
        }
        </form>
        {isLoading && article!=="" && <p>Loading Topics...</p>}
        {!isLoading && topics && (topics.length > 0 ? topics.map(topic => (
        <TopicCard
          topic={topic}
          key={topic.title}
          />
      )) : <p>
        No topics found
      </p>
      )}

      <div>
      </div>
      
    </main>

    <footer>
      <p>&copy; 2023 Topic Model Search</p>
    </footer>

    <script src="app.js"></script>
  </div>
    )
}
export default ArticleSearch;