// Функция для получения данных товаров по категории
async function getProductsByCategory(category) {
    const response = await fetch(`./categories.json`);
    const data = await response.json();

    // console.log(data)
    // Фильтрация товаров по категории
    // const products = data.filter(product => product.category === category);

    return data[category];
}

// Обработчик события нажатия на категорию
document.addEventListener('DOMContentLoaded', () => {
    // Выбираем контейнер категорий и продуктов
    const categoriesContainer = document.getElementById("categories");
    const productsContainer = document.getElementById("products");

    // Добавляем обработчик события клика на контейнер категорий
    categoriesContainer.addEventListener("click", event => {
        const category = event.target;

        if (category.classList.contains("cat123")) {
            const catName = category.textContent.trim();
            document.getElementsByClassName('catName')[0].textContent = catName;

            displayProducts(catName);
        }
    });

    // Функция отображения товаров
    function displayProducts(categoryName) {
        productsContainer.innerHTML = ""; // Очистка контейнера
        getProductsByCategory(categoryName)
            .then(products => {
                products.forEach(product => {
                    const productDiv = document.createElement("div");
                    productDiv.className = "flex justify-center items-center w-48 h-80 bg-amber-100 mx-1 my-1";

                    productDiv.innerHTML = `
                        <div>
                        <a href="tovar.html?category=${categoryName}&name=${product.name}">
                            <img src="${product.image}" class="w-40 h-40" alt="${product.name}">
                            <p class="flex justify-center font-bold">${product.name}</p>
                            <p class="flex justify-center font-bold">${product.price} p.</p>
                        </div>
                        <a/>
                    `;
                    productsContainer.appendChild(productDiv);
                });
            })
            .catch(error => {
                console.error("Ошибка:", error);
            });
    }

    getProductsByCategory("CATEGORIES")
        .then(products => {
            document.getElementsByClassName('catName')[0].textContent = "Все товары"
            const containerCat = document.getElementById("categories");
            containerCat.innerHTML = "";
            products.forEach(product => {
                const elementLI = document.createElement("li");
                elementLI.innerHTML = `
                    <a href="#" class="cat123 block px-4 py-2 hover:bg-gray-700 rounded">${product}</a>
                    `;
                containerCat.appendChild(elementLI);
                displayProducts(product);
            });
        }).catch(error => {
        console.error("Ошибка:", error);
        });

    // Обработчик нажатия на кнопку меню
    const menuButton = document.getElementById('menuButton');
    const sidebar = document.getElementById('sidebar');

    menuButton.addEventListener('click', () => {
        sidebar.classList.toggle('-translate-x-full');
    });
});

// Получаем элементы из HTML
let counter = 1;
const counterValue = document.getElementById('counter-value');
const incrementBtn = document.getElementById('increment-btn');
const decrementBtn = document.getElementById('decrement-btn');


// Обработчик нажатия на кнопку увеличения
incrementBtn.addEventListener('click', () => {
        counter++;
        counterValue.innerHTML = counter;
});

// Обработчик нажатия на кнопку уменьшения
decrementBtn.addEventListener('click', () => {
        if (counter > 1) {
            counter--;
            counterValue.innerHTML = counter;
        }
        });



