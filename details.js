function createResponseDetails(product) {
  return `
  <div class="row">
  <div class="col-md-5">
    <img class="details-img" src="${product.image}">
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
async function fetchProducts() {
  try {
    const productId = getProductId();
    const url = `https://diwserver.vps.webdock.cloud/products/${productId}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

function displayRating(rate) {
  const roundedRate = Math.round(rate);
  let stars = "";
  for (let i = 0; i < roundedRate; i++) {
    stars += "★";
  }
  for (let j = roundedRate; j < 5; j++) {
    stars += "☆";
  }
  return stars;
}

async function renderPage() {
  const product = await fetchProducts();
  const productDetails = createResponseDetails(product);
  const productDetailsContainer = document.querySelector('#response-details');
  productDetailsContainer.innerHTML = productDetails;
}

renderPage();