document.addEventListener('DOMContentLoaded',function(){
    document.querySelectorAll('#cardButton').forEach(elem => {
    console.log(elem)
    elem.setAttribute('data-bs-toggle','modal')
    elem.setAttribute('data-bs-target','#exampleModal')
})
}
)

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
      const url = `https://api.rawg.io/api/games/${gameId}`;
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