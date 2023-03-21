// import { useEffect, useState } from "react";
import "./ArticleSearch.css";


function ArticleSearch() {



    return (
        
  <body>

    <main>
      <form>
        <input type="text" id="search-input" placeholder="Enter article..." />
        <button type="submit" id="search-btn">Run Script</button>
      </form>
    </main>

    <footer>
      <p>&copy; 2023 Topic Model Search</p>
    </footer>

    <script src="app.js"></script>
  </body>
    )
}
export default ArticleSearch;