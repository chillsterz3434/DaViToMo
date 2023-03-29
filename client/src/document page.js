// Get all the topic links on the page
const topicLinks = document.querySelectorAll('.related-topics a');

// Loop through the topic links and add a click event listener to each one
topicLinks.forEach(topicLink => {
  topicLink.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent the default behavior of clicking on a link
    const topic = event.target.textContent; // Get the text content of the clicked link
    openDocumentPage(topic); // Call the function to open the document page with the selected topic
  });
});

// Function to open the document page with the selected topic
function openDocumentPage(topic) {
  // Get the URL of the document page
  const documentPageUrl = 'document.html';

  // Append the selected topic to the URL as a query parameter
  const urlWithTopic = `${documentPageUrl}?topic=${encodeURIComponent(topic)}`;

  // Redirect the user to the document page with the selected topic
  window.location.href = urlWithTopic;
}
