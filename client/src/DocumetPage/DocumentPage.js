import React from "react";
import "./DocumentPage.css"

function DocumentPage() {
  const heatmapData = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
  const documentText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
  const relatedDocuments = ["Document 1", "Document 2", "Document 3"];
  
  // Add code to display the heatmap here
  // Add code to display the document text here
  
  const relatedDocumentsList = document.querySelector('.related-documents ul');
  
  // for (let i = 0; i < relatedDocuments.length; i++) {
  //   const li = document

  return(

<main>
  <div class="heatmap">
    <h2>Heatmap</h2>
    {/* <!-- Add the code to display the heatmap here --> */}
  </div>

  <div class="document-text">
    <h2>Document Text</h2>
    <p>Understanding and navigating large collections of docu- ments has become an important activity in many spheres. However, many document collections are not coherently or- ganized and organizing them by hand is impractical. We need automated ways to discover and visualize the structure of a collection in order to more easily explore its contents.
Probabilistic topic modeling is a set of machine learning tools that may provide a solution (Blei and Lafferty 2009). Topic modeling algorithms discover a hidden thematic struc- ture in a collection of documents; they find salient themes and represent each document as a combination of themes.
However, topic models are high-level statistical tools. A user must scrutinize numerical distributions to understand and explore their results; the raw output of the model is not enough to create an easily explored corpus.</p>
    {/* <!-- Add the code to display the document text here --> */}
  </div>
  <div class="related-topics">
    <h2>Related Topics</h2>
    <ul>
      <li><a href="#">Topic 1</a></li>
      <li><a href="#">Topic 2</a></li>
      <li><a href="#">Topic 3</a></li>
      {/* <!-- Add more related topics here --> */}
    </ul>
  </div>
  <div class="related-documents">
    <h2>Related Documents</h2>
    <ul>
      <li><a href="#">Document 1</a></li>
      <li><a href="#">Document 2</a></li>
      <li><a href="#">Document 3</a></li>
      {/* <!-- Add more related documents here --> */}
    </ul>
  </div>
</main>
  ) 
}

export default DocumentPage;