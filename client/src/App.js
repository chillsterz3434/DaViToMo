// import './App.css';
// import React from "react";

// function App() {
//   const [data, setData] = React.useState(null);


//   //function to get the data from the server
//   React.useEffect(() => {
//     fetch("/api")
//       .then((res) => res.json())
//       .then((data) => setData(data.script.dataToSend));
//   }, []);

//   const [title, setTitle] = React.useState('');

//   //function to send user input to the server
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const userInput = { title };
    
//     fetch('/api', {
//       headers: {"Conted-Type": "application/json"},
//       body: JSON.stringify(userInput)
//     });
//   }


//   return (
//     <div className="App">
//       <header className="App-header">
//         <p>
//           {!data ? "Loading..." : data}
//         </p>
//         {/* Article Selection
//         <form onSubmit={handleSubmit}>
//         <label>Enter an article:</label>
//         <input
//           type="text"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           />
//           <button>Run script</button>
//       </form> */}
//       </header>
      
//     </div>

//   );
// }

// export default App;

document.getElementById("search-button").addEventListener("click", function() {
  var searchValue = document.getElementById("search-input").value;
  // Call API to retrieve related articles
  fetch("/api/related-articles?search=" + searchValue)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      // Display related articles
      var relatedArticles = document.getElementById("related-articles");
      relatedArticles.innerHTML = "";
      for (var i = 0; i < data.length; i++) {
        var article = document.createElement("div");
        article.className = "article";
        article.innerHTML = "<a href='" + data[i].url + "'>" + data[i].title + "</a>";
        relatedArticles.appendChild(article);
      }
    })
    .catch(function(error) {
      console.log(error);
    });
});
const form = document.querySelector('form');
const searchInput = document.querySelector('#search-input');
const searchResults = document.querySelector('#search-results');

form.addEventListener('submit', (e) => {
	e.preventDefault();
	const searchTerm = searchInput.value;
	getSearchResults(searchTerm);
});

function getSearchResults(searchTerm) {
	// Here you can implement your logic to get the search results based on the searchTerm
