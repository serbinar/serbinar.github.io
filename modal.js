function expandImg (id) {
    const modal = document.getElementById('modal')
    modal.style.display = 'block'
    const img = document.getElementById(id)
    const modalImg = document.getElementById('modal_img')
    modalImg.src = img.src
}
function collapseImg (){
    const modal = document.getElementById('modal')
    modal.style.display = 'none'
}
function showModalNews () {
    const modal = document.getElementById('modalNews')
    modal.showModal()
}
function closeModalNews () {
    const modal = document.getElementById('modalNews')
    const form = document.forms.newsForm
    form.reset()
    modal.close()
}