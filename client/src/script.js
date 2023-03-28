// Sample code to fetch data from API and display it on the topic page

// Define variables for API URL and DOM elements
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
