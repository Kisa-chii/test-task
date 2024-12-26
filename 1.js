// Получаем JSON-объект с товарами
function test(categoryName, name) {
    fetch('./categories.json')
        .then(response => response.json())
        .then(products => {
            // Получаем элементы из HTML-шаблона
            // const productTemplate = document.querySelector('.product-page');
            const productName = document.querySelector('.name');
            // const productDescription = productTemplate.querySelector('.product-description');
            const productPrice = document.querySelector('.price');
            const productImage = document.querySelector('.image');
            const productDescription = document.querySelector('.description');

            const decodedCat = decodeURIComponent(categoryName.replace(/\+/g, ' '));
            const decodedName = decodeURIComponent(name.replace(/\+/g, ' '));

            console.log(decodedCat)
            // // Проходим по каждому товару и заполняем шаблон
            products[decodedCat].forEach(product => {
                if (product.name === decodedName) {
                    productName.textContent = product.name;
                    productPrice.textContent = product.price;
                    productImage.src = product.image;
                    productImage.classList.add('size-48');
                    productDescription.textContent = product.description
                }
            });
        });
}

function getUrlParams() {
    var params = {};
    var parts = window.location.href.split('?');
    if (parts.length > 1) {
        var query = parts.slice(1).join('?');
        var pairs = query.split('&');
        for (var i = 0; i < pairs.length; i++) {
            var pair = pairs[i].split('=');
            params[pair[0]] = pair[1];
        }
    }
    return params;
}

// Получаем значения параметров и выводим их
var params = getUrlParams();
console.log(params);
test(params.category, params.name);

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('popup-button').addEventListener('click', function () {
        document.querySelector('.popup').classList.remove('hidden');
    });
});

function closePopup() {
    document.querySelector('.popup').classList.toggle('hidden');
}