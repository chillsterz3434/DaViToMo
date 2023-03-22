import { useEffect, useState } from "react";
import React from "react";
import "./ArticleSearch.css";

//TODO: Still need to figure out how to get article into the GET request

function ArticleSearch() {

  const [searchInput, setSearchInput] = useState("");
  const [article, setArticle] = useState("");
  const [data, setData] = useState("");
  const [url, setUrl] = useState("");



  const handleClick = () => {
    setArticle(searchInput);
    setUrl('/api/'+article);
    // submitArticle({title: article})
  }

  // React.useEffect(() => {
  //   fetch("/api")
  //     .then((res) => res.json())
  //     .then((data) => setData(data.script.dataToSend))
  // })
  
  // const form = document.querySelector('form')
  // if(form){
  //   form.addEventListener('submit', (e) => {
  //     e.preventDefault();
  //     submitArticle(article)
  //   }, []);
  // }

  function filterData(event){
    setSearchInput(event.target.value)
  }

  React.useEffect(() => {
    fetch(url)
    .then((res) => res.json())
    .then((data) => setData(data.script.dataToSend))
  }, [])

  // async function submitArticle(a) {
  //   try {
  //     const response = await fetch('/api/', {
  //       method: "GET",
        
  //     })
  //     .then((res) => res.json())
  //     .then((data) = setData(data.script.dataToSend))
  //     if (!response.ok) {
  //       throw new Error('Request failed with status '+response.status)
  //     }
  //     // const data = await response.json()
      
  //     // console.log('Article submitted: '+data)
  //     // console.log(response.body)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  

  




    return (
        
  <div>

    <main>
      
        <input type="text" name="article" placeholder="Enter article..."  onChange={filterData} value={searchInput}/>
        <button type="submit" id="search-btn" onClick={handleClick}>Run Script</button>
        

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