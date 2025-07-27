// Function to fetch JSON data and save it to localStorage
async function loadJSONtoLocalStorage() {
    try {
        const response = await fetch('articles.json'); 
        if (!response.ok) {
            throw new Error('Failed to load JSON');
        }

        const jsonData = await response.json(); // Parse JSON into JavaScript object
        localStorage.setItem('articles', JSON.stringify(jsonData)); // Save to localStorage
        console.log('JSON data loaded into localStorage:', jsonData);

    } catch (error) {
        console.error('Error loading JSON:', error);
    }
}

function displayBlogPosts() {
    const articlesContainer = document.querySelector('.articles');
    const storedData = localStorage.getItem('articles');

    if (storedData) {
        const posts = JSON.parse(storedData);

        posts.forEach(post => {
            const card = `
                <div class="card stripe-${post.colour}" onclick="handleCardClick(${post.Id})">
                    <img src="${post.image}" alt="${post.title || 'No Title'}">
                    <div class="colour-stripe"></div>
                    <div class="card-content">
                        <h1>${post.title || 'Untitled Post'}</h1>
                        <h2>${post.date || 'Unknown Date'}</h2>
                        <p>${post.description || 'No description available.'}</p>
                    </div>
                </div>
            `;
            articlesContainer.insertAdjacentHTML('beforeend', card);
        });
    } else {
        articlesContainer.innerHTML = '<p>No posts found!</p>';
    }
}

function handleCardClick(postId) {
    passToArticle(postId);
  
    // Navigate to the target URL
    window.location.href = '/article.html';
}

function passToArticle(Id) {
    localStorage.setItem("articleId", String(Id));
}

// Ensure JSON is loaded before displaying posts
async function init() {
    await loadJSONtoLocalStorage(); // Wait for JSON to load
    displayBlogPosts(); // Now display posts
}

document.addEventListener('DOMContentLoaded', init);