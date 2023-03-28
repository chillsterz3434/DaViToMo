import React from "react";
import "./TopicPage.css"

function TopicPage() {
  const apiUrl = "https://api.example.com/topics";
const topTopics = document.querySelector(".top-topics ul");
const wordList = document.querySelector(".word-info ul");
const docList = document.querySelector(".doc-info ul");
const topicList = document.querySelector(".topic-info ul");

// Function to fetch data from API
async function fetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

// Function to display top topics on the page
function displayTopTopics(topics) {
  topics.slice(0, 3).forEach(topic => {
    const li = document.createElement("li");
    li.textContent = topic.name;
    topTopics.appendChild(li);
  });
}

// Function to display words, related documents, and related topics on the page
function displayRelatedInfo(info) {
  info.words.forEach(word => {
    const li = document.createElement("li");
    li.textContent = word;
    wordList.appendChild(li);
  });
  info.documents.forEach(doc => {
    const li = document.createElement("li");
    li.textContent = doc.title;
    docList.appendChild(li);
  });
  info.topics.forEach(topic => {
    const li = document.createElement("li");
    li.textContent = topic.name;
    topicList.appendChild(li);
  });
}

// Call fetchData function to get data from API
fetchData(apiUrl)
  .then(data => {
    // Display top 3 topics on the page
    displayTopTopics(data.topics);

    // Display words, related documents, and related topics on the page
    displayRelatedInfo(data.relatedInfo);
  })
  .catch(error => console.error(error));

  return (
<body>
  <main>
    <section class="top-topics">
      {/* <h1>Top 3 Topics {topic 1, topic 2, topic 3} </h1> */}
    </section>
    <section class="related-info">
      <div class="word-info">
        <h2>Words</h2>
        <ul>
          <li>Word 1</li>
          <li>Word 2</li>
          <li>Word 3</li>
        </ul>
      </div>
      <div class="doc-info">
        <h2>Related Documents</h2>
        <ul>
          <li>Document 1</li>
          <li>Document 2</li>
          <li>Document 3</li>
        </ul>
      </div>
      <div class="topic-info">
        <h2>Related Topics</h2>
        <ul>
          <li>Topic 1</li>
          <li>Topic 2</li>
          <li>Topic 3</li>
        </ul>
      </div>
    </section>
  </main>
  <footer>
    {/* <!-- Footer content --> */}
  </footer>
  <script src="script.js"></script>
</body>
  )

}

export default TopicPage;


