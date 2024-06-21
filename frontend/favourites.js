// Wait for the DOM content to be fully loaded before executing the code
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Fetch the list of favourite quotes from the server
        const response = await fetch('/favourites');
        const data = await response.json(); // Parse the JSON response

        const favouritesDiv = document.getElementById('favourites'); // Get the div where favourites will be displayed
        favouritesDiv.innerHTML = ''; // Clear any existing content in the favourites div

        // Iterate over each favourite quote received from the server
        data.forEach(favourite => {
            const card = document.createElement('div'); // Create a new div for each favourite quote
            card.className = 'col-md-4'; // Bootstrap column class for styling

            // Set the inner HTML of the card with the author and quote content
            card.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${favourite.author}</h5>
                        <p class="card-text">${favourite.quote}</p>
                    </div>
                </div>
            `;

            favouritesDiv.appendChild(card); // Append the card to the favourites div
        });
    } catch (error) {
        console.error('Error fetching favourites:', error); // Log any errors that occur during fetch
    }
});
