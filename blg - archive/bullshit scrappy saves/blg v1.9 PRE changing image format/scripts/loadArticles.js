// Function to fetch JSON data and save it to localStorage
async function loadJSONtoLocalStorage() {
    try {
        const response = await fetch('articles.json'); // Adjust path as needed
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

// Call the function to load data on script execution
loadJSONtoLocalStorage();