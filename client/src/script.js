const heatmapData = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
const documentText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
const relatedDocuments = ["Document 1", "Document 2", "Document 3"];

// Add code to display the heatmap here
// Add code to display the document text here

const relatedDocumentsList = document.querySelector('.related-documents ul');

for (let i = 0; i < relatedDocuments.length; i++) {
  const li = document
