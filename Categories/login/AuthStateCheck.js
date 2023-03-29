const input = document.querySelector('#name')
const submit = document.querySelector('#button')

console.log(submit)

submit.addEventListener('click', (e) => {
    e.preventDefault()
    const name = input.value
    if(name.length > 1) {
        window.location = '../top-games.html'
    }
})