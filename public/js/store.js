const btnAdds = Array.from(document.querySelectorAll(".add"));
const btnSmalls = Array.from(document.querySelectorAll(".small"));


btnAdds.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    if (event.target.parentElement.tagName == "DIV") {
      event.target.parentElement.children[1].innerHTML++;
      cart(
        event.target.parentElement.parentElement.parentElement.parentElement
          .dataset.id,
        
      );
    } else if (event.target.parentElement.tagName == "FIGURE") {
      event.target.parentElement.parentElement.children[1].innerHTML++;
      cart(
        event.target.parentElement.parentElement.parentElement.parentElement
          .parentElement.dataset.id,
        
      );
    }
  });
});

btnSmalls.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    if (event.target.parentElement.tagName == "DIV") {
      if (event.target.parentElement.children[1].innerHTML == 0) {
        return false;
      } else {
        event.target.parentElement.children[1].innerHTML--;
        cart(
          event.target.parentElement.parentElement.parentElement.parentElement
            .dataset.id,
    
        );
      }
    } else if (event.target.parentElement.tagName == "FIGURE") {
      if (event.target.parentElement.parentElement.children[1].innerHTML == 0) {
        return false;
      } else {
        event.target.parentElement.parentElement.children[1].innerHTML--;
        cart(
          event.target.parentElement.parentElement.parentElement.parentElement
            .parentElement.dataset.id,
          
        );
      }
    }
  });
});

function cart(id) {
  const xhttp = new XMLHttpRequest();
  let washing = document.getElementsByClassName(id+"w")[0].innerHTML
  let iron = document.getElementsByClassName(id+"i")[0].innerHTML
  xhttp.open("POST", "/dashbord/handelCart");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify({id, washing, iron}))
}


