document.addEventListener("DOMContentLoaded", () => {
  const productGrid = document.getElementById("product-grid");
  const filterButtons = document.querySelectorAll(".filter-buttons button");

  // MODAL ELEMENTS
  const modal = document.getElementById("image-modal");
  const modalImage = document.getElementById("modal-image");
  const closeModal = document.querySelector(".close-modal");

  const whatsappNumber = "2348108634348";
  let allProducts = [];

  // FETCH PRODUCTS
  fetch("products.json")
    .then(response => response.json())
    .then(products => {
      allProducts = products;
      displayProducts("all");
    })
    .catch(error => console.error("Error loading products:", error));

  // DISPLAY PRODUCTS
  function displayProducts(category) {
    productGrid.innerHTML = "";

    const filteredProducts =
      category === "all"
        ? allProducts
        : allProducts.filter(p => p.category === category);

    filteredProducts.forEach(product => {
      const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        product.whatsappMessage
      )}`;

      const card = document.createElement("div");
      card.className = "product-card";

      card.innerHTML = `
        <img 
          src="${product.image}" 
          alt="${product.name}" 
          class="product-image"
        >
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <a 
          href="${whatsappLink}" 
          class="product-btn" 
          target="_blank"
        >
          Order via WhatsApp
        </a>
      `;

      // IMAGE MODAL LOGIC
      const img = card.querySelector(".product-image");
      img.addEventListener("click", () => {
        modal.style.display = "flex";
        modalImage.src = product.image;
        modalImage.alt = product.name;
      });

      productGrid.appendChild(card);
    });
  }

  // FILTER BUTTONS
  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      document
        .querySelector(".filter-buttons .active")
        .classList.remove("active");

      button.classList.add("active");
      displayProducts(button.dataset.category);
    });
  });

  // CLOSE MODAL
  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});
