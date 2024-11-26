// Product Data
const products = [
    { id: 1, name: "OnePlus Open", category: "phone", price: 149000, image: "https://image01-in.oneplus.net/media/202408/01/3525425e22569a002b8428519a478d5a.png?x-amz-process=image/format,webp/quality,Q_80" },
    { id: 2, name: "OnePlus 12", category: "phone", price: 64999, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkYB_FQDo6UrLo08kyW8898l_Dwn1IQ3_LNw&s" },
    { id: 3, name: "OnePlus 12R", category: "phone", price: 45999, image: "https://image01-in.oneplus.net/media/202407/02/7d3f70706599c4f719ea58daffbf2d30.png?x-amz-process=image/format,webp/quality,Q_80" },
    { id: 4, name: "OnePlus Nord CE4", category: "phone", price: 24999, image: "https://image01-in.oneplus.net/media/202407/04/a659a16b8b15ffa1eb5c512dfad55cbf.png?x-amz-process=image/format,webp/quality,Q_80" },

    { id: 5, name: "OnePlus Buds 3 Pro", category: "audio", price: 13999, image: "https://image01-in.oneplus.net/media/202408/16/1a6fba7d5b80dc79e9e547bebd9849cd.png?x-amz-process=image/format,webp/quality,Q_80" },
    { id: 6, name: "OnePlus Nord Buda 3", category: "audio", price: 2699, image: "https://image01-in.oneplus.net/media/202409/02/94234eb859fb2c66e39137e1d000eb89.png?x-amz-process=image/format,webp/quality,Q_80" },
    { id: 7, name: "OnePlus Bullets Wireless Z2 ANC", category: "audio", price: 1999, image: "https://image01-in.oneplus.net/media/202406/19/9c9806ee60643ab92c71db1da6d55c2c.png?x-amz-process=image/format,webp/quality,Q_80" },
];

// DOM Elements
const categoryFilter = document.getElementById("category-filter");
const priceFilter = document.getElementById("price-filter");
const productList = document.getElementById("product-list");

// Function to render products
function renderProducts(filteredProducts) {
    productList.innerHTML = "";
    if (filteredProducts.length === 0) {
        productList.innerHTML = "<p>No products found</p>";
        return;
    }
    filteredProducts.forEach(product => {
        const productCard = `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p class="price">₹${product.price}</p>
            </div>
        `;
        productList.innerHTML += productCard;
    });
}


renderProducts(products);

// Filtering Logic
function filterProducts() {
    const selectedCategory = categoryFilter.value;
    const selectedPrice = priceFilter.value;

    let filteredProducts = products;

    // Filter by category
    if (selectedCategory !== "all") {
        filteredProducts = filteredProducts.filter(product => product.category === selectedCategory);
    }

    // Filter by price
    if (selectedPrice !== "all") {
        filteredProducts = filteredProducts.filter(product => {
            const price = product.price;
            if (selectedPrice === "0-10,000") return price < 10001;
            if (selectedPrice === "10,001-50,000") return price >= 10001 && price <= 50000;
            if (selectedPrice === "50,001-1,00,000") return price >= 50001 && price <= 100000;
            if (selectedPrice === "1,00,001+") return price > 100001;
        });
    }

    renderProducts(filteredProducts);
}


categoryFilter.addEventListener("change", filterProducts);
priceFilter.addEventListener("change", filterProducts);
