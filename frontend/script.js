document.getElementById('searchForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const query = document.getElementById('searchInput').value;
    const response = await fetch(`https://api.quotable.io/quotes?query=${query}`);
    const data = await response.json();
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    data.results.forEach(quote => {
        const card = document.createElement('div');
        card.className = 'col-md-4';
        card.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${quote.author}</h5>
                    <p class="card-text">${quote.content}</p>
                    <button class="btn btn-success favourite-btn">Favourite</button>
                </div>
            </div>
        `;
        card.querySelector('.favourite-btn').addEventListener('click', async () => {
            await fetch('/favourite', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ quote: quote.content, author: quote.author })
            });
        });
        resultsDiv.appendChild(card);
    });
});
