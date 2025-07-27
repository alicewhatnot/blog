
document.getElementById('addPostForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const title = document.getElementById('title').value.trim();
    const date = document.getElementById('date').value;
    const description = document.getElementById('description').value.trim();
    const color = document.getElementById('colour').value;
    const image = document.getElementById('image').value.trim();
    const link = document.getElementById('link').value.trim();
    const content = document.getElementById('content').value.trim();
    
    // Retrieve existing posts from localStorage
    const storedData = localStorage.getItem('articles');
    const posts = storedData ? JSON.parse(storedData) : [];
    // Add the new post
    posts.unshift({ title, date, description, content, color, image, link });

    // Save back to localStorage
    localStorage.setItem('articles', JSON.stringify(posts));

    // Send the updated data to the server to save it to articles.json
    fetch('http://localhost:3000/update-articles', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(posts) // Send the data as JSON
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });

    // Optional: Clear the form
    document.getElementById('addPostForm').reset();

    alert('Blog post added successfully!');
});
