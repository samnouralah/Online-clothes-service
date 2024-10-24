let btnOzviat = document.getElementById("btn-ozviat")
let inputOzviat = document.getElementById("input-ozviat")
let form = document.getElementById("form-ozviat")

inputOzviat.addEventListener("keyup", event => {
    const chekingEmail = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/
    if(chekingEmail.test(inputOzviat.value)){
        btnOzviat.removeAttribute("disabled")
        btnOzviat.classList.add("bag")
    }
})