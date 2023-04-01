
function showLoadingOverlay() {
    document.getElementById("loading-overlay").style.display = "block";
  }
  
  function hideLoadingOverlay() {
    document.getElementById("loading-overlay").style.display = "none";
  }

// Show the loading screen when a navigation event occurs
window.onload = function() {
    // Hide the loading screen when the page has finished loading
    hideLoadingOverlay() 
    document.querySelectorAll('*').forEach(elem => {
        elem.style.visibility = "visible";
      });
  }
  
  // Add an event listener for the DOMContentLoaded event
  document.addEventListener("DOMContentLoaded", () => {
    // Show the loading screen when the page starts loading
    showLoadingOverlay();

  
  const input = document.querySelector('#name')
  const submit = document.querySelector('#button')
  const backButton = document.querySelector('#back')
  
  submit.addEventListener('click', (e) => {
      e.preventDefault()
      const name = input.value
      if(name.length > 1) {
          document.querySelector('body').classList.add('fade-out-bck')
          setTimeout(function () {
              window.location = '../top-games.html'
          },1000)
      }
  })
  backButton.addEventListener('click', (e) => {
      e.preventDefault()
      document.querySelector('.yellowContainer').classList.add('slide-in-left')
          setTimeout(function () {
              window.location = '../../index.html'
          },1000)
  })
});