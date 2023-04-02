const wishListRender = JSON.parse(localStorage.getItem('wishListData')) || []

const wishlistContainer = document.querySelector('#wishListContainer')

const wishlistContainer2 = document.querySelector('#wishListContainer2')
let userName = JSON.parse(localStorage.getItem('userName'))
document.querySelector('#title').textContent = `${userName}'s wishlist`


wishListRender.forEach(element => {
    const div = document.createElement('div')
    div.innerHTML = `<div class="card">
    <img  style = 'object-fit: cover' src="${element.image}" class="card-img-top" alt="...">
    <div class="card-body h-25 bg-dark text-light">
      <h5 class="card-title">${element.name}</h5>
      <button style = 'background-color: red' type = 'submit' class = 'remove' id = '${element.name}' >REMOVE</button>
    </div>
  </div>`
  const wishlistContainers = [
    { container: wishlistContainer, count: wishlistContainer.querySelectorAll('div').length },
    { container: wishlistContainer2, count: wishlistContainer2.querySelectorAll('div').length },
  ];
  
// const imagesArr = document.querySelectorAll('.card-img-top');
// imagesArr.forEach(image => image.style = object-fit: cover)

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

const remove = document.querySelectorAll('.remove');


remove.forEach(removeButton => {
  removeButton.addEventListener('click', () => {
    let arr = JSON.parse(localStorage.getItem('wishListData'))
    let newArr = arr.filter(obj => {
      if(obj.name !== removeButton.id){
        return obj;
      }
    })
    localStorage.setItem('wishListData', JSON.stringify(newArr))
    location.reload()
  })
})
