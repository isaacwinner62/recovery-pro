// Testimonial Carousel
document.addEventListener("DOMContentLoaded", function () {
  const testimonials = document.querySelectorAll(".testimonial");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  let currentIndex = 0;

  function showTestimonial(index) {
    testimonials.forEach((testimonial) =>
      testimonial.classList.remove("active")
    );
    testimonials[index].classList.add("active");
  }

  prevBtn.addEventListener("click", function () {
    currentIndex =
      (currentIndex - 1 + testimonials.length) % testimonials.length;
    showTestimonial(currentIndex);
  });

  nextBtn.addEventListener("click", function () {
    currentIndex = (currentIndex + 1) % testimonials.length;
    showTestimonial(currentIndex);
  });

  // Auto-rotate testimonials every 5 seconds
  setInterval(function () {
    currentIndex = (currentIndex + 1) % testimonials.length;
    showTestimonial(currentIndex);
  }, 5000);

  // Hamburger menu logic
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navLinks = document.getElementById("navLinks");

  // Create overlay for mobile nav
  let overlay = document.querySelector(".mobile-nav-overlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.className = "mobile-nav-overlay";
    document.body.appendChild(overlay);
  }

  function openMobileMenu() {
    navLinks.classList.add("open");
    mobileMenuBtn.classList.add("open");
    overlay.classList.add("active");
    mobileMenuBtn.setAttribute("aria-expanded", "true");
  }

  function closeMobileMenu() {
    navLinks.classList.remove("open");
    mobileMenuBtn.classList.remove("open");
    overlay.classList.remove("active");
    mobileMenuBtn.setAttribute("aria-expanded", "false");
  }

  mobileMenuBtn.addEventListener("click", function () {
    if (navLinks.classList.contains("open")) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  overlay.addEventListener("click", closeMobileMenu);

  // Close menu when a nav link is clicked (mobile only)
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", function () {
      if (window.innerWidth <= 768) {
        closeMobileMenu();
      }
    });
  });

  // Close menu when the cancel (close) button is clicked
  const closeMenuBtn = navLinks.querySelector(".close-mobile-menu-btn");
  if (closeMenuBtn) {
    closeMenuBtn.addEventListener("click", closeMobileMenu);
  }

  function checkScreenSize() {
    if (window.innerWidth > 768) {
      navLinks.classList.remove("open");
      mobileMenuBtn.classList.remove("open");
      overlay.classList.remove("active");
      navLinks.style.display = "flex";
      mobileMenuBtn.setAttribute("aria-expanded", "false");
    } else {
      navLinks.style.display = "";
    }
  }

  window.addEventListener("resize", checkScreenSize);
  checkScreenSize();
});

// === AUTH LOGIC FOR SIGNUP & LOGIN ===
document.addEventListener("DOMContentLoaded", function () {
  // SIGNUP PAGE LOGIC
  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
      e.preventDefault();
      // Get values
      const fullName = document.getElementById("fullName").value.trim();
      const email = document.getElementById("email").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const password = document.getElementById("password").value;
      // Save to localStorage
      const userData = { fullName, email, phone, password };
      localStorage.setItem("signupUser", JSON.stringify(userData));
      // Redirect to login
      window.location.href = "login.html";
    });
  }

  // LOGIN PAGE LOGIC
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    // Prefill if data exists
    const storedUser = localStorage.getItem("signupUser");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      document.getElementById("email").value = user.email || "";
      document.getElementById("password").value = user.password || "";
    }
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value;
      const storedUser = localStorage.getItem("signupUser");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user.email === email && user.password === password) {
          // Save current user and login state
          localStorage.setItem("currentUser", JSON.stringify(user));
          localStorage.setItem("isLoggedIn", "true");
          window.location.href = "dashboard.html";
        } else {
          // Show error
          const emailError = document.getElementById("emailError");
          const passwordError = document.getElementById("passwordError");
          if (emailError) {
            emailError.textContent = "Invalid email or password.";
            emailError.style.display = "block";
          }
          if (passwordError) {
            passwordError.textContent = "Invalid email or password.";
            passwordError.style.display = "block";
          }
        }
      }
    });
  }
});
