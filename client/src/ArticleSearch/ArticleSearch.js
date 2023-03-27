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
  const [topics, setTopics] = useState("")



function filterData(event){
  setSearchInput(event.target.value)
}

  const handleClick = () => {
    if(article!==""){
      window.location.reload(true)
    } else{
      var key=searchInput.split(' ').join('_')
      setArticle(key);
      setButtonContent("Refresh Page")
    }
    

  }
  const form = document.querySelector('form')
      if(form && article!==searchInput && article!==""){
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          submitArticle(article)
          
        }, []);
      }
  


  async function submitArticle(a) {
    try {
      const response = await fetch(`/api/articles/${a}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json()",
        },
      })
      .then((res) => res.json())
      .then((data) => setData(data.script.dataToSend))
      if (!response.ok) {
        throw new Error('Request failed with status '+response.status)
      }
      console.log('Article submitted: '+data)
      console.log(response.body)
      
    } catch (error) {
      console.log(error)
    }
  }


    return (
        
  <div>

    <main>
      <form>
        <input type="text" placeholder="Enter article..."  onChange={filterData} value={searchInput}/>
        <button type="submit" id="search-btn" className="btn" onClick={handleClick}>{!buttonContent ? "Run Script" : buttonContent}</button>
        </form>

      <div>
      {topics && (topics.length > 0 ? topics.map(topic => (
        <TopicCard
          topic={topic}
          key={topic.title}
          />
      )) : <p className="msg">
        No topics found
      </p>
      )}
        <header>
          <p>{article && !data ? "Loading..." : data}</p>
          <p>{searchInput}</p>
          <p>{article}</p>
        </header>
        <form>

        </form>
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