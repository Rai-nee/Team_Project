let upload = document.getElementById("upload");
const handleFile = () => {
  let file = upload.files[0];
  let reader = new FileReader();
  reader.onload = (e) => {
    console.log(e.target.result);
    localStorage.setItem("img", e.target.result);
  };
  reader.readAsDataURL(file);
};
upload.addEventListener("change", handleFile, false);
document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();
  handleForm();
  document.getElementById("form").reset()
});

const handleForm = () => {
  let fname = document.getElementById("fname").value;
  let mnum = document.getElementById("mnum").value;
  let hobby = document.getElementById("hobby").value;
  let gender = document.getElementById("gender").value;
  let course = document.getElementById("course").value;
  let image = localStorage.getItem("img");
  let ghName = document.getElementById("gh-name").value;

  let target = document.getElementById("dam");
  console.log(target);
  let element = `
        <div class="us">
          <img src="${image}" alt="${fname.substring(0, 3)}" />
          <p>
            ${fname}<br />
            ${mnum}<br />
            ${gender}<br />
               ${course}<br />
               ${hobby}<br />
            </p>
            <div class="layer">
              <h4>${ghName}</h4>
            </div>
          </div>`;
  target.innerHTML += element;
};
