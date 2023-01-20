// This section just gets the elements from the html
let preview = document.getElementById("calc");
let total = document.getElementById("total");
let operators = document.getElementsByClassName("operator");
let equal = document.getElementById("equals");
let buttons = document.getElementsByClassName("button");
let clear_button = document.getElementById("clear");
let backspace_button = document.getElementById("backspace");
let dark_button = document.getElementById("dark");
let light_button = document.getElementById("light");
let calculator = document.getElementById("calculator");
// This is used to know if we should clear after we press a button
// This is set to `true` when the `=` button is pressed
let shouldClear = false;
// This just removes the last character of the `total`'s value
const handleBackspace = () => {
  total.innerHTML = total.innerHTML.substring(0, total.innerHTML.length - 1);
  shouldClear = false;
};
// This handls clearing of the `total` and the `preview` boxes
const handleClear = () => {
  total.innerHTML = "";
  preview.innerHTML = "";
};
// This handles the adding of text to the preview and total boxes
const handleInput = (key) => {
  if (preview.innerHTML.length == 0 && shouldClear && /[0-9\-]+/.test(key)) {
    total.innerHTML = key;
    shouldClear = false;
  } else if (
    /[\-+/x*%]/.test(key) &&
    (/\d$/.test(preview.innerHTML) || preview.innerHTML.length == 0)
  ) {
    preview.innerHTML += total.innerHTML + ` ${key} `;
    total.innerHTML = "";
  } else if (/\d+/.test(key)) {
    total.innerHTML += key;
  }
};
// This is what calculates all the inputs
const getResult = () => {
  let acc = "";
  for (let i = 0; i < preview.innerHTML.length; i++) {
    if (preview.innerHTML[i] === "x") {
      acc += "*";
    } else {
      acc += preview.innerHTML[i];
    }
  }
  let result = eval(acc + total.innerHTML);
  if (result == parseInt(result)) {
    total.innerHTML = result;
  } else {
    total.innerHTML = parseFloat(result).toPrecision(5);
  }
  preview.innerHTML = "";
  shouldClear = true;
};
// This handles operators when they are pressed in the calculator
const handleOperators = (event) => {
  let element = event.target;
  handleInput(element.innerHTML);
};
// This handles button when they are pressed in the calculator
const handleButtons = (event) => {
  let element = event.target;
  handleInput(element.innerHTML);
};
// Event listeners
// Set's the class of the calculator to `dark`
dark_button.addEventListener("click", () => {
  document.querySelector("html").setAttribute("data-theme", "Dark");
  dark_button.className = "active";
  light_button.className = "inactive";
});
// Set's the class of the calculator to `dark`
light_button.addEventListener("click", () => {
  document.querySelector("html").setAttribute("data-theme", "Light");
  light_button.className = "active";
  dark_button.className = "inactive";
});
equal.addEventListener("click", () => {
  getResult();
});
// This just clears the preview and the total
clear_button.addEventListener("click", () => {
  handleClear();
});
backspace_button.addEventListener("click", () => {
  handleBackspace();
});
// This loops over the buttons and adds the `handleButtons` function to all of them
for (let index = 0; index < buttons.length; index++) {
  const element = buttons[index];
  element.addEventListener("click", handleButtons);
}
// This loops over the operators and adds the `handleOperators` function to all of them
for (let index = 0; index < operators.length; index++) {
  const element = operators[index];
  element.addEventListener("click", handleOperators);
}
// window.addEventListener("keydown", (ev) => {
//   ev.preventDefault();
//   if (/[0-9+\-*%./]+/.test(ev.key)) {
//     handleInput(ev.key);
//   } else if (ev.keyCode == 13) {
//     getResult();
//   } else if (ev.keyCode == 8) {
//     handleBackspace();
//   } else if (ev.keyCode == 27) {
//     handleClear();
//   }
// });
