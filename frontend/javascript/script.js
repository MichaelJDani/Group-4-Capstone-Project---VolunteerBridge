// // ================= MENU TOGGLE =================
// const menuToggle = document.getElementById("menu-toggle");
// const navMenu = document.getElementById("nav-menu");

// menuToggle.addEventListener("click", () => {
//   navMenu.classList.toggle("active");
// });

// // ================= SCROLL HERO PARALLAX =================
// window.addEventListener("scroll", () => {
//   const hero = document.querySelector(".hero");
//   const scrollY = window.scrollY;
//   hero.style.backgroundPosition = `center ${scrollY * 0.4}px`;
// });

// // ================= PREMIUM SCROLL REVEAL =================
// const observer = new IntersectionObserver((entries) => {
//   entries.forEach(entry => {
//     if(entry.isIntersecting){
//       entry.target.classList.add("show");
//     }
//   });
// },{ threshold: 0.15 });

// document.querySelectorAll(".hidden, .box, .help-box, .about-left, .about-right")
//   .forEach(el => {
//     el.classList.add("hidden");
//     observer.observe(el);
//   });

// // ================= TABS =================
// const tabs = document.querySelectorAll(".tab-btn");
// const contents = document.querySelectorAll(".tab-content");

// tabs.forEach((tab, index) => {
//   tab.addEventListener("click", () => {
//     tabs.forEach(t => t.classList.remove("active"));
//     contents.forEach(c => {
//       c.classList.remove("active");
//       c.style.opacity = 0;
//     });

//     tab.classList.add("active");

//     setTimeout(() => {
//       contents[index].classList.add("active");
//       contents[index].style.opacity = 1;
//     }, 150);
//   });
// });

// ================= MENU TOGGLE =================
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

// ================= SCROLL HERO PARALLAX =================
window.addEventListener("scroll", () => {
  const hero = document.querySelector(".hero");
  const scrollY = window.scrollY;
  hero.style.backgroundPosition = `center ${scrollY * 0.4}px`;
});

// ================= PREMIUM SCROLL REVEAL =================
// Create observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("show");
      observer.unobserve(entry.target); // optional: stop observing once shown
    }
  });
}, { threshold: 0.15 });

// Select only elements that should animate, excluding hero container itself
const animateElements = document.querySelectorAll(
  ".hero-text.fade-in, .auth-card.fade-in, .vision .box, .help-box, .about-left, .about-right"
);

animateElements.forEach(el => {
  el.classList.add("hidden"); // start hidden
  observer.observe(el);
  // REMOVE the dynamic transitionDelay
});

// ================= TABS =================
const tabs = document.querySelectorAll(".tab-btn");
const contents = document.querySelectorAll(".tab-content");

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    contents.forEach(c => {
      c.classList.remove("active");
      c.style.opacity = 0;
    });

    tab.classList.add("active");

    setTimeout(() => {
      contents[index].classList.add("active");
      contents[index].style.opacity = 1;
    }, 150);
  });
});