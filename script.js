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

// --- COUNTER UPDATING ---
const counterElement = document.querySelector(".cart-count");
let counter = 0;

const addToCartBtns = document.querySelectorAll(".cta-btn");

addToCartBtns.forEach((button) => {
  button.addEventListener("click", () => {
    counter++;

    counterElement.textContent = counter;
  });
});

// --- DISPLAY RANDOM HERO-IMAGE ---
const heroImages = [
  "https://res.cloudinary.com/doowcez6w/image/upload/v1780394921/bg-img1_yqayxb.jpg",
  "https://res.cloudinary.com/doowcez6w/image/upload/v1780394972/bg-img2_iyvgrw.jpg",
  "https://res.cloudinary.com/doowcez6w/image/upload/v1780394921/bg-img1_yqayxb.jpg"
];

const randomIndex = Math.floor(Math.random() * heroImages.length);

document.getElementById("hero-img").src = heroImages[randomIndex];

// --- PAGE DIALOG (Modal) BOX ---
const dialog = document.getElementById("dialog");
const closeBtn = document.querySelector(".close-btn");
const openModalBtn = document.querySelector(".shopping-cart");

openModalBtn.addEventListener("click", () => {
  dialog.showModal();
  document.body.style.overflow = "hidden";
});

closeBtn.addEventListener("click", () => {
  dialog.close();
  document.body.style.overflow = "";
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

// --- REDUNDANT FOR FUTURE USE ONLY ---
// const dialog = document.getElementById("dialog");
// const closeBtn = document.querySelector(".close-btn");
// const openModalBtn = document.querySelector(".shopping-cart");

// openModalBtn.addEventListener("click", () => {
//   // Save exactly where the user is on the page right now
//   const scrollY = window.scrollY;
//   const scrollX = window.scrollX;

//   dialog.showModal();
//   document.body.style.overflow = "hidden";

//   // Snap the page back to where the user was (browser may have moved it)
//   window.scrollTo(scrollX, scrollY);
// });

// closeBtn.addEventListener("click", () => {
//   // Save position again before closing (just in case)
//   const scrollY = window.scrollY;
//   const scrollX = window.scrollX;

//   dialog.close();
//   document.body.style.overflow = "";

//   // Restore position after closing
//   window.scrollTo(scrollX, scrollY);
// });

// // --- FORM VALIDATION ---
// const form = document.querySelector("form");

// // --- VALIDATION FUNCTION ---
// function validateField(input) {
//   if (input.checkValidity()) {
//     input.style.borderColor = "#004643"; // green = valid
//   } else {
//     input.style.borderColor = "#aa0606"; // red = invalid
//   }
// }

// // --- GRAB ALL INPUTS ---
// const nameInput = document.getElementById("full-name");
// const userEmail = document.getElementById("email");
// const comment = document.getElementById("comments");

// // --- ATTACH BLUR LISTENERS (outside submit, so they work while user types) ---
// nameInput.addEventListener("blur", () => validateField(nameInput));
// userEmail.addEventListener("blur", () => validateField(userEmail));
// comment.addEventListener("blur", () => validateField(comment));

// // --- SUBMIT HANDLER ---
// form.addEventListener("submit", (e) => {
//   e.preventDefault(); // stops page reload

//   // Validate all fields once more on submit, in case user never clicked them
//   validateField(nameInput);
//   validateField(userEmail);
//   validateField(comment);

//   // Only proceed if the entire form is valid
//   if (form.checkValidity()) {
//     // console.log("Form submitted successfully!");
//     form.reset(); // clears all inputs

//     // Reset border colors after clearing (reset() doesn't clear styles)
//     nameInput.style.borderColor = "";
//     userEmail.style.borderColor = "";
//     comment.style.borderColor = "";
//   }
// });
