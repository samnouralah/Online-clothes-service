const lis = Array.from(document.querySelectorAll(".abzar-nav"));

lis.forEach(elm => {
    elm.addEventListener("click", event => {
        if(event.target.lastElementChild.style.display == "block"){
            event.target.lastElementChild.style.display = "none"
        }else{
            event.target.lastElementChild.style.display = "block"
        }
    })
})