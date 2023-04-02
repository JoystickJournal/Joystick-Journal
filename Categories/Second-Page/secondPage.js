const cardContainer2 = document.querySelector('#cardContainer2')
const cardContainer3 = document.querySelector('#cardContainer3')

let genreName = localStorage.getItem('genreName').toLowerCase();

let moreInfoIcon = document.createElement('div')

moreInfoIcon.innerHTML = `<i class="fa-solid fa-chevron-down" style="color: #ffffff;"></i>`

let countID = 0

let collapseID = 0

let pageCounter = 1

let isFetchingData = false;

// console.log(genreName)

const addToWishlist = (name, image) => {
  const wishlist = JSON.parse(localStorage.getItem('wishListData')) || [];
  wishlist.push({ name, image });
  // console.log(wishlist)
  localStorage.setItem('wishListData', JSON.stringify(wishlist));
  style.backgroundColor = 'green'
};

if(genreName == 'board games') {
  genreName = 'board-games'
}
if(genreName == 'rpg') {
  genreName = 'role-playing-games-rpg'
}

const fetchGameData = async (id) => {
  const cacheKey = `game-${id}`;
  const cachedData = localStorage.getItem(cacheKey);

  if (cachedData) {
    // console.log(`Using cached data for game ${id}`);
    return JSON.parse(cachedData);
  }

  const response = await fetch(`https://api.rawg.io/api/games/${id}?key=${config.api}`);
  const data = await response.json();

  localStorage.setItem(cacheKey, JSON.stringify(data));

  // console.log(data);

  return data;
};

const renderCard = async (game,count) => {
  const { name, background_image, id, parent_platforms, metacritic, released, genres  } = game;

  let str = parent_platforms.map(elem => {
     if(elem.platform.name == 'Xbox') {
      return `<i class="fa-brands fa-xbox" style="color: #ffffff; margin:0 0.25em;"></i>`
    }
    else if(elem.platform.name == 'PlayStation') {
      return `<i class="fa-brands fa-playstation" style="color: #ffffff; margin:0 0.25em;"></i>`
    }
    else if(elem.platform.name == 'PC') {
      return `<i class="fa-brands fa-windows" style="color: #ffffff; margin:0 0.25em;"></i>`
    }
    else if(elem.platform.name == 'Linux') {
      return `<i class="fa-brands fa-linux" style="color: #ffffff; margin:0 0.25em;"></i>`
    } 
  })



const dateString = released;
const date = new Date(dateString);
const options = { month: "short", day: "numeric", year: "numeric" };
const formattedDate = date.toLocaleDateString("en-US", options);

  const card = document.createElement('div');
  const platforms = document.createElement('p')
  platforms.innerHTML = str.join('');
  const expandableContent = document.createElement('div');
  expandableContent.classList.add('expandable-content');
  expandableContent.innerHTML = `
    <div class="release-date">${formattedDate}</div>
    <div class="genres">${genres.map(genre => genre.name).join(', ')}</div>
  `;

  const expandableDescription = document.createElement('div');

card.append(moreInfoIcon)


const cardContainers = [
  { container: cardContainer2, count: cardContainer2.querySelectorAll('.card').length },
  { container: cardContainer3, count: cardContainer3.querySelectorAll('.card').length },
  { container: document.querySelector('#cardContainer4'), count: document.querySelector('#cardContainer4').querySelectorAll('.card').length },
  { container: document.querySelector('#cardContainer5'), count: document.querySelector('#cardContainer5').querySelectorAll('.card').length }
];

const containerWithFewestCards = cardContainers.reduce((prev, curr) => {
  return prev.count < curr.count ? prev : curr;
});

containerWithFewestCards.container.append(card);

expandableDescription.setAttribute('class', 'descriptionBox')
const text = document.createElement('p');
const platArr = parent_platforms.map((platform) =>  platform.platform.name)
text.innerText = 'Compatability: ' + platArr.join(', ')
const metaText = document.createElement('p');
metaText.innerText = 'Metacritic: ' + metacritic + '/100'
const release = document.createElement('p');
release.innerText = 'Release Date: ' + formattedDate
const genreText = document.createElement('p');
genreText.innerText = 'Genres: ' + genres.map((genre) =>  genre.name).join(', ');
expandableDescription.append(genreText);
expandableDescription.append(release);
expandableDescription.append(text);
expandableDescription. append(metaText);
expandableDescription.style.width="auto"
card.append(expandableDescription);

let strExpansion = expandableDescription.outerHTML

card.outerHTML = `
<div class="card bg-dark" style="height:auto;width:18em">
<img src="${background_image}" class="card-img-top border-bottom border-3" alt="...">
<div class="card-body text-light">
<div class="d-flex justify-content-between align-center mb-3">
<p class="mb-0 h-auto text-center">${platforms.innerHTML}</p>
<button onclick="addToWishlist('${name}', '${background_image}')" id="wishListbtn" class="btn btn-outline-light btn-sm"><i class="fa-solid fa-plus"></i> &nbsp; Wishlist</button>
</div>
<h3>${name}</h3>
<div class="expandable">
<p>More info</p>
<i class="fa-solid fa-angle-down" id="arrowIcon" style="color: #ffffff;" data-bs-toggle="collapse" data-bs-target="#${collapseID}" aria-expanded="false" aria-controls="collapseExample"></i>
</div>
<div class="collapse" id="${collapseID}">
${strExpansion}
</div>
</div>
</div>
`;

const wishListButton = document.querySelectorAll('#wishListbtn');
wishListButton.forEach(button => {
  button.addEventListener('click', (e) =>{
    e.target.style.backgroundColor = 'green'
  })
})

collapseID+=1

  const gameData = await fetchGameData(id);
  const { description } = gameData;
  {/* card.querySelector('.card-text').innerHTML = description; */}
};

fetch(`https://api.rawg.io/api/games?genres=${genreName}&key=` + config.api)
  .then(response => response.json())
  .then(data => {
    // console.log(data);
    data.results.forEach((elem,index) => {
      renderCard(elem,index)
    });
  });

  document.querySelector('#searchBar').addEventListener('click',(e)=> {
    e.preventDefault()

    handleSearchBar(true,countID);
  })

  window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  
    if (scrollTop + clientHeight >= scrollHeight - 5) {
      pageCounter+=1
      fetch(`https://api.rawg.io/api/games?genres=${genreName}&key=` + config.api + '&page=' + pageCounter)
  .then(response => response.json())
  .then(data => {
    // console.log(data);

    data.results.forEach((elem,index) => {
      renderCard(elem,index)
    });
    window.removeEventListener('scroll', scrollListener);
  });
    }
  });

  document.addEventListener('click', function(event) {
    // Check if the clicked element matches the selector for the i element
    if (event.target.matches('.fa-angle-down, .fa-angle-up')) {
      // Toggle the classes on the clicked element
      event.target.classList.toggle('fa-angle-down');
      event.target.classList.toggle('fa-angle-up');
    }
  });

  window.addEventListener('scroll', scrollListener);


