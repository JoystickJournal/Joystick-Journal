const wishListRender = JSON.parse(localStorage.getItem('wishListData')) || []

const wishlistContainer = document.querySelector('#wishListContainer')

const wishlistContainer2 = document.querySelector('#wishListContainer2')
let userName = JSON.parse(localStorage.getItem('userName'))
document.querySelector('#title').textContent = `${userName}'s wishlist`

wishListRender.forEach(element => {
    const div = document.createElement('div')
    div.innerHTML = `<div class="card h-25">
    <img src="${element.image}" class="card-img-top" alt="...">
    <div class="card-body bg-dark text-light">
      <h5 class="card-title">${element.name}</h5>
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    </div>
  </div>`

  const wishlistContainers = [
    { container: wishlistContainer, count: wishlistContainer.querySelectorAll('div').length },
    { container: wishlistContainer2, count: wishlistContainer2.querySelectorAll('div').length },
  ];
  
  const wishlistFewest = wishlistContainers.reduce((prev, curr) => {
    return prev.count < curr.count ? prev : curr;
  });
  wishlistFewest.container.append(div)
});

document.querySelector('#searchBar').addEventListener('click',(e)=> {
  e.preventDefault()
  const input = document.querySelector('input').value;
  localStorage.setItem('searchResult', JSON.stringify(input))
  window.location = '../SearchResults/searchResults.html'

  handleSearchBar(true,countID);
})