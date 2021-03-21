const buttons = document.getElementsByClassName("keypadBtn");
const output = document.getElementById("output");

for (const button of buttons) {
  let index = 0;
  const delay = 500;
  let isBusy = true;
  let hold = null;
  let busy = null;
  let click = null;

  button.onmousedown = function (e) {
    const dataText = this.getAttribute("data-text").split("");
    const dataNumber = this.getAttribute("data-number");
    const target = e.target.classList.contains("subText")
      ? e.currentTarget
      : e.target;

    isBusy = true;

    clearTimeout(busy);

    if (click !== target) {
      isBusy = false;
    }

    if (index >= dataText.length - 1 || click !== target) {
      index = 0;
      click = target;
    } else {
      index = index + 1;
    }

    hold = setTimeout(() => {
      if (dataNumber) {
        output.value = output.value.slice(0, -1) + dataNumber;
      }
    }, delay);

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
