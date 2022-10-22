

let button = document.querySelector("button");
let input = document.querySelector("input");
let files;
let i = 0;

button.addEventListener("click", () => {
  // получаем количество файлов
  files = input.files;

  document.body.removeChild(input);
  document.body.removeChild(button);

  let board = document.querySelector("div");
  // создаем карусель
  let carousel = new Carousel(board);
});

class Carousel {
  constructor(element) {
    this.board = element;

    // добавляем первые две карточки вручную
    this.push();

    // увеличиваем счетчик
    i++;
    this.push();

    // обрабатываем жесты
    this.handle();
  }

  handle() {
    // получаем список всех карточек
    this.cards = this.board.querySelectorAll("img");

    // получаем верхнюю карточку
    this.topCard = this.cards[this.cards.length - 1];

    // получаем следующую карточку
    this.nextCard = this.cards[this.cards.length - 2];

    // если имеется хотя бы одна карточка
    if (this.cards.length > 0) {
      // определяем позицию и масштаб верхней карточки
      this.topCard.style.transform =
        "translate(-50%, -50%) rotate(0deg) scale(1)";

      // слушаем жесты (касания) и перемещение (перетаскивание) на верхней карточке
      this.hammer = new Hammer(this.topCard);
      this.hammer.add(new Hammer.Tap());
      this.hammer.add(
        new Hammer.Pan({
          position: Hammer.position_ALL,
          threshold: 0
        })
      );

      // передаем данные о событии в функции обратного вызова
      this.hammer.on("tap", (e) => {
        this.onTap(e);
      });
      this.hammer.on("pan", (e) => {
        this.onPan(e);
      });
    }
  }

  // жесты (касания)
  onTap(e) {
    // получаем позицию курсора на верхней карточке
    let propX =
      (e.center.x - e.target.getBoundingClientRect().left) /
      e.target.clientWidth;

    // получаем угол поворота по оси Y (+/-15 градусов)
    let rotateY = 15 * (propX < 0.05 ? -1 : 1);

    // меняем значение свойства transition
    this.topCard.style.transition = "transform 100ms ease-out";

    // поворачиваем
    this.topCard.style.transform =
      "translate(-50%, -50%) rotateX(0deg) rotateY(" +
      rotateY +
      "deg) scale(1)";

    // ждем окончания перехода
    setTimeout(() => {
      // сбрасываем значение свойства transform
      this.topCard.style.transform =
        "translate(-50%, -50%) rotate(0deg) scale(1)";
    }, 100);
  }

  // перемещение (перетаскивание)
  onPan(e) {
    if (!this.isPanning) {
      this.isPanning = true;

      // удаляем значения свойства transition
      this.topCard.style.transition = null;
      if (this.nextCard) this.nextCard.style.transition = null;

      // получаем координаты верхней карточки в пикселях
      let style = window.getComputedStyle(this.topCard);
      let mx = style.transform.match(/^matrix\((.+)\)$/);
      this.startPosX = mx ? parseFloat(mx[1].split(", ")[4]) : 0;
      this.startPosY = mx ? parseFloat(mx[1].split(", ")[5]) : 0;

      // получаем границы верхней карточки
      let bounds = this.topCard.getBoundingClientRect();

      // получаем позицию курсора на верхней карточке, верх (1) или низ (-1)
      this.isDraggingFrom =
        e.center.y - bounds.top > this.topCard.clientHeight / 2 ? -1 : 1;
    }

    // вычисляем новые координаты
    let posX = e.deltaX + this.startPosX;
    let posY = e.deltaY + this.startPosY;

    // получаем разницу между смещенными пикселями и осями
    let propX = e.deltaX / this.board.clientWidth;
    let propY = e.deltaY / this.board.clientHeight;

    // получаем направление перемещения, влево (-1) или вправо (1)
    let dirX = e.deltaX < 0 ? -1 : 1;

    // вычисляем угол поворота, между 0 и +/-45 градусов
    let deg = this.isDraggingFrom * dirX * Math.abs(propX) * 45;

    // вычисляем разницу в масштабе, между 95 и 100%
    let scale = (95 + 5 * Math.abs(propX)) / 100;

    // перемещаем верхнюю карточку
    this.topCard.style.transform =
      "translateX(" +
      posX +
      "px) translateY(" +
      posY +
      "px) rotate(" +
      deg +
      "deg) scale(1)";

    // масштабируем следующую карточку
    if (this.nextCard)
      this.nextCard.style.transform =
        "translate(-50%, -50%) rotate(0deg) scale(" + scale + ")";

    if (e.isFinal) {
      this.isPanning = false;

      let successful = false;

      // возвращаем значения свойства transition
      this.topCard.style.transition = "transform 200ms ease-out";
      if (this.nextCard)
        this.nextCard.style.transition = "transform 100ms linear";

      // проверяем границы
      if (propX > 0.25 && e.direction == Hammer.DIRECTION_RIGHT) {
        successful = true;

        // получаем позицию правой границы
        posX = this.board.clientWidth;
      } else if (propX < -0.25 && e.direction == Hammer.DIRECTION_LEFT) {
        successful = true;

        // получаем позицию левой границы
        posX = -(this.board.clientWidth + this.topCard.clientWidth);
      } else if (propY < -0.25 && e.direction == Hammer.DIRECTION_UP) {
        successful = true;

        // получаем позицию верхней границы
        posY = -(this.board.clientHeight + this.topCard.clientHeight);
      }

      if (successful) {
        // отбрасываем карточку в выбранном направлении
        this.topCard.style.transform =
          "translateX(" +
          posX +
          "px) translateY(" +
          posY +
          "px) rotate(" +
          deg +
          "deg)";

        // ждем окончания перехода
        setTimeout(() => {
          // удаляем отброшенную карточку
          this.board.removeChild(this.topCard);

          // увеличиваем счетчик
          i++;
          // если величина счетчика равняется количеству файлов, сбрасываем счетчик
          if (i === files.length) i = 0;

          // добавляем новую карточку
          this.push();
          // обрабатываем жесты на новой верхней карточке
          this.handle();
        }, 200);
      } else {
        // сбрасываем позиции карточек
        this.topCard.style.transform =
          "translate(-50%, -50%) rotate(0deg) scale(1)";
        if (this.nextCard)
          this.nextCard.style.transform =
            "translate(-50%, -50%) rotate(0deg) scale(0.95)";
      }
    }
  }

  // добавляем карточку
  push() {
    let card = document.createElement("img");

    // если файлы не выбраны, загружаем изображения по умолчанию
    // если выбраны, загружаем их
    if (files.length === 0) {
      card.src =
        "https://picsum.photos/320/320/?random=" +
        Math.round(Math.random() * 1000000) +
        ")";
    } else {
      card.src = URL.createObjectURL(files[i]);
    }

    if (this.board.firstChild) {
      this.board.insertBefore(card, this.board.firstChild);
    } else {
      this.board.append(card);
    }
  }
}

