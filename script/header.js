
function displayHeader() {

    const header = document.querySelector('header');
    header.innerHTML =
        `
                <h1>Sylvain Zoogones - JS OMDB</h1>   
            `
};

document.addEventListener('DOMContentLoaded', () => {

    displayHeader();
});