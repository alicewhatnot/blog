function displayPost() {
    const articleContainer = document.querySelector('.article');

    const storedId = localStorage.getItem('articleId');
    const numericStoredId = Number(storedId);  // Convert storedId to a number

    const storedData = localStorage.getItem('articles');
    const posts = JSON.parse(storedData);

    const post = posts.find(post => post.Id === numericStoredId);

    if (post) {
        // Exclude the Id and get the rest of the post information
        const { Id, ...postInfo } = post;
        
        const page = `
        <img src="${postInfo.image}" alt="${postInfo.title}">
        <div class="color-stripe stripe-${postInfo.colour}"></div>
        <div class="container">
            <div class="article-content">
                <h1>${postInfo.title}</h1>h1>
                <h3>${postInfo.date}</h3>
                <h2>${postInfo.description}</h2>
                <div id="content"></div>
            </div>
        </div>
        `;
        articleContainer.innerHTML += page;

        document.getElementById('content').innerHTML = marked.parse(postInfo.content);
      
      } else {
        console.log("ID does not match.");
      }}

displayPost()