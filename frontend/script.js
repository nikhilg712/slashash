// Add an event listener to the search form to handle form submission
document.getElementById('searchForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    const query = document.getElementById('searchInput').value; // Get the value of the search input

    // Check if the query is empty and alert the user if it is
    if (!query) {
        alert('Please enter a keyword to search');
        return; // Exit the function if the query is empty
    }

    try {
        // Make a request to the Quotable API with the search query
        const response = await fetch(`https://api.quotable.io/quotes?query=${query}`);
        const data = await response.json(); // Parse the JSON response from the API
        const resultsDiv = document.getElementById('results'); // Get the results div to display the quotes
        resultsDiv.innerHTML = ''; // Clear any previous results

        // Check if no quotes were found and display a message if true
        if (data.results.length === 0) {
            resultsDiv.innerHTML = '<p>No quotes found. Please try a different keyword.</p>';
            return; // Exit the function if no quotes were found
        }

        // Iterate over the list of quotes and create a card for each quote
        data.results.forEach(quote => {
            const card = document.createElement('div'); // Create a new div for the card
            card.className = 'col-md-4'; // Add a Bootstrap class for column layout
            card.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${quote.author}</h5>
                        <p class="card-text">${quote.content}</p>
                        <button class="btn btn-success favourite-btn">Favourite</button>
                    </div>
                </div>
            `; // Set the inner HTML of the card with the quote content and author

            // Add an event listener to the favourite button to handle saving the quote
            card.querySelector('.favourite-btn').addEventListener('click', async () => {
                try {
                    // Make a POST request to the server to save the favourite quote
                    const favouriteResponse = await fetch('/favourite', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ quote: quote.content, author: quote.author }) // Send the quote and author as JSON
                    });

                    // Check if the response is OK and alert the user
                    if (favouriteResponse.ok) {
                        alert('Favourite saved!');
                    } else {
                        alert('Failed to save favourite');
                    }
                } catch (error) {
                    console.error('Error saving favourite:', error); // Log any errors that occur
                }
            });

            // Append the card to the results div
            resultsDiv.appendChild(card);
        });
    } catch (error) {
        console.error('Error fetching quotes:', error); // Log any errors that occur during the fetch
    }
});
