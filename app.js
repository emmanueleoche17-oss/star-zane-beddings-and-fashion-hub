const productGrid = document.getElementById("productGrid");
const loadingText = document.getElementById("loading");
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImage");
const closeModal = document.getElementById("closeModal");
const filterButtons = document.querySelectorAll(".filter-buttons button");

const whatsappNumber = "2348108634348";
let allProducts = [];

/* FETCH PRODUCTS */
fetch("products.json?v=" + Date.now())
  .then(res => res.json())
  .then(data => {
    allProducts = data;
    renderProducts(allProducts);
    loadingText.style.display = "none";
  })
  .catch(err => {
    loadingText.textContent = "Failed to load products.";
    console.error("Error loading products:", err);
  });

/* RENDER PRODUCTS */
function renderProducts(products) {
  productGrid.innerHTML = "";

  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.setAttribute("data-category", product.category || "all");

    const message = encodeURIComponent(
      `Hello, I want to pre-order:\n${product.name}\nPrice: ${product.price}`
    );

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" loading="lazy" />
      <h3>${product.name}</h3>
      <p>${product.price}</p>
      <a class="product-btn"
         href="https://wa.me/${whatsappNumber}?text=${message}"
         target="_blank">
         Order via WhatsApp
      </a>
    `;

    /* IMAGE MODAL */
    card.querySelector("img").addEventListener("click", () => {
      modal.style.display = "flex";
      modalImg.src = product.image;
    });

    productGrid.appendChild(card);
  });
}

/* MODAL CLOSE */
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

modal.addEventListener("click", e => {
  if (e.target === modal) modal.style.display = "none";
});

/* FILTER LOGIC */
filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector(".filter-buttons .active").classList.remove("active");
    btn.classList.add("active");

    const filter = btn.dataset.filter;

    if (filter === "all") {
      renderProducts(allProducts);
    } else {
      renderProducts(allProducts.filter(p => p.category === filter));
    }
  });
});
