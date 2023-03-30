const input = document.querySelector('#name')
const submit = document.querySelector('#button')

console.log(submit)

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