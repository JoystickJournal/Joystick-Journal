const overlay = document.getElementById('overlay');

document.querySelector('#closeButton').addEventListener('click', function(){
  var modal = document.querySelector('#advancedModal');
  modal.classList.remove('show');
  modal.style.display = 'none';
  document.querySelector('body').classList.remove('modal-open');
  document.querySelector('.modal-backdrop').remove();
  document.querySelector('body').style.overflow = "visible"
});

document.querySelector('#advancedModal').addEventListener('click', function(event){
  if (event.target === this) {
    var modal = document.querySelector('#advancedModal');
    modal.classList.remove('show');
    modal.style.display = 'none';
    document.querySelector('body').classList.remove('modal-open');
    document.querySelector('.modal-backdrop').remove();
    document.querySelector('body').style.overflow = "visible"
  }
});
var modal = document.querySelector('#advancedModal');

const modalBody =document.querySelector('#advanced')

const displayGameDetails = async (gameId) => {
  try {
    // Fetch data for the selected game
    const response = await fetch(
      `https://api.rawg.io/api/games/${gameId}?key=${config.api}`
    );
    const data = await response.json();
    const genres = data.genres.map((genre) => genre.slug);

    // Create elements to display the game data
    const title = document.createElement("h2");
    title.textContent = data.name;

    const rating = document.createElement("h5");
    rating.textContent = `Rating: ${data.rating}`;

    const div = document.createElement("div");
    div.style.display = "flex";
    div.style.justifyContent = "space-between";
    div.style.alignItems = "space-between";
    div.style.borderBottom = "2px white solid";

    const heart = document.createElement("i");
    heart.innerHTML = `<i class="fa-solid fa-heart" id="Wishlist"></i>`;

    const heartCaption = document.createElement("h5");
    heartCaption.textContent = `Click here to add to wishlist!`;

    const heartAndTextcontainer = document.createElement("div");
    heartAndTextcontainer.append(heart, heartCaption);
    heartAndTextcontainer.setAttribute("id", "heartAndTextcontainer");

    div.append(rating, heartAndTextcontainer);

    const image = document.createElement("img");
    image.src = data.background_image;
    image.style.width = "100%";

    const desc = document.createElement("p");
    desc.style.fontSize = "larger";
    if (data.description) {
      desc.innerHTML = data.description;
    } else {
      desc.textContent = "No description available.";
    }

    const DescriptionAlert = document.createElement("h4");
    DescriptionAlert.textContent = "Description";

    // Add event listener to image element to fetch and play game trailer
    image.addEventListener("mouseover", async (e) => {
      console.log(data);
      const trailerResponse = await fetch(
        `https://api.rawg.io/api/games/${data.slug}/movies?key=${config.api}`
      );
      const trailerData = await trailerResponse.json();
      console.log(trailerData);
      if (trailerData.count > 0) {
        const trailerUrl = trailerData.results[0].data.max;
        const iframe = document.createElement("iframe");
        iframe.src = trailerUrl;
        iframe.width = "100%";
        iframe.height = "500px";
        image.replaceWith(iframe);
        document
          .querySelector("#advancedModal")
          .addEventListener("hide.bs.modal", function () {
            modalBody.innerHTML = "";
          });
      }
    });

    // Add event listener to description element to expand and collapse
    const descButton = document.createElement("button");
    descButton.textContent = "Expand/Collapse";
    descButton.addEventListener("click", (e) => {
      desc.classList.toggle("collapsed");
      if (desc.classList.contains("collapsed")) {
        desc.style.height = "3rem";
        descButton.textContent = "Expand";
      } else {
        desc.style.height = "auto";
        descButton.textContent = "Collapse";
      }
    });
    modalBody.innerHTML = "";
    modalBody.appendChild(title);
    modalBody.appendChild(image);
    modalBody.appendChild(div);
    modalBody.appendChild(DescriptionAlert);
    modalBody.appendChild(desc);
    // Show the modal

    const recommendedGamesResponse = await fetch(
      `https://api.rawg.io/api/games?key=${config.api}&genres=${genres.join(
        ","
      )}&exclude_games=${gameId}&page_size=4`
    );
    const recommendedGamesData = await recommendedGamesResponse.json();
    const filteredRecommendedGames = recommendedGamesData.results.filter(
      (game) => game.id !== data.id
    );
    if (filteredRecommendedGames.length > 0) {
      const recommendedGamesTitle = document.createElement("h3");
      recommendedGamesTitle.style.marginTop ="50px"
      recommendedGamesTitle.textContent = "Recommended Games";
      modalBody.appendChild(recommendedGamesTitle);

      const recommendedGamesDiv = document.createElement("div");
      recommendedGamesDiv.classList.add("recommended-games");


      filteredRecommendedGames.forEach((game,index) => {
        const recommendedGame = document.createElement("div");
        recommendedGame.classList.add("recommended-game");
        recommendedGame.style.marginTop="50px"

        const recommendedGameTitle = document.createElement("h5");
        recommendedGameTitle.textContent = game.name;
        recommendedGame.appendChild(recommendedGameTitle);

        const recommendedGameImage = document.createElement("img");
        recommendedGameImage.style.width = "100%";
        recommendedGameImage.src = game.background_image;
        recommendedGame.appendChild(recommendedGameImage);
        recommendedGameImage.addEventListener("click", function () {
          displayGameDetails(game.id)
        });
        recommendedGameImage.style.cursor = "pointer"

        recommendedGamesDiv.appendChild(recommendedGame);
      });

      modalBody.appendChild(recommendedGamesDiv);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
const modal2 = document.querySelector('#advancedModal')

function showModal2() {
  modal2.classList.add("show");
}
function handleCarouselItemClick(gameId) {
  // call your async function here, passing in the gameId parameter
  displayGameDetails(gameId);
  var modalBackdrop = document.querySelector('.modal-backdrop');
  modal.classList.add('show');
  modal.style.display = 'block';
  var backdrop = document.createElement('div');
  backdrop.classList.add('modal-backdrop', 'fade', 'show');
  document.querySelector('body').appendChild(backdrop);
  document.querySelector('body').classList.add('modal-open');
  document.querySelector('body').style.overflow = "hidden"
}

document.addEventListener("DOMContentLoaded", () => {



const modal1 = document.querySelector('#exampleModal')

const searchBarContainer = document.querySelector('#searchBarContainer1')

const searchBarContainer2 = document.querySelector('#searchBarContainer2')




let counter = 10


function showModal1() {
  modal1.classList.add("show");
}

function hideModal1() {
  modal1.classList.remove("show");
}



function hideModal2() {
  modal2.classList.remove("show");
}



// Define a function to make the API request and cache the data in local storage
function fetchBackgroundImage(gameId) {
  // Check if the game background image is already stored in the local storage
  const cachedBackgroundImages = JSON.parse(localStorage.getItem('backgroundImages')) || {};
  if (cachedBackgroundImages[gameId]) {
    // If the background image is already stored in the local storage, return it
    console.log(`Retrieving background image for game ${gameId} from cache`);
    return Promise.resolve(cachedBackgroundImages[gameId]);
  } else {
    // If the background image is not stored in the local storage, make the API request
    const url = `https://api.rawg.io/api/games/${gameId}?key=` + config.api;
    return fetch(url)
      .then(response => response.json())
      .then(game => {
        // Store the game background image in the local storage
        console.log(`Caching background image for game ${gameId} in local storage`);
        cachedBackgroundImages[gameId] = game.background_image;
        localStorage.setItem('backgroundImages', JSON.stringify(cachedBackgroundImages));
        // Return the game background image
        return game.background_image;
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
  
  

  //Search Bar

// Search Bar

function handleSearchBar(visible,count) {
  const body = document.querySelector('.list');
  const input = document.querySelector('input').value;
  document.querySelector('.modal-title').textContent = `Search Results for: "${input}"`
  searchBarContainer.innerHTML = ''
  searchBarContainer2.innerHTML = ''
  localStorage.setItem('searchResult', JSON.stringify(input))
  searchGames(input).then((data) => {
    data.forEach((elem) => {
      const listElement = document.createElement('div');
      listElement.style.display = 'flex';
      listElement.style.justifyContent = 'center';
      listElement.innerHTML = `<div class="mb-5 mx-5 h-100 w-auto text-light">
      <h5 class="fw-bolder text-light">${elem.name}</h5>
      <div class="card" style="width: 18rem;">
      <img src="${elem.background_image}" class="card-img-top" alt="...">
      <div class="card-body">
      <h5>Tags</h5>
        <p class="card-text">${elem.tags.reduce((acc,curr)=> {
          acc+= curr.name + ', '
          return acc
        },'')}</p>
      </div>
    </div>
        <a href="#" id="cardButton${count}" class="btn btn-outline-light">View More</a>
      </div>`;

      const searchContainers = [
        { container: searchBarContainer, count: searchBarContainer.querySelectorAll('.card').length },
        { container: searchBarContainer2, count: searchBarContainer2.querySelectorAll('.card').length },
      ];
      
      const containerWithFewestCards = searchContainers.reduce((prev, curr) => {
        return prev.count < curr.count ? prev : curr;
      });

      containerWithFewestCards.container.append(listElement);


      if (visible) {
        document
          .querySelector('#cardButton' + count)
          .addEventListener('click', () => {
            displayGameDetails(elem.id)
          });
      }

      count += 1;
    });
  });
}

document.getElementById('searchBar').addEventListener('click', (e) => {
  e.preventDefault();
  overlay.classList.add('show');
  overlay.classList.add('fade-in');
  const input = document.querySelector('input').value;
  localStorage.setItem('searchResult', JSON.stringify(input))
  setTimeout(function(){window.location = 'SearchResults/searchResults.html'},3000)
  handleSearchBar(true,counter);
});

// View more buttons
const viewMoreButtons = document.querySelectorAll('.btn-primary');

// Search bar
const searchBar = document.getElementById('searchBar');

// Function to fetch game data and display modal



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
    card.style.visibility = "hidden"
    
    const title = document.createElement('h2');
    title.textContent = genre.name;
    

    card.classList.add('card', 'mb-5'); // Add 'mb-5' class for margin
    // card.style.backgroundImage = `url(${genre.image_background})`;
    // card.style.backgroundPosition = "center"
    // card.style.backgroundSize= "cover"
    // card.style.backgroundRepeat ="no-repeat"
    card.style.backgroundColor = 'transparent'
    card.style.border = "0"

    card.innerHTML = `
    <div class="card-body my-0 py-0">
    <h5 style = "color:white;-webkit-text-stroke:black;-webkit-text-stroke-width:thin;font-size:2rem;">${genre.name}</h5>
    </div>
    <img src="${genre.image_background}" class="card-img-top img-fluid rounded" alt="..." style="backgroundPosition:center;backgroundSize:cover;backgroundRepeat:no-repeat;height:300px">
 `

    card.setAttribute('id', 'hoverCard')

    card.addEventListener('mouseover',function() {
      card.style.cursor ='pointer'
    })

    console.log(genre.name)
    // Add event listener to each genre card
// Add event listener to each genre card
card.addEventListener('click', () => {
  localStorage.setItem('genreName', genre.name);
    window.location.href= "Second-page/second-page.html"

});
    


    // Add the genre card to the container
    const col = document.createElement('div');
    col.style.width="auto"
    col.append(card); // Remove 'col' class from parent element
    genresContainer.appendChild(card);
  });
})
.catch(error => {
  console.error('Error fetching data:', error);
});

  


  const cardContainer = document.querySelector('#genres');

  // Add an event listener for the window's "scroll" event
  window.addEventListener('scroll', () => {
    // Get the position of the bottom of the viewport
    const bottomOfViewport = window.innerHeight + window.scrollY;
  
    // Loop through each card in the container
    cardContainer.querySelectorAll('.card').forEach(card => {
      // If the bottom of the card is above the bottom of the viewport...
      if (card.offsetTop + card.offsetHeight < bottomOfViewport) {
        // Add the "fade-in" class to the card
        card.style.visibility="visible"
        card.classList.add('fade-in');
      }
    });
  });

  const carousel = document.querySelector('.carousel-inner')

  function CarouselAppend() {
    const carousel = document.querySelector('.carousel-inner')
    fetch('https://api.rawg.io/api/games/lists/main?ordering=-rating&key=' + config.api)
      .then(response => response.json())
      .then(data => {
        let filteredArray = data.results
        for (let i = 0; i < filteredArray.length - 1; i++) {
          console.log(filteredArray[i])
          if (i < 1) {
            fetchBackgroundImage(filteredArray[i].id).then(backgroundImage => {
              let carouselItem = document.createElement('div')

              carouselItem.classList.add('carousel-item', 'active', 'carousel-image')
              carouselItem.setAttribute('data-bs-interval', '10000')
              carouselItem.innerHTML = `
              <div class ="image-container">
                <img src="${backgroundImage}" onclick=" handleCarouselItemClick('${filteredArray[i].id}')" class="d-block w-100 img-fluid" id="carouselImages" alt="...">
                </div>
                <div class="carousel-caption d-none d-md-flex" id="carouselContainer">
                  <h5 id="videoGameCaourselCap">${filteredArray[i].name}</h5>
                </div>
              </div>`
              carousel.append(carouselItem)
            })
          } else if (filteredArray[i].id !== filteredArray[i + 1].id) {
            fetchBackgroundImage(filteredArray[i].id).then(backgroundImage => {
              let carouselItem = document.createElement('div')

              carouselItem.classList.add('carousel-item', 'carousel-image')
              carouselItem.setAttribute('data-bs-interval', '10000')
              carouselItem.innerHTML = `
              <div class ="image-container">
                <img src="${backgroundImage}" onclick=" handleCarouselItemClick('${filteredArray[i].id}')" class="d-block w-100 img-fluid" id="carouselImages" alt="...">
                </div>
                <div class="carousel-caption text-center d-none d-md-flex" id="carouselContainer">
                  <h5 id="videoGameCaourselCap">${filteredArray[i].name}</h5>
                </div>
              </div>`
              carousel.append(carouselItem)
            })
          }
        }
      })
  }
    CarouselAppend();

});



