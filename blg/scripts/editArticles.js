// Initialize Quill editors for description and content
document.addEventListener("DOMContentLoaded", function() {

    var contentEditor = new Quill('#content-editor', {
        theme: 'snow',
        placeholder: 'Enter post content here...',
        modules: {
            toolbar: [['bold', 'italic', 'underline'], [{ 'list': 'ordered' }, { 'list': 'bullet' }], ['link']]
        }
    });

    // Form submission handler
    document.getElementById('addPostForm').addEventListener('submit', async function (event) {
        event.preventDefault();

        const title = document.getElementById('title').value.trim();
        const date = document.getElementById('date').value;
        const description = document.getElementById('description').value.trim();
        const content = contentEditor.root.innerHTML.trim();  // Get content from Quill editor
        const colour = document.getElementById('colour').value;

        // Determine if running locally or online
        const apiBaseUrl = window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost"
            ? "http://localhost:3000"  // Local API
            : "https://mikegillbanks.co.uk"; // Live API

        // Retrieve existing posts from localStorage
        const storedData = localStorage.getItem('articles');
        const posts = storedData ? JSON.parse(storedData) : [];

        const lastId = posts.length > 0 ? posts[0].Id : 0;
        const Id = lastId + 1;

        const imageFile = document.getElementById("image").files[0];
        const fileExt = imageFile.name.split('.').pop();
        const image = `/images/blogImage${Id}.${fileExt}`;

        const formData = new FormData();
        formData.append('image', imageFile); // Append the file to the FormData

        try {
            // Upload image first
            const uploadResponse = await fetch(`${apiBaseUrl}/api/upload-image`, {
                method: 'POST',
                body: formData
            });

            if (!uploadResponse.ok) {
                throw new Error('Image upload failed');
            }

            console.log('Image uploaded successfully');

            // Add the new post after image upload succeeds
            posts.unshift({ Id, title, date, description, image, colour, content });

            // Send the updated articles list to the server
            const updateResponse = await fetch(`${apiBaseUrl}/api/update-articles`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(posts)
            });

            if (!updateResponse.ok) {
                throw new Error('Failed to update articles.json');
            }

            // Save to localStorage only after a successful update
            localStorage.setItem('articles', JSON.stringify(posts));

            console.log('Articles updated successfully');
            alert('Blog post added successfully!');

            // Clear the form
            document.getElementById('addPostForm').reset();
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while adding the blog post.');
        }

        // Optional: Clear the form
        document.getElementById('addPostForm').reset();
    });
});