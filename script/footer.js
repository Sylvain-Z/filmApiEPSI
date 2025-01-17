
function displayFooter() {

    const header = document.querySelector('footer');
    header.innerHTML =
        `
                <p>© 2025 Sylvain Zoogones - EPSI</p>
                <p><a href="https://www.omdbapi.com/">OMDB API</a></p>
            `
};

document.addEventListener('DOMContentLoaded', () => {

    displayFooter();
});