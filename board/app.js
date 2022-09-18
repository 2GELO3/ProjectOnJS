// Добавляем доску с квадратиками
const board = document.querySelector('#board')
const colors = ['rgb(0, 229, 255)', 'rgb(229, 255, 0)', 'rgb(255, 0, 230)', 'rgb(255, 0, 0)', 'rgb(38, 255, 0)', 'rgb(252, 252, 252)', 'rgb(13, 0, 255)', 'rgb(255, 0, 144)']
const SQUARES_NUMBER = 680

for (let i = 0; i < SQUARES_NUMBER; i++) {
  const square = document.createElement('div')
  square.classList.add('square')

  square.addEventListener('mouseover', setColor)

  square.addEventListener('mouseleave', removeColor)

  board.append(square)
}
// ====================


// Добавление цветового эффекта
function setColor(event) {
  const element = event.target
  const color = getRandomColor()
  element.style.backgroundColor = color
  element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`
}

// Удаление цветового эффекта
function removeColor(event) {
  const element = event.target
  element.style.backgroundColor = '#1d1d1d'
  element.style.boxShadow = `0 0 2px #000`
}

// Метод выбора случайного цвета из массива
function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)]
}
