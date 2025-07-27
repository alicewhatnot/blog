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

        // Dynamically set the document title
        document.title = `Mike Gillbanks - ${postInfo.title}`;
        
        const page = `
        <img src="${postInfo.image}" alt="${postInfo.title}">
        <div class="color-stripe stripe-${postInfo.colour}"></div>
        <div class="container">
            <div class="article-content">
                <h1>${postInfo.title}</h1>
                <h3>${postInfo.date}</h3>
                <h2 id="description">${postInfo.description || ''}</h2> <!-- Show description here -->
                <div id="content"></div> <!-- Content from Quill goes here -->
            </div>
        </div>
        `;
        articleContainer.innerHTML += page;

        // Directly set the content and description using Quill's HTML output
        document.getElementById('content').innerHTML = postInfo.content;
        document.getElementById('description').innerHTML = postInfo.description;

      } else {
        console.log("ID does not match.");
      }}

      

displayPost()