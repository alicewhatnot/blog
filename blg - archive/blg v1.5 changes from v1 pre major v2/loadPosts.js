const articlesContainer = document.querySelector('.articles');

    // Load posts from localStorage
    const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];

    // Render posts dynamically
    posts.forEach(post => {
        const card = `
            <div class="card stripe-${post.color}" onclick="window.location.href='${post.link}'">
                <img src="${post.image}" alt="${post.title}">
                <div class="color-stripe"></div>
                <div class="card-content">
                    <h1>${post.title}</h1>
                    <h2>${post.date}</h2>
                    <p>${post.summary}</p>
                </div>
            </div>
        `;
        articlesContainer.innerHTML += card;
    });