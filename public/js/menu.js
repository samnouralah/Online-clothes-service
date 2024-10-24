const btnSefareshTelefoni = document.getElementById("btn-sefaresh-telefoni")
const sefareshTelefoni = document.getElementById("sefaresh-telefoni")
const btnClose = document.getElementById("close")

btnSefareshTelefoni.addEventListener("click", event => {
    event.preventDefault()
    sefareshTelefoni.style.display = "block"
})
btnClose.addEventListener("click", event => {
    sefareshTelefoni.style.display = "none"
})