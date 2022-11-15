//-----------------------------------------------(global functions)

function discount(element4, element3) {
  if (element4 != 0) {
    const multiplication = element3 * element4;
    const division = multiplication / 100;
    const result = element3 - division;
    const aprox = Math.round(result);
    return aprox;
  }
  if (element4 === 0) {
    return element3;
  }
}

function srcImage(element2) {
  if (element2 === null || element2 === "") {
    const fakeImage = "https://via.placeholder.com/150";
    return fakeImage;
  } else {
    return element2;
  }
}

function generateCard(element2, element1, element4, element3) {
  const card = document.getElementById("card");
  card.innerHTML += `
      <div id='imTheCard'>
      <img id='imageProduct' src=${srcImage(element2)} alt=${element1} />
      <div>
      <h1 id='titleProduct'>${element1}</h1>
      <h3 id='priceProduct'>$ ${discount(element4, element3)}</h3>
      <button id='buttonCartShopping' >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 3l-.743 2h-1.929l-3.474 12h-13.239l-4.615-11h16.812l-.564 2h-13.24l2.937 7h10.428l3.432-12h4.195zm-15.5 15c-.828 0-1.5.672-1.5 1.5 0 .829.672 1.5 1.5 1.5s1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm6.9-7-1.9 7c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5z"/></svg>
      </button>
      </div>
      </div>`;
}

//-----------------------------------------------(this is the init products)
const allProducts = [];
function getProducts() {
  fetch("http://localhost:5000/product")
    .then((response) => response.json())
    .then((data) => {
      allProducts.push(data);
      allProducts.map((x) => {
        x.map((product) => {
          generateCard(product[2], product[1], product[4], product[3]);
        });
      });
    });
}

getProducts();
//-----------------------------------------------(this is the end of products)

//-----------------------------------------------(this is init of category)
const allProductsOfCategory = [];
function getCategory() {
  fetch("http://localhost:5000/category")
    .then((response) => response.json())
    .then((data) => {
      const categorys = document.getElementById("allCategorys");

      function goToSeeCategory() {
        categorys.style.display = "block";
      }
      const category = document.getElementById("category");
      category.addEventListener("click", goToSeeCategory);

      function exitCategory() {
        categorys.style.display = "none";
      }
      const x = document.getElementById("exitCategory");
      x.addEventListener("click", exitCategory);

      function goCategory(id) {
        categorys.style.display = "none";
        fetch(`http://localhost:5000/a_category/${id}`)
          .then((response) => response.json())
          .then((data) => {
            allProductsOfCategory.push(data);
            allProductsOfCategory.map((x) => {
              x.map((product) => {
                generateCard(product[2], product[1], product[4], product[3]);
              });
            });
          });
      }
      data.map((aCategory) => {
        const uele = document.getElementById("uele");
        uele.innerHTML += `<li class='elei' id='${aCategory[0]}' >${aCategory[1]}</li>`;
      });
      const elei = document.getElementsByClassName("elei");
      for (l of elei) {
        l.addEventListener("click", (e) => goCategory(e.target.id));
      }
    });
}
const dataCategory = getCategory();

//-----------------------------------------------(this is end of category)

//-----------------------------------------------(this is init of search)
const allProductsOfSearch = [];
function goSearch(e) {
  e.preventDefault();
  const search = document.getElementById("search").value;
  search.innerHTML = search;

  fetch(`http://localhost:5000/search/${search}`)
    .then((resp) => resp.json())
    .then((data) => {
      allProductsOfSearch.push(data);
      allProductsOfSearch.map((x) => {
        x.map((product) => {
          generateCard(product[2], product[1], product[4], product[3]);
        });
      });
    });

  return allProductsOfSearch;
}

const submnitSearch = document.getElementById("submitSearch");
submnitSearch.addEventListener("click", goSearch);

//-----------------------------------------------(this is end of search)

//config to see the elements

// function execute() {
//   if (allProductsOfSearch === "") {
//     console.log(allProductsOfSearch);
//     getProducts();
//   } else {
//     allProducts.map((x) => x.pop());
//   }

//   // if (allProductsOfCategory === "") {
//   //   getProducts();
//   // } else {
//   //   allProducts.map((x) => x.pop());
//   // }
// }
// execute();
// submnitSearch.addEventListener("click", execute);
