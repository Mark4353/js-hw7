document.addEventListener("DOMContentLoaded", function () {
  const bookmarkInput = document.getElementById("bookmarkInput");
  const addBookmarkBtn = document.getElementById("addBookmarkBtn");
  const bookmarkList = document.getElementById("bookmarkList");

  function loadBookmarks() {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    bookmarkList.innerHTML = "";

    bookmarks.forEach((bookmark, index) => {
      const li = document.createElement("li");
      const link = document.createElement("a");
      link.href = bookmark;
      link.textContent = bookmark;
      link.target = "_blank";
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "✖";
      deleteBtn.classList.add("delete");
      deleteBtn.onclick = function () {
        bookmarks.splice(index, 1);
        saveBookmarks(bookmarks);
      };

      li.appendChild(link);
      li.appendChild(deleteBtn);
      bookmarkList.appendChild(li);
    });
  }

  function saveBookmarks(bookmarks) {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    loadBookmarks();
  }

  addBookmarkBtn.addEventListener("click", function () {
    const url = bookmarkInput.value.trim();
    if (url) {
      const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
      bookmarks.push(url);
      saveBookmarks(bookmarks);

      bookmarkInput.value = "";
    }
  });

  loadBookmarks();
});

// 2

document.addEventListener("DOMContentLoaded", function () {
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const saveBtn = document.getElementById("saveBtn");

  function loadFormData() {
    const savedUsername = localStorage.getItem("username");
    const savedPassword = localStorage.getItem("password");

    if (savedUsername) {
      usernameInput.value = savedUsername;
    }
    if (savedPassword) {
      passwordInput.value = savedPassword;
    }
  }

  function saveFormData() {
    localStorage.setItem("username", usernameInput.value);
    localStorage.setItem("password", passwordInput.value);
  }

  saveBtn.addEventListener("click", saveFormData);

  loadFormData();
});

// 3

const products = [
  {
    id: 1,
    name: "Laptop",
    price: 1500,
    description: "A high-performance laptop for all your needs.",
  },
  {
    id: 2,
    name: "Smartphone",
    price: 700,
    description: "A modern smartphone with an excellent camera.",
  },
  {
    id: 3,
    name: "Headphones",
    price: 200,
    description: "Noise-cancelling headphones for better focus.",
  },
];

const Handlebars = require("handlebars");
const fs = require("fs");

const templateSource = fs.readFileSync("src/template.hbs", "utf8");
const template = Handlebars.compile(templateSource);

function renderProducts(productsToRender) {
  return productsToRender.map((product) => template(product)).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("product-list").innerHTML = renderProducts(products);
   document.getElementById("search").addEventListener("input", function () {
    
    const searchTerm = this.value.toLowerCase() ;

    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm)
    );

    document.getElementById("product-list").innerHTML =
      renderProducts(filteredProducts);
  });
}) ;
