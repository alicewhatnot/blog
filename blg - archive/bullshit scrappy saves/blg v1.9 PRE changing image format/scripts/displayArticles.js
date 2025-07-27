function displayBlogPosts() {
    const articlesContainer = document.querySelector('.articles');
    const storedData = localStorage.getItem('articles');

    if (storedData) {
        const posts = JSON.parse(storedData);

        posts.forEach(post => {
            const card = `
                <div class="card stripe-${post.colour}" onclick="handleCardClick(${post.Id})">
                    <img src="${post.image || '/default-image.jpg'}" alt="${post.title || 'No Title'}">
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
    // Perform the desired action, such as saving the post ID
    passToArticle(postId);
  
    // Navigate to the target URL
    window.location.href = '/articleTemplate.html';
}

function passToArticle(Id) {
    localStorage.setItem("articleId", String(Id));
}

document.addEventListener('DOMContentLoaded', displayBlogPosts);

