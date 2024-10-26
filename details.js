require('dotenv').config();

// Cria a resposta detalhada do produto
function createResponseDetails(product) {
  return `
    <div class="row">
      <div class="col-md-5">
        <img class="details-img" src="${product.image}" alt="${product.title}">
      </div>
      <div class="col-md-7">
        <h3 class="ratings">${displayRating(product.rating.rate)}</h3>
        <h1 class="title">${product.title}</h1>
        <p class="card-text category">${product.description}</p>
        <p class="stock">Season: ${product.season}</p>
        <h3 class="card-text price">${product.price} USD</h3>
      </div>
    </div>
  `;
}

// Busca os id na url
function getProductId() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('id');
}

// Busca os dados do produto
async function fetchProduct() {
  const productId = getProductId(); // Função que obtém o ID do produto
  const url = `${process.env.API_URL}/products/${productId}?key=${process.env.API_KEY}`; // Usando a variável de ambiente
  const response = await fetch(url);
  return response.json();
}

// Exibe a classificação em estrelas
function displayRating(rate) {
  const roundedRate = Math.round(rate);
  let stars = "★".repeat(roundedRate) + "☆".repeat(5 - roundedRate);
  return stars;
}

// Renderiza a página do produto
async function renderPage() {
  const product = await fetchProduct();
  const productDetails = createResponseDetails(product);
  const productDetailsContainer = document.querySelector('#response-details');
  productDetailsContainer.innerHTML = productDetails;
}

// Inicializa a renderização da página
renderPage();
