// --- PAGE NAVIGATION BAR ---
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", (e) => {
  e.stopPropagation();

  navLinks.classList.toggle("show");

  if (navLinks.classList.contains("show")) {
    menuToggle.classList.replace("fa-bars", "fa-times");
  } else {
    menuToggle.classList.replace("fa-times", "fa-bars");
  }
  menuToggle.style.color = "#0a0aff";
});

// --- Close Menu if Clicking Outside ---
document.addEventListener("click", (e) => {
  if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
    navLinks.classList.remove("show");
    menuToggle.classList.replace("fa-times", "fa-bars");
  }
});

// --- SELECT (Search-Category) ELEMENT ---
document
  .getElementById("select-category")
  .addEventListener("change", function () {
    const target = this.value;
    if (!target) return;
    const article = document.querySelector(target);
    if (article) {
      article.scrollIntoView({ behavior: "smooth" });
    }
  });

document.getElementById("shop-btn").addEventListener("click", () => {
  const message = document.querySelector(".message");

  message.textContent = "Scroll down to pick items.";

  setTimeout(() => {
    message.textContent = "";
  }, 3000); // 3000ms = 3 seconds
});

// --- CART COUNTER STATE ---
const counterElement = document.querySelector(".cart-count");
let counter = 0;

const addToCartBtns = document.querySelectorAll(".cta-btn");

addToCartBtns.forEach((button) => {
  button.addEventListener("click", () => {
    counter++;

    counterElement.textContent = counter;
  });
});

let cart = [];
// Map each article to its product data using data-* attributes.
// Attach "Add to Cart" listeners to every button
document.querySelectorAll(".cta-btn").forEach(function (button) {
  button.addEventListener("click", function () {
    // Walk up to the parent <article> to read the product data
    const article = button.closest("article");
    const name = article.dataset.name; // Reads data-name="..."
    const price = Number(article.dataset.price); // Reads data-price="..."

    cart.push({ name, price }); // Add to array
    renderCart(); // Refresh the dialog list
  });
});

// This one function rebuilds the cart dialog from scratch every time
function renderCart() {
  const listItems = document.querySelectorAll("#dialog li");
  const spans = document.querySelectorAll("#dialog .item-selected-with-price");
  const removeBtns = document.querySelectorAll("#dialog .remove-item-btn");

  // Clear all existing rows first
  spans.forEach(function (span) {
    span.textContent = "";
  });
  removeBtns.forEach(function (btn) {
    btn.disabled = true;
  });

  // Fill in rows for each cart item
  cart.forEach(function (item, index) {
    spans[index].textContent = item.name + " — $" + item.price;
    removeBtns[index].disabled = false;

    // Attach remove listener fresh each time (override old ones)
    removeBtns[index].onclick = function () {
      cart.splice(index, 1); // remove this item from the array
      counter--;
      counterElement.textContent = counter;
      renderCart(); // re-render
    };
  });

  // Calculate and display the running total
  const total = cart.reduce(function (sum, item) {
    return sum + item.price;
  }, 0);

  const totalEl = document.getElementById("cart-total");
  if (totalEl) {
    totalEl.textContent = cart.length > 0 ? "Total: $" + total : "";
  }
}

// --- DISPLAY RANDOM HERO-IMAGE ---
const heroImages = [
  "https://res.cloudinary.com/doowcez6w/image/upload/v1780394921/bg-img1_yqayxb.jpg",
  "https://res.cloudinary.com/doowcez6w/image/upload/v1780394972/bg-img2_iyvgrw.jpg",
  "https://res.cloudinary.com/doowcez6w/image/upload/v1780394921/bg-img1_yqayxb.jpg",
];

const randomIndex = Math.floor(Math.random() * heroImages.length);

document.getElementById("hero-img").src = heroImages[randomIndex];

// --- DIALOG (Modal) BOX STATE ---
const dialog = document.getElementById("dialog");
const closeBtn = document.querySelector(".close-btn");
const openModalBtn = document.querySelector(".shopping-cart");
const checkoutBtn = document.querySelector(".checkout-btn");

openModalBtn.addEventListener("click", () => {
  dialog.showModal();
  document.body.style.overflow = "hidden";
});

checkoutBtn.addEventListener("click", () => {
  alert("Thank you for your patronage 💙\n Coming soon...!");
  setTimeout(() => {
    window.location.reload(); // Refresh page
  }, 1500);
});

closeBtn.addEventListener("click", () => {
  dialog.close();
  document.body.style.overflow = "";
  setTimeout(() => {
    window.location.reload(); // Refresh page 5second after triggering the Close button
  }, 5000);
});

// --- Close the modal when clicking outside of it ---
dialog.addEventListener("click", (e) => {
  const rect = dialog.getBoundingClientRect();

  const clickedOutside =
    e.clientX < rect.left ||
    e.clientX > rect.right ||
    e.clientY < rect.top ||
    e.clientY > rect.bottom;

  if (clickedOutside) {
    dialog.close();
    document.body.style.overflow = "";
  }
});

// --- CONTACT FORM HANDLE ---
const form = document.getElementById("contact-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      alert("Thank you! 😊\n Message sent successfully ✔");
      form.reset(); // Clears all inputs
    } else {
      alert("Failed to send message.");
    }
  } catch (error) {
    alert("Something went wrong.");
  }
});
