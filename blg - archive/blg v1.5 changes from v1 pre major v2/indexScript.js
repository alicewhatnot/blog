function filterCards(color) {
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        if (color === 'all') {
            card.classList.remove('hidden');
        } else {
            card.classList.toggle('hidden', !card.classList.contains(color));
        }
    });
}

const setPassword = "test"
function enterPswd() {
    const inputValue = document.getElementById("userPassword").value.trim(); // Gets and trims the input value
    if (inputValue === setPassword) {
        window.location.href = "admin.html";
    }
}

function showPasswordMenu() {
    const menu = document.getElementById("adminPasswordMenu"); // Select the div
    if (menu.style.display === "none" || menu.style.display === "") {
        menu.style.display = "block"; // Show the div
    } else {
        menu.style.display = "none"; // Hide the div
    }
}

