//URL da API
const apiURL = 'https://diwserver.vps.webdock.cloud/products';

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
          <a class"btn btn-primary" href="details.html?id=${product.id}">Detalhes</a>
        </div>
      </div>
    </div>
  `;
}

// Busca os produtos
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

// Gera url de busca
getUrl = (searchTerm, pageItems = 12) => {
  // Caso exista um termo pesquisado, retorna a url de busca
  if (searchTerm) {
    return `${apiURL}/search?query=${searchTerm}&page_items=60`
  }
  return `${apiURL}?page_items=${pageItems}`
}

// Troca os skeleton com cards de produtos
async function displayProducts(searchTerm = '') {
  const products = await fetchProducts(searchTerm);
  const productsDiv = $('#products');
  productsDiv.empty();
  if (products?.length) {
    products.forEach(function (product) {
      productsDiv.append(createProductCard(product));
    });
  } else {
    productsDiv.append(`
      <div class="col-12">
        <h5 class="text-center">Nenhum produto encontrado.</h2>
      </div>
    `);
  }
}

// Função para criar os cards skeleton
// recebe o número de skeletons como param
function renderSkeletons (skeletonQuantity) {
  const productsDiv = $('#products');
  for (let i = 0; i < skeletonQuantity; i++) {
    productsDiv.append(createSkeletonCard());
  }
}

//Função para renderizar mensagem de erro
function renderError () {
  const productsDiv = $('#products');
  productsDiv.empty();
  productsDiv.append(`
    <div class="col-12">
      <h2 class="text-center">Erro no servidor. Tente novamente.</h2>
    </div>
  `);
}

// Adiciona o eventListener para o input de busca
// ao digitarmos ENTER, executa a busca.
$("#searchInput").keyup(function(event) {
  if (event.keyCode === 13) {
    const searchTerm = $('#searchInput').val();
    displayProducts(searchTerm);
  }
});

// Adiciona o eventListener para o botão de busca
$('#searchButton').click(function () {
  const searchTerm = $('#searchInput').val();
  displayProducts(searchTerm);
});

