const cardContainer2 = document.querySelector('#cardContainer2')
const cardContainer3 = document.querySelector('#cardContainer3')

const modalBody = document.querySelector('#advanced')

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

const renderCard = async (game, count) => {
  const {
    name,
    background_image,
    id,
    parent_platforms,
    metacritic,
    released,
    genres,
  } = game;

  let str = parent_platforms.map((elem) => {
    if (elem.platform.name == "Xbox") {
      return `<i class="fa-brands fa-xbox" style="color: #ffffff; margin:0 0.25em;"></i>`;
    } else if (elem.platform.name == "PlayStation") {
      return `<i class="fa-brands fa-playstation" style="color: #ffffff; margin:0 0.25em;"></i>`;
    } else if (elem.platform.name == "PC") {
      return `<i class="fa-brands fa-windows" style="color: #ffffff; margin:0 0.25em;"></i>`;
    } else if (elem.platform.name == "Linux") {
      return `<i class="fa-brands fa-linux" style="color: #ffffff; margin:0 0.25em;"></i>`;
    }
  });

  const dateString = released;
  const date = new Date(dateString);
  const options = { month: "short", day: "numeric", year: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);

  const card = document.createElement("div");
  const platforms = document.createElement("p");
  platforms.innerHTML = str.join("");
  const expandableContent = document.createElement("div");
  expandableContent.classList.add("expandable-content");
  expandableContent.innerHTML = `
      <div class="release-date">${formattedDate}</div>
      <div class="genres">${genres.map((genre) => genre.name).join(", ")}</div>
    `;

  const expandableDescription = document.createElement("div");

  card.append(moreInfoIcon);

  const cardContainers = [
    {
      container: cardContainer2,
      count: cardContainer2.querySelectorAll(".card").length,
    },
    {
      container: cardContainer3,
      count: cardContainer3.querySelectorAll(".card").length,
    },
    {
      container: document.querySelector("#cardContainer4"),
      count: document.querySelector("#cardContainer4").querySelectorAll(".card")
        .length,
    },
    {
      container: document.querySelector("#cardContainer5"),
      count: document.querySelector("#cardContainer5").querySelectorAll(".card")
        .length,
    },
  ];

  const containerWithFewestCards = cardContainers.reduce((prev, curr) => {
    return prev.count < curr.count ? prev : curr;
  });

  containerWithFewestCards.container.append(card);

  expandableDescription.setAttribute("class", "descriptionBox");
  const text = document.createElement("p");
  const platArr = parent_platforms.map((platform) => platform.platform.name);
  text.innerText = "Compatability: " + platArr.join(", ");
  const metaText = document.createElement("p");
  metaText.innerText = "Metacritic: " + metacritic + "/100";
  const release = document.createElement("p");
  release.innerText = "Release Date: " + formattedDate;
  const genreText = document.createElement("p");
  genreText.innerText =
    "Genres: " + genres.map((genre) => genre.name).join(", ");
  expandableDescription.append(genreText);
  expandableDescription.append(release);
  expandableDescription.append(text);
  expandableDescription.append(metaText);
  expandableDescription.style.width = "auto";
  card.append(expandableDescription);

  let strExpansion = expandableDescription.outerHTML;

  card.outerHTML = `
  <div class="card bg-dark" >
  <img src="${background_image}" class="card-img-top border-bottom border-3" alt="...">
  <div class="card-body text-light">
  <div class="d-flex justify-content-between align-center mb-3">
  <p class="mb-0 h-auto text-center">${platforms.innerHTML}</p>
  <button onclick="addToWishlist('${name}', '${background_image}')" data-name="${name}" data-image="${background_image}" id="wishListbtn" class="btn btn-outline-light btn-sm"><i class="fa-solid fa-plus"></i> &nbsp; Wishlist</button>
  </div>
  <h3>${name}</h3>
  <div class="expandable">
  <p>More info</p>
  <i class="fa-solid fa-angle-down" id="arrowIcon" style="color: #ffffff;" data-bs-toggle="collapse" data-bs-target="#button${collapseID}" aria-expanded="false" aria-controls="collapseExample"></i>
  </div>
  <div class="collapse" id="button${collapseID}">
  ${strExpansion}
  <button id="cardButton${collapseID}" onclick="displayGameDetails('${id}')" class="btn btn-outline-light" data-bs-toggle="modal" data-bs-target="#advancedModal">View More</button>
  </div>
  </div>
  </div>
  `;

const wishListButton = document.querySelector('#wishListbtn')
  wishListButton.addEventListener('click', (e) => {
  wishListButton.style.backgroundColor = 'green'
})


  collapseID += 1;

  {
    /* card.querySelector('.card-text').innerHTML = description; */
  }
};

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
    rating.style.display = 'flex';
    rating.style.alignItems = 'center'

    const div = document.createElement("div");
    div.style.display = "flex";
    div.style.justifyContent = "space-between";
    div.style.alignItems = "space-between";
    div.style.borderBottom = "2px white solid";
    div.style.marginTop = '10px'

    

    const heart = document.createElement("i");
    heart.innerHTML = `<i class="fa-solid fa-plus" id="Wishlist"></i>`;
    heart.style.paddingRight = '10px'


    const heartCaption = document.createElement("h5");
    heartCaption.textContent = `WISHLIST`;

    const heartAndTextcontainer = document.createElement("div");
    heartAndTextcontainer.append(heart, heartCaption);
    heartAndTextcontainer.setAttribute("id", "heartAndTextcontainer");
    

    heartAndTextcontainer.style.display = 'flex';
    heartAndTextcontainer.style.border = '1px white solid'
    heartAndTextcontainer.style.paddingTop = '8px'
    heartAndTextcontainer.style.paddingLeft = '8px'
    heartAndTextcontainer.style.paddingRight = '8px'
    heartAndTextcontainer.style.marginBottom = '10px'
    heartAndTextcontainer.style.borderRadius = '5px'

    div.append(rating, heartAndTextcontainer);
    
    
    const image = document.createElement("img");
    image.src = data.background_image;
    image.style.width = "100%";
    
    heartAndTextcontainer.addEventListener('click', () => {
      const wishlist = JSON.parse(localStorage.getItem('wishListData')) || [];
      const name = data.name;
      const image = data.background_image;
      wishlist.push({name, image});
      localStorage.setItem('wishListData', JSON.stringify(wishlist));
      heartAndTextcontainer.style.backgroundColor = 'green'
    })

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
      `https://api.rawg.io/api/games?key=${config.api}&genres=${genres.join(",")}&exclude_games=${gameId}&page_size=4&ordering=random`
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
        recommendedGameImage.style.cursor = "pointer";
        recommendedGameImage.style.borderRadius = "20px"
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
}
 


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
    const input = document.querySelector('input').value;
    localStorage.setItem('searchResult', JSON.stringify(input))
    window.location = '../SearchResults/searchResults.html'
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


