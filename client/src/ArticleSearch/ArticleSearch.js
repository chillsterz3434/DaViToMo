import { useEffect, useState } from "react";
import { format } from 'react-string-format'
import React from "react";
import "./ArticleSearch.css";

//TODO: Still need to figure out how to get article into the GET request
//have the server be able to get a .js script and then run it and pipe it to the client

function ArticleSearch() {

  const [searchInput, setSearchInput] = useState("");
  const [article, setArticle] = useState("");
  const [data, setData] = useState("");
  // const [url, setUrl] = useState("");
  const [buttonContent, setButtonContent] = useState("")


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
      if(form){
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
        // body: JSON.stringify(a)
      })
      .then((res) => res.json())
      .then((data) => setData(data.script.dataToSend))
      if (!response.ok) {
        throw new Error('Request failed with status '+response.status)
      }
      // const data = await response.json()
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
        <header>
          <p>{!data ? "Loading..." : data}</p>
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