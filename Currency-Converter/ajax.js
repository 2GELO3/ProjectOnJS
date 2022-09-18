let inputRub = document.getElementById('rub'),
  inputUsd = document.getElementById('usd');

// AJAX-запрос

inputRub.addEventListener('input', () => {
  let request = new XMLHttpRequest();



  // Общение клиента с сервером происходит посредством HTTP-запроса и его методов(GET и SET)

  // Данный запрос принимает в себя пять аргументов: метод(GET или POST), путь, ассинхронность(false, true), логин и пароль

  // request.open(method, url, async, login, pass);

  request.open('GET', 'current.json');

  request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

  // Тело запроса(Тело у запросов бывает только тогда, когда мы берём какую то информацию с клиентской части и отправляем её на сервер)

  // Метод send объекта request просто запускает запрос и этот запрос идёт за ответом к серверу

  request.send();

  // Свойства объекта request

  // status - даёт знать какое состояние у сервера(Предоставляет код сервера)

  // statusText -  даёт знать какое состояние у сервера(Предоставляет текстовый ответ)

  // responseText / response - содержит текст ответа сервера(Это то, что backend-developer хочет послать клиентской части из своего окружения)

  // readyState - содержит текущее состояние запроса(Есть всего пять состояний: UNSENT, OPENED, HEADERS_RECEIVED, LOADING, DONE)

  request.addEventListener('readystatechange', function () {
    if (request.readyState === 4 && request.status == 200) {
      let data = JSON.parse(request.response);

      inputUsd.value = inputRub.value / data.usd;
    } else {
      inputUsd.value = "Что-то пошло не так!";
    }
  });

})