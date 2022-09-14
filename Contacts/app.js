let contacts = ['Григорий:2232322', 'Марина:3453456', 'Василий:7654322', 'Наталья:9998769', 'Диана:9384975'],
  para = document.querySelector('p'),
  input = document.querySelector('input'),
  btn = document.querySelector('button');


btn.addEventListener('click', function () {
  let searchName = input.value;

  input.value = '';
  input.focus();

  for (let i = 0; i < contacts.length; i++) {
    let splitContact = contacts[i].split(':');
    if (splitContact[0] === searchName) {
      para.textContent = splitContact[0] + ', тел.: ' + splitContact[1] + '.';
      break;
    } else {
      para.textContent = 'Контакт не найден.';
    }
    // console.log(para.textContent);

  }
});