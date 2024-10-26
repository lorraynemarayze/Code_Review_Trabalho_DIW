// Verifica se o preço do produto está dentro do range selecionado
function isPriceMatch(price, priceRange) {
  if (priceRange === '') return true;

  const [min, max] = priceRange.split('-').map(Number);
  return (max ? price >= min && price <= max : price >= min);
}

// Verifica se a categoria do produto é a mesma selecionada
function isCategoryMatch(productCategory, selectedCategory) {
  return selectedCategory === '' || productCategory === selectedCategory;
}

// Combina os filtros de preço e categoria
function filterProducts(priceRange, selectedCategory) {
  const productsDiv = $('#products');
  const productCards = productsDiv.children();

  productCards.hide(); //adiciona display: none no css dos cards

  productCards.each(function () {
    const priceText = $(this).find('.price').text();
    const price = parseFloat(priceText);
    const productCategory = $(this).data('category');

    const priceMatch = isPriceMatch(price, priceRange);
    const categoryMatch = isCategoryMatch(productCategory, selectedCategory);
    
    if (priceMatch && categoryMatch) {
      $(this).show(); // Mostra apenas os cards que combinam
    }
  });
}

// Popula o select com as categorias
function populateCategories(categories) {
  const categorySelect = $('#categoryFilter');
  categories.forEach(category => {
    categorySelect.append(`<option value="${category}">${category}</option>`);
  });
}

// Adiciona event listeners
$('#priceFilter').change(function () {
  const selectedPriceRange = $(this).val();
  const selectedCategory = $('#categoryFilter').val();
  filterProducts(selectedPriceRange, selectedCategory);
});

$('#categoryFilter').change(function () {
  const selectedPriceRange = $('#priceFilter').val();
  const selectedCategory = $(this).val();
  displayProductsByCategory(selectedCategory);
});

$('#searchButton').click(function () {
  const searchTerm = $('#searchInput').val();
  displayProducts(searchTerm);
});

$("#searchInput").keyup(function (event) {
  if (event.keyCode === 13) {
    const searchTerm = $('#searchInput').val();
    displayProducts(searchTerm);
  }
});

// Busca a lista de categorias da API
async function initializeCategories() {
  try {
    const response = await fetch(`${apiURL}/categories`);
    const categories = await response.json();
    populateCategories(categories);
  } catch (error) {
    console.error(error);
  }
}

// Inicializa categorias na aplicação
initializeCategories();
