function createStorage() {
  let products = [];
  return {
    setProductsBackup: function (newProducts) {
      return products = newProducts;
    },
    getProductsBackup: function () {
      return products;
    }
  };
}

const store = createStorage();


function filterProducts(search) {
  const filteredProducts = store.getProductsBackup().filter(function(productObj, index, array) {
    return productObj.title.toLowerCase().indexOf(search) >= 0 || productObj.category.toLowerCase().indexOf(search) >= 0;
  });
  
  renderProducts(filteredProducts);
}


function renderProducts(products) {
  let htmlStr = '';
  for (let product of products) {
    htmlStr += `
    <div class="col-sm-3 card-group mb-3">
      <div class="card product d-flex justify-content-between">
        <div class="p-4">
           <img class="card-img-top" src="${product.img}">
        </div>
        <div class="card-body">
            <h4 class="card-title font-weight-normal">${product.title}</h4>
            <p class="card-text font-weight-light text-capitalize">Category: ${product.category}</p>
        </div>
        <div class="mr-3">
            <p class="text-danger text-right">${product.price}</p>
        </div> 
      </div>
    </div>`
  };

  document.querySelector("#products").innerHTML = htmlStr;

  const cards = document.getElementsByClassName("card");
  for (let item = 0; item < cards.length; item++) {
    let card = cards[item];
    card.onmouseenter = function (e) {
      e.currentTarget.classList.add("border-info");
    }
    card.onmouseleave = function (e) {
      e.currentTarget.classList.remove("border-info");
    }
  }
}

document.querySelector('#search').value ='';

document.querySelector('#search').onkeyup = function (e) {
  const searchValue = e.currentTarget.value.trim().toLowerCase();
  filterProducts(searchValue);
}


fetch('https://fakestoreapi.com/products')
  .then(response => response.json())
  .then(function(data) {
    const filteredData = data.map(function (el) {
      return {
        img: el.image,
        title: el.title,
        category: el.category,
        price: el.price.toFixed(2)
      }
    })
    store.setProductsBackup(filteredData);
    renderProducts(filteredData);
  })





