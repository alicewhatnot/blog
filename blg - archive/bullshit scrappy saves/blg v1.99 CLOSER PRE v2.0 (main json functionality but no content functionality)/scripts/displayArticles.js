function displayBlogPosts() {
    const articlesContainer = document.querySelector('.articles');
    const storedData = localStorage.getItem('articles');

    if (storedData) {
        const posts = JSON.parse(storedData);

        posts.forEach(post => {
            const card = `
                <div class="card stripe-${post.colour}" onclick="window.location.href='${post.link}'">
                    <img src="${post.image}" alt="${post.title}">
                    <div class="colour-stripe"></div>
                    <div class="card-content">
                        <h1>${post.title}</h1>
                        <h2>${post.date}</h2>
                        <p>${post.description}</p>
                    </div>
                </div>
            `;
            articlesContainer.innerHTML += card;
        });
    } else {
        articlesContainer.innerHTML = '<p>No posts found!</p>';
    }
}

displayBlogPosts()