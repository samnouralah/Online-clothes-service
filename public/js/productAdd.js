const input = document.querySelector("input[type = file]");
const statusImage = document.getElementById("statusImage");

input.addEventListener("change", (e) => {
  if (input.files) {
    statusImage.innerHTML = "انتخاب شد :)";
  }
});

btnUploder.onclick = (event) => {
  const xhttp = new XMLHttpRequest();
  xhttp.responseType = "json";
  let result = 0;
  xhttp.onloadend = function () {
    statusImage.innerHTML = this.response.msg;
    if (this.response.fileName) {
      statusImage.style.width = "100%";
      btnUploder.style.display = "none";
      input.remove();
      const inputHidden = document.createElement("input");
      inputHidden.type = "hidden";
      inputHidden.value = this.response.fileName;
      inputHidden.name = "urlImage";
      console.log(inputHidden);
      form.append(inputHidden);
    }
  };
  xhttp.onprogress = function (e) {
    if (this.status != 400) {
      boxLoader.style.display = "block";
      result = Math.floor((e.loaded / e.total) * 100);
      load.style.width = result + "%";
      load.innerHTML = result + "%";
    }
  };

  xhttp.open("POST", "/dashbord/product/upload-image");
  const formData = new FormData();
  formData.append("image", selecteImage.files[0]);
  xhttp.send(formData);
};
