document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('/favourites');
    const data = await response.json();
    const favouritesDiv = document.getElementById('favourites');
    favouritesDiv.innerHTML = '';
    data.forEach(favourite => {
        const card = document.createElement('div');
        card.className = 'col-md-4';
        card.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${favourite.author}</h5>
                    <p class="card-text">${favourite.quote}</p>
                </div>
            </div>
        `;
        favouritesDiv.appendChild(card);
    });
});
