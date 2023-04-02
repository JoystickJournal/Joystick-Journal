const result = localStorage.getItem("searchResult");

const modalBody = document.querySelector("#advanced");

let moreInfoIcon = document.createElement("div");

moreInfoIcon.innerHTML = `<i class="fa-solid fa-chevron-down" style="color: #ffffff;"></i>`;
let collapseID = 0;

const isWishlisted = (name, image) => {
  const wishlist = JSON.parse(localStorage.getItem("wishListData")) || [];
  return wishlist.some((game) => game.name === name && game.image === image);
};
const addToWishlist = (name, background_image) => {
  const wishlist = JSON.parse(localStorage.getItem("wishListData")) || [];

  // Check if the item is already in the wishlist
  const isAlreadyInWishlist = wishlist.some(
    (item) => item.name === name && item.image === background_image
  );

  // If the item is not in the wishlist, add it and update the button text
  if (!isAlreadyInWishlist) {
    wishlist.push({ name, image: background_image });
    localStorage.setItem("wishListData", JSON.stringify(wishlist));
    const button = document.querySelector(
      `button[data-name="${name}"][data-image="${background_image}"]`
    );
    button.textContent = "Remove from Wishlist";
  } else {
    // If the item is already in the wishlist, update the button text
    const button = document.querySelector(
      `button[data-name="${name}"][data-image="${background_image}"]`
    );
    button.textContent = "Remove from Wishlist";
  }
};

document.querySelector(
  "#header"
).textContent = `Showing 20 Results for ${result}`;

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
  <button onclick="addToWishlist('${name}', '${background_image}', this)" data-name="${name}" data-image="${background_image}" id="wishListbtn" class="btn btn-outline-light btn-sm"><i class="fa-solid fa-plus"></i> &nbsp; Wishlist</button>
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
      const recommendedGamesTitle = document.createElement("h4");
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

        recommendedGamesDiv.appendChild(recommendedGame);
      });

      modalBody.appendChild(recommendedGamesDiv);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

document.querySelector('#searchBar').addEventListener('click',(e)=> {
  e.preventDefault()
  const input = document.querySelector('input').value;
  localStorage.setItem('searchResult', JSON.stringify(input))
  window.location = 'searchResults.html'
})

fetch(`https://api.rawg.io/api/games?key=${config.api}&search=${result}`)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    data.results.forEach((elem, index) => {
      renderCard(elem, index);
    });
  });
