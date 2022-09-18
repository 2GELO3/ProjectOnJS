startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board =document.querySelector('#board')
const colors = ['rgb(0, 229, 255)', 'rgb(229, 255, 0)', 'rgb(255, 0, 230)', 'rgb(255, 0, 0)', 'rgb(38, 255, 0)', 'rgb(252, 252, 252)', 'rgb(13, 0, 255)', 'rgb(255, 0, 144)']

let time = 0
let Score = 0 


startBtn.addEventListener('click', (event) => {
    event.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', event => {
    if (event.target.classList.contains
        ('time-btn')) {
        time = parseInt(event.target.getAttribute
        ('data-time'))
        screens[1].classList.add('up')
        startGame()
    }
})

// Добавления функционала кружочкам
board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        Score++
        event.target.remove()
        createRandomCircle()
    }
})
// ===================================


// Добавление таймера
function startGame () {
    setInterval(decreaceTime, 1000)
    createRandomCircle()
    setTime(time)
}

function  decreaceTime() {
    if (time ===0) {
        finnishGame()
    } else {
        let current = --time
        if (current < 10 ) {
            current = `0${current}`
        }
        setTime(current)
    }
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}

function finnishGame () {
    timeEl.parentNode.classList.add('hide')
    board.innerHTML = `<h1>счет: <span class="primary"> ${Score}</span></span></h1>`
}
// ==============================================


// Рандомные кружки
function createRandomCircle() {
    const circle = document.createElement('div')
    const size = getRandomNumber(10,60)

      // Рандомное положение
    const {width, height} = board.getBoundingClientRect()
    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)
    // ===========================

    // Рандомный цвет
    const colors = getRandomColor()
    
    circle.style.background = colors;
// =========================================

    circle.classList.add('circle')
    circle.style.width =`${size}px`
    circle.style.height=`${size}px`
    circle.style.top=`${y}px`
    circle.style.left=`${x}px`

    board.append(circle )
}

// Рандомная размерность
function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min)
}
// ====================================

// Также цвет
function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)]
}
// ====================================


// Хак игры
function winTheGame() {
    function kill() {
        const circle = document.querySelector('.circle')

        if (circle) {
            circle.click()
        }
    }

    setInterval(kill, 1)
}
// ==========================