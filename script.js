
/* ===== MOBILE NAVIGATION ===== */

const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");

menuToggle.addEventListener("click", function () {
  navbar.classList.toggle("active");

  const isOpen = navbar.classList.contains("active");

  menuToggle.setAttribute("aria-expanded", isOpen);
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation menu" : "Open navigation menu"
  );

  menuToggle.textContent = isOpen ? "×" : "☰";
});

// Close the menu when a navigation link is clicked.
navbar.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function () {
    navbar.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    menuToggle.textContent = "☰";
  });
});

/* ===== PROJECT IMAGE PREVIEW ===== */

const projectImages = document.querySelectorAll(".project-image");
const imagePreview = document.getElementById("imagePreview");
const previewImage = document.getElementById("previewImage");
const previewCaption = document.getElementById("previewCaption");

const closePreview = document.getElementById("closePreview");
const prevImage = document.getElementById("prevImage");
const nextImage = document.getElementById("nextImage");

let currentImageIndex = 0;
let previousFocus = null;

// Open the selected image.
function openImage(index) {
  if (projectImages.length === 0) return;

  currentImageIndex =
    (index + projectImages.length) % projectImages.length;

  const selectedImage = projectImages[currentImageIndex];

  previewImage.src = selectedImage.src;
  previewImage.alt = selectedImage.alt;

  const caption = selectedImage
    .closest("figure")
    .querySelector("figcaption");

  previewCaption.textContent = caption
    ? caption.textContent
    : selectedImage.alt;

  imagePreview.classList.add("open");
  imagePreview.setAttribute("aria-hidden", "false");

  document.body.style.overflow = "hidden";
  closePreview.focus();
}

// Add a click event to each gallery image.
projectImages.forEach(function (image, index) {
  image.addEventListener("click", function () {
    previousFocus = image;
    openImage(index);
  });

  image.setAttribute("tabindex", "0");

  image.addEventListener("keydown", function (event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      previousFocus = image;
      openImage(index);
    }
  });
});

// Close the image preview.
function hidePreview() {
  imagePreview.classList.remove("open");
  imagePreview.setAttribute("aria-hidden", "true");

  previewImage.src = "";
  document.body.style.overflow = "";

  if (previousFocus) {
    previousFocus.focus();
  }
}

closePreview.addEventListener("click", hidePreview);

// Show the previous image.
prevImage.addEventListener("click", function () {
  openImage(currentImageIndex - 1);
});

// Show the next image.
nextImage.addEventListener("click", function () {
  openImage(currentImageIndex + 1);
});

// Close when the dark background is clicked.
imagePreview.addEventListener("click", function (event) {
  if (event.target === imagePreview) {
    hidePreview();
  }
});

// Keyboard controls.
document.addEventListener("keydown", function (event) {
  if (!imagePreview.classList.contains("open")) return;

  if (event.key === "Escape") {
    hidePreview();
  }

  if (event.key === "ArrowRight") {
    openImage(currentImageIndex + 1);
  }

  if (event.key === "ArrowLeft") {
    openImage(currentImageIndex - 1);
  }
});

/* ===== AUTOMATIC COPYRIGHT YEAR ===== */

document.getElementById("year").textContent =
  new Date().getFullYear();