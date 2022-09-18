let buttons = document.querySelectorAll('button');

for (let i = 0; i < buttons.length; i++) {
  buttons[i].innerHTML = i;
  buttons[i].onclick = function (x) {
    return function () {
      console.log(x);

    }
  }(i);
}