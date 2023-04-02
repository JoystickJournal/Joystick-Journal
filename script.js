const overlay = document.getElementById('overlay');

const slideButton = document.querySelector(".slideButton");
const backgroundChoclate = document.getElementById("backgroundChoclate");



slideButton.addEventListener("click", function() {

  if(!JSON.parse(localStorage.getItem('userName'))){
    backgroundChoclate.classList.toggle("slide-in-right");
  setTimeout(function () {
    window.location = "Categories/login/login.html"
  },1000)
} else {
  overlay.classList.add('show');
  overlay.classList.add('fade-in');
  let name = JSON.parse(localStorage.getItem('userName'))
  let header = document.createElement('h3')
  header.style.color = "white"
  header.textContent = `Welcome back, ${name}`
  overlay.append(header)
  setTimeout(function () {
    window.location = "Categories/top-games.html"
  },2000)
}
});

const chocolate = document.getElementById('backgroundChoclate');

// window.addEventListener('mousemove', (e) => {
//   let rect = chocolate.getBoundingClientRect();
//   const xPosition = e.clientX;
//   const width = window.innerWidth;
//   const percentage = xPosition / width;
//   const newWidth = percentage * 100;
//   chocolate.style.width = `${newWidth}%`;
//   if (e.clientX >= rect.innerWidth) {
//     slideButton.classList.remove("btn-outline-dark");
//     slideButton.classList.add("btn-outline-light");
//   } else {
//     slideButton.classList.remove("btn-outline-light");
//     slideButton.classList.add("btn-outline-dark");
//   }
// });