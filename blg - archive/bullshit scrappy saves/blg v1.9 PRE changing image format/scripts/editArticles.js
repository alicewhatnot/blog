
document.getElementById('addPostForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const title = document.getElementById('title').value.trim();
    const date = document.getElementById('date').value;
    const description = document.getElementById('description').value.trim();
    const colour = document.getElementById('colour').value;
    const content = document.getElementById('content').value.trim();

    const imageFile = document.getElementById(image).file;
    fetch('http://localhost:3000/update-articles', {
        method: 'POST',
        
        body: imageFile // Send the data as JSON
    })

    // Retrieve existing posts from localStorage
    const storedData = localStorage.getItem('articles');
    const posts = storedData ? JSON.parse(storedData) : [];

    const lastId = posts.length > 0 ? posts[0].Id : 0;
    const Id = lastId + 1
    // Add the new post
    posts.unshift({Id, title, date, description, colour, image, content});

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
