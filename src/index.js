const buttons = document.getElementsByClassName("keypadBtn");
const output = document.getElementById("output");

for (const button of buttons) {
  // index counter to keep track of clicks on a button
  let index = 0;
  // time in ms for hold and busy timeouts
  const delay = 500;
  let hold = null;
  let busy = null;
  let isBusy = true;
  // variable to store last click
  let click = null;

  button.onmousedown = function (e) {
    const dataText = this.getAttribute("data-text").split("");
    const dataNumber = this.getAttribute("data-number");
    
    // if the click is on subText class element
    // save the click's target as it's parent element.
    const target = e.target.classList.contains("subText")
      ? e.currentTarget
      : e.target;

    isBusy = true;

    clearTimeout(busy);

    // If current click != prev click, change isBusy status
    if (click !== target) {
      isBusy = false;
    }

    // Loop the index variable around
    if (index >= dataText.length - 1 || click !== target) {
      index = 0;
      click = target;
    } else {
      index = index + 1;
    }

    // if mouse is held down, remove last char and add number in place
    hold = setTimeout(() => {
      if (dataNumber) {
        output.value = output.value.slice(0, -1) + dataNumber;
      }
    }, delay);

    // only remove the last character if isBusy is true
    output.value = isBusy
      ? output.value.slice(0, -1) + dataText[index]
      : output.value + dataText[index];
  };

  button.onmouseup = () => {
    clearTimeout(hold);
    isBusy = true;

    busy = setTimeout(() => {
      index = -1;
      isBusy = false;
      click = null;
    }, delay);
  };
}
