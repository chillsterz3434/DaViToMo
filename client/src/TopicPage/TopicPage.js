import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./TopicPage.css"
import TopicCard from "../Cards/TopicCard";
import DocumentCard from "../Cards/DocumentCard";

function TopicPage() {

  const location = useLocation();

  const apiUrl = "/api/topics";
const topWords = document.querySelector(".top-topics ul");
const wordList = document.querySelector(".word-info ul");
const topicList = document.querySelector(".topic-info ul");

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
const titleTopic = [
  {
    "title": "Topic 0",
    "words": ["games", "shooter", "first", "dummy","wars", "space", "saber","palpatine", "sith", "vader"]
  }
]


// // Function to fetch data from API
// async function fetchData(url) {
//   try {
//     const response = await fetch(url);
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error(error);
//   }
// }

// // Function to display top words on the page
// function displayTopTopics(topic) {
//   topic.words.slice(0, 3).forEach(word => {
//     const li = document.createElement("li");
//     li.textContent = word;
//     topWords.appendChild(li);
//   });
// }

// // Function to display words, related documents, and related topics on the page
// function displayRelatedInfo(info) {
// //   info.words.forEach(word => {
// //     const li = document.createElement("li");
// //     li.textContent = word;
// //     wordList.appendChild(li);
// //   });
// //   info.map(doc => {
// //     <li>{doc.title}</li>
// //   });
// //   info.topics.forEach(topic => {
// //     const li = document.createElement("li");
// //     li.textContent = topic.name;
// //     topicList.appendChild(li);
// //   });
// }

// // Call fetchData function to get data from API
// fetchData(apiUrl)
//   .then(data => {
//     // Display top 3 topics on the page
//     displayTopTopics(data.topics);

//     // Display words, related documents, and related topics on the page
//     displayRelatedInfo(data.relatedInfo);
//   })
//   .catch(error => console.error(error));

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


