const cardContainer2 = document.querySelector('section')

const genreName = localStorage.getItem('genreName').toLowerCase();

let countID = 0

console.log(genreName)


const fetchGameData = async (id) => {
  const cacheKey = `game-${id}`;
  const cachedData = localStorage.getItem(cacheKey);

  if (cachedData) {
    console.log(`Using cached data for game ${id}`);
    return JSON.parse(cachedData);
  }

  const response = await fetch(`https://api.rawg.io/api/games/${id}?key=${config.api}`);
  const data = await response.json();

  localStorage.setItem(cacheKey, JSON.stringify(data));

  console.log(`Fetched data for game ${id}`);

  return data;
};

const renderCard = async (game) => {
  const { name, background_image, id } = game;

  const card = document.createElement('div');
  card.innerHTML = `<div class="card mb-3">
  <img src="${background_image}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${name}</h5>
    <p class="card-text">${game.description || 'Loading...'}</p>
  </div>
</div>`;


  cardContainer2.append(card);

  const gameData = await fetchGameData(id);
  const { description } = gameData;
  card.querySelector('.card-text').innerHTML = description;
};

fetch(`https://api.rawg.io/api/games?genres=${genreName}&key=` + config.api)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    data.results.forEach(renderCard);
  });

  document.querySelector('#searchBar').addEventListener('click',(e)=> {
    e.preventDefault()

    handleSearchBar(true,countID);
  })