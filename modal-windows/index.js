let fruits = [
  { id: 1, title: 'Яблоки', price: 20, img: "https://e1.edimdoma.ru/data/ingredients/0000/2374/2374-ed4_wide.jpg?1487746348" },
  { id: 2, title: 'Апельсины', price: 30, img: "https://www.gastronom.ru/binfiles/images/20220127/bda1106a.jpg" },
  { id: 3, title: 'Манго', price: 40, img: "https://resizer.mail.ru/p/9a851cf6-ffa8-5974-9d46-261828a9606d/AAAcuzorDYfIhh6m-8-lsk3fiv7VQQgzQWoq8KRQnb8nOkxqcn7O_S7YGbKwI4SQy2KKzk2-2sTYy0brhPSGmWvJQmY.jpg" },
]

const toHTML = fruit => `
  <div class="col">
  <div class="card">
    <img class="card-img-top" style="height: 400px"
      src="${fruit.img}" alt="${fruit.title}">
    <div class="card-body">
      <h5 class="card-title">${fruit.title}</h5>
      <a href="#" class="btn btn-primary" data-btn="price" data-id="${fruit.id}">Посмотреть цену</a>
      <a href="#" class="btn btn-danger" data-btn="remove" data-id="${fruit.id}">Удалить</a>
    </div>
  </div>
`


function render() {
  const html = fruits.map(toHTML).join('')
  document.querySelector('#fruits').innerHTML = html
}

render()




const priceModal = $.modal({
  title: 'Цена на товар',
  closable: true,
  width: '400px',
  footerButtons: [
    {
      text: 'Закрыть', type: 'primary', handler() {
        priceModal.close()
      }
    }
  ]
})

document.addEventListener('click', event => {
  event.preventDefault()
  const btnType = event.target.dataset.btn
  const id = +event.target.dataset.id
  const fruit = fruits.find(f => f.id === id)

  if (btnType === 'price') {
    priceModal.setContent(`<p>Цена на ${fruit.title}: <strong>${fruit.price}$</strong></p>`)
    priceModal.open()

  } else if (btnType === 'remove') {
    $.confirm({
      title: 'Вы уверены',
      content: `<p>Вы удаляете фрукт: <strong>${fruit.title}</strong></p>`
    }).then(() => {
      fruits = fruits.filter(f => f.id !== id)
      render()
    }).catch(() => {
      console.log('Cancel');

    })
  }
})
