const form = document.getElementById('addPostForm');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form values
    const post = {
        title: document.getElementById('title').value,
        date: document.getElementById('date').value,
        description: document.getElementById('description').value,
        contents: document.getElementById('content').value,
        image: document.getElementById('image').value,
        color: document.getElementById('color').value,
        link: "Mike Gillbanks - " + document.getElementById('title').value,
    };

    // Save post to localStorage
    const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
    posts.push(post);
    localStorage.setItem('blogPosts', JSON.stringify(posts));

    alert('Post added successfully!');
    form.reset(); // Clear the form
});