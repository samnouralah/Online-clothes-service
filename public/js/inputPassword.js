const eye = document.querySelectorAll(".eye");

eye.forEach((elm) => {
  elm.addEventListener("click", (event) => {
    if (elm.innerHTML.trim() == "visibility_off") {
      elm.innerHTML = "visibility";
      event.target.parentElement.firstChild.nextElementSibling.setAttribute(
        "type",
        "text"
      );
    } else {
      elm.innerHTML = "visibility_off";
      event.target.parentElement.firstChild.nextElementSibling.setAttribute(
        "type",
        "password"
      );
    }
  });
});
