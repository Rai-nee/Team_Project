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
// Set's the class of the calculator to `dark`
dark_button.addEventListener("click", () => {
  calculator.className = "dark phone";
});
// Set's the class of the calculator to `dark`
light_button.addEventListener("click", () => {
  calculator.className = "light phone";
});

// This just removes the last character of the `total`'s value
backspace_button.addEventListener("click", () => {
  total.innerHTML = total.innerHTML.substring(0, total.innerHTML.length - 1);
});
// This just clears the preview and the total
clear_button.addEventListener("click", () => {
  total.innerHTML = "";
  preview.innerHTML = "";
});

// This handles operators when they are pressed in the calculator
const handleOperators = (event) => {
  let element = event.target;
  if (total.innerHTML.length != 0) {
    preview.innerHTML += total.innerHTML + ` ${element.innerHTML} `;
    total.innerHTML = "";
  } else if (element.innerHTML == "-") {
    total.innerHTML += element.innerHTML;
  }
};

// This handles button when they are pressed in the calculator
const handleButtons = (event) => {
  let element = event.target;
  if (preview.innerHTML.length == 0 && shouldClear) {
    total.innerHTML = element.innerHTML;
  } else {
    total.innerHTML += element.innerHTML;
  }
  shouldClear = false;
};
// This is what calculates all the inputs
equal.addEventListener("click", () => {
  let acc = "";
  for (let i = 0; i < preview.innerHTML.length; i++) {
    if (preview.innerHTML[i] === "x") {
      acc += "*";
    } else {
      acc += preview.innerHTML[i];
    }
  }
  total.innerHTML = eval(acc + total.innerHTML);
  preview.innerHTML = "";
  shouldClear = true;
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
