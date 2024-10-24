const boxSoalats = Array.from(document.querySelectorAll(".box-soalat"))

boxSoalats.forEach(boxSoalat => {
    boxSoalat.addEventListener("click", (event) => {
        boxSoalat.classList.toggle("hauto")
        if(boxSoalat.className.includes("hauto")){
            boxSoalat.firstElementChild.lastElementChild.innerHTML = "remove"
        }else{
            boxSoalat.firstElementChild.lastElementChild.innerHTML = "add"
        }
    });
})