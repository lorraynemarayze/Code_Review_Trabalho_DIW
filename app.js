require('dotenv').config();

// Cria os cards skeleton
function createSkeletonCard() {
  return `
    <div class="col-lg-4 col-md-6">
      <div class="card card-skeleton">
        <div class="card-body">
          <div class="img"></div>
          <h5 class="card-title"></h5>
          <p class="card-text category"></p>
          <p class="card-text price"></p>
        </div>
      </div>
    </div>
  `;
}

// Cria os cards e popula com informações da response
function createProductCard(product) {
  return `
    <div class="col-lg-4 col-md-6" data-category="${product.category}">
      <div class="card">
        <img class="card-img-top" src="${product.image}" alt="${product.title}">
        <div class="card-body">
          <h5 class="card-title">${product.title}</h5>
          <p class="card-text category">${product.category}</p>
          <p class="card-text price">${product.price} USD</p>
          <a class="btn btn-primary" href="details.html?id=${product.id}">Detalhes</a>
        </div>
      </div>
    </div>
  `;
}

async function fetchProducts(searchTerm = '') {
  try {
    const url = getUrl(searchTerm, 21);
    const response = await fetch(url);
    const data = await response.json();
    return data?.products || data;
  } catch (error) {
    renderError();
    console.error(error);
  }
}

function getUrl(searchTerm, limit = 21) {
  const baseUrl = process.env.API_URL; // Usa a variável de ambiente
  return `${baseUrl}/search?query=${searchTerm}&limit=${limit}&key=${process.env.API_KEY}`;
}

// Troca os skeleton com cards de produtos
async function displayProducts(searchTerm = '') {
  const products = await fetchProducts(searchTerm);
  const productsDiv = $('#products');
  productsDiv.empty();
  
  if (products?.length) {
    products.forEach(product => {
      productsDiv.append(createProductCard(product));
    });
    AOS.init();
  } else {
    productsDiv.append(`
      <div class="col-12">
        <h5 class="text-center">Nenhum produto encontrado.</h5>
      </div>
    `);
  }
}

// Função para renderizar mensagem de erro
function renderError() {
  const productsDiv = $('#products');
  productsDiv.empty();
  productsDiv.append(`
    <div class="col-12">
      <h2 class="text-center">Erro no servidor. Tente novamente.</h2>
    </div>
  `);
}

// Função para criar os cards skeleton
function renderSkeletons(skeletonQuantity) {
  const productsDiv = $('#products');
  for (let i = 0; i < skeletonQuantity; i++) {
    productsDiv.append(createSkeletonCard());
  }
}

// Inicializa a aplicação
renderSkeletons(6);
displayProducts();
