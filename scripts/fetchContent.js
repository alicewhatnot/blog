// Assuming 'content' contains the URL to your markdown file
fetch(postInfo.content)  // 'content' is the file path/url to your markdown file
    .then(response => response.text())  // Fetch the file and parse as text
    .then(markdownContent => {
        // Convert markdown content to HTML
        const htmlContent = marked(markdownContent);
        // Inject HTML into the #content div
        document.getElementById('content').innerHTML = htmlContent;
    })
    .catch(error => {
        console.error('Error loading markdown:', error);
    });