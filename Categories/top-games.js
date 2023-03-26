const modalBody =document.querySelector('#advanced')
const modal2 = document.querySelector('#advancedModal')

const modal1 = document.querySelector('#exampleModal')



let count = 10


function showModal1() {
  modal1.classList.add("show");
}

function hideModal1() {
  modal1.classList.remove("show");
}

function showModal2() {
  modal2.classList.add("show");
}

function hideModal2() {
  modal2.classList.remove("show");
}



// Define a function to make the API request and cache the data in local storage
function fetchGame(gameId) {
    // Check if the game is already stored in the local storage
    const cachedGames = JSON.parse(localStorage.getItem('games')) || {};
    if (cachedGames[gameId]) {
      // If the game is already stored in the local storage, return it
      console.log(`Retrieving game ${gameId} from cache`);
      return Promise.resolve(cachedGames[gameId]);
    } else {
      // If the game is not stored in the local storage, make the API request
      const url = `https://api.rawg.io/api/games/${gameId}?key=` + config.api;
      return fetch(url)
        .then(response => response.json())
        .then(game => {
          // Store the game in the local storage
          console.log(`Caching game ${gameId} in local storage`);
          cachedGames[gameId] = game;
          localStorage.setItem('games', JSON.stringify(cachedGames));
          // Return the game data
          return game;
        });
    }
  }

  function searchGames(query, cacheTime = 300000) {
    const cachedSearches = JSON.parse(localStorage.getItem('searches')) || {};
    const cachedResult = cachedSearches[query];
    const now = new Date().getTime();
    
    if (cachedResult && (now - cachedResult.timestamp) < cacheTime) {
      // Return the cached search results
      console.log(`Retrieving search results for "${query}" from cache`);
      return Promise.resolve(cachedResult.games);
    } else {
      // Make the API request and cache the search results
      const url = `https://api.rawg.io/api/games?key=${config.api}&search=${query}`;
      return fetch(url)
        .then(response => response.json())
        .then(data => {
          const games = data.results;
          console.log(games)
          console.log(`Caching search results for "${query}" in local storage`);
          cachedSearches[query] = { games, timestamp: now };
          localStorage.setItem('searches', JSON.stringify(cachedSearches));
          return games;
        })
        .catch(error => console.error(error));
    }
  }
  
  // Call the fetchGame function to make the API request and get the game data
  fetchGame(3498).then(game => {
    console.log(`Game ${game.id}: ${game.name}`);
    // Do something with the game data
  });
  
  fetchGame(3328).then(game => {
    console.log(`Game ${game.id}: ${game.name}`);
    // Do something with the game data
  });
  
  fetchGame(4200).then(game => {
    console.log(`Game ${game.id}: ${game.name}`);
    // Do something with the game data
  });
  
  console.log(localStorage.getItem('games'));

  //Search Bar

// Search Bar

function handleSearchBar(visible) {
  const body = document.querySelector('.list');
  const input = document.querySelector('input').value;
  
    body.innerHTML = '';

  searchGames(input).then((data) => {
    data.forEach((elem) => {
      const listElement = document.createElement('li');
      listElement.style.display = 'flex';
      listElement.style.justifyContent = 'center';
      listElement.innerHTML = `<div class="mb-5 mx-5 h-100 w-100">
        <div class="card h-100 w-100">
          <!-- Product details-->
          <div class="card-body " style="z-index: 1;">
            <div class="text-center">
              <!-- Product name-->
              <h5 class="fw-bolder text-light">${elem.name}</h5>
              <!-- Product price-->
            </div>
          </div>
          <!-- Product actions-->
          <div class="card-footer pt-0 border-top-0 bg-transparent" style="z-index: 1;">
            <div class="text-center mt-5"><a class="btn btn-dark mt-auto" data-bs-toggle="collapse" href="#collapseExample${count}" role="button" aria-expanded="false" aria-controls="collapseExample"><p class="text-light my-0">Definition</p></a></div>
            <div class="collapse text-center"  id="collapseExample${count}"  style="z-index: 1;">
              <p class="card-text fw-bold text-dark"></p>
              <a href="#" id="cardButton${count}" class="btn btn-primary">View More</a>
            </div>
          </div>
          <!-- Product image-->
          <div class="card-img-overlay" style="background-image: url('${elem.background_image}'); opacity: 1; pointer-events: none; background-size: cover;"></div>
        </div>
      </div>`;

      body.append(listElement);

      if (visible) {
        document
          .querySelector('#cardButton' + count)
          .addEventListener('click', () => {

            const title = document.createElement('h2');
            title.textContent = elem.name;

            const rating = document.createElement('p');
            rating.textContent = `Rating: ${elem.rating}`;

            const description = document.createElement('p');
            description.textContent = elem.description;

            // Clear the modal body and add the game data elements
            modalBody.innerHTML = '';
            modalBody.appendChild(title);
            modalBody.appendChild(rating);
            modalBody.appendChild(description);

            // Show the modal
            showModal2();
            modal2.querySelector('.btn-close').addEventListener('click',function() {
              showModal1()
              hideModal2()
            })
          });
      }

      count += 1;
    });
  });
}

document.getElementById('searchBar').addEventListener('click', (e) => {
  e.preventDefault();

  handleSearchBar(true);
});

handleSearchBar(false);

// View more buttons
const viewMoreButtons = document.querySelectorAll('.btn-primary');

// Search bar
const searchBar = document.getElementById('searchBar');

// Function to fetch game data and display modal
const displayGameDetails = async (gameId) => {
  try {
    // Fetch data for the selected game
    const response = await fetch(`https://api.rawg.io/api/games/${gameId}?key=${config.api}`);
    const data = await response.json();

    // Create elements to display the game data
    const title = document.createElement('h2');
    title.textContent = data.name;

    const rating = document.createElement('p');
    rating.textContent = `Rating: ${data.rating}`;

    const description = document.createElement('p');
    description.textContent = data.description;

    // Clear the modal body and add the game data elements
    modalBody.innerHTML = '';
    modalBody.appendChild(title);
    modalBody.appendChild(rating);
    modalBody.appendChild(description);

    // Show the modal
    showModal2();
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// Event listener for view more buttons
viewMoreButtons.forEach((button) => {
  button.addEventListener('click', async (e) => {
    e.preventDefault();
    console.log('hello')
    // Disable search bar functionality
    searchBar.removeEventListener('click', searchHandler);

    // Get game ID from button ID
    const gameId = button.id.slice(10);

    // Display game details in modal
    await displayGameDetails(gameId);

    // Re-enable search bar functionality when modal is closed
    modal.addEventListener('hidden.bs.modal', () => {
      searchBar.addEventListener('click', searchHandler);
    });
  });
});
  

  const genresContainer = document.querySelector('#genres');
  const gameDataContainer = document.querySelector('#game-data');
  
 // Fetch genres from the RAWG API and display them
fetch('https://api.rawg.io/api/genres?key=' + config.api)
.then(response => response.json())
.then(data => {
  data.results.forEach(genre => {
    // Create a new element for the genre card
    const card = document.createElement('div');
    card.classList.add('card', 'mb-5'); // Add 'mb-5' class for margin
    card.style.backgroundImage = `url(${genre.image_background})`;
    card.style.backgroundPosition = "center"
    card.style.backgroundSize= "cover"
    card.style.backgroundRepeat ="no-repeat"
    card.style.width="300px"
    card.style.height="300px"

    card.setAttribute('id', 'hoverCard')

    // Create the card body
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');


    // Create the card title
    const cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-title', 'text-light', 'fw-bolder');
    cardTitle.textContent = genre.name;
    cardBody.appendChild(cardTitle);
    cardBody.style.display="flex"
    cardBody.style.justifyContent="center"

    // Add the card body to the card
    card.appendChild(cardBody);
    console.log(genre.name)
    // Add event listener to each genre card
// Add event listener to each genre card
card.addEventListener('click', () => {
  localStorage.setItem('genreName', genre.name);
  card.style.width="100%"
  card.style.height="100%"
  // Check if game data is already in local storage
  const cachedGameData = JSON.parse(localStorage.getItem(genre.slug));
  if (cachedGameData) {
    // Display game data from local storage
    window.location.href= "Second-page/second-page.html"

    displayGameData(cachedGameData);
  } else {
    // Fetch game data for the selected genre
    fetch(`https://api.rawg.io/api/games?genres=${genre.slug}&ordering=-rating&key=` + config.api)
      .then(response => response.json())
      .then(data => {
        // Cache game data in local storage
        localStorage.setItem(genre.slug, JSON.stringify(data.results));
        window.location.href= "Second-page/second-page.html"

        // Display game data
        displayGameData(data.results);

        // Add the "expanded" class to the game data container after displaying the data
        gameDataContainer.classList.add('w-100'); // Change class to w-100
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

});
    


    // Add the genre card to the container
    const col = document.createElement('div');
    col.style.width="auto"
    col.appendChild(card); // Remove 'col' class from parent element
    col.addEventListener('click', function(){

    })
    genresContainer.appendChild(card);
  });
})
.catch(error => {
  console.error('Error fetching data:', error);
});

  
  // Function to display game data
  function displayGameData(data) {
    // Create an element to display the game data
    const gameData = document.createElement('div');
    gameData.style.width="auto"
    // Add the game data to the element
    data.forEach(game => {
      const p = document.createElement('p');
      p.textContent = game.name;
      p.style.color = "black"
      gameData.appendChild(p);
    });
  
    // Add the game data element to the page
    gameDataContainer.innerHTML = '';
    gameDataContainer.appendChild(gameData);
  
    // Add a class to the game data container to trigger a transition
    gameDataContainer.classList.add('show-game-data');
  }

