// Файл: account.js

function showAccountPage() {
  // Ваш код для отображения страницы аккаунта
  // Открываем страницу "account.html" в новой вкладке браузера
  fetch('account.html')
    .then((response) => response.text())
    .then((data) => {
      document.querySelector('#description-container').innerHTML = data;
    });
}

window.location.href = 'http://www.example.com';

// Экспортируем функцию, чтобы можно было вызвать её из другого файла
export { showAccountPage };
