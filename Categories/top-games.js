document.addEventListener('DOMContentLoaded',function(){
    document.querySelectorAll('#cardButton').forEach(elem => {
    console.log(elem)
    elem.setAttribute('data-bs-toggle','modal')
    elem.setAttribute('data-bs-target','#exampleModal')
})
}
)



/*
<!-- <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
    Launch demo modal
  </button> -->
*/