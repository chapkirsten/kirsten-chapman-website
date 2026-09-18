// --------------------------------
// SCROLL REVEALS
// --------------------------------

const revealElements =
  document.querySelectorAll(
    ".big-statement, .intro-columns > div, .research-card, .publication, .personal-grid"
  );


revealElements.forEach((element) => {

  element.classList.add("reveal");

});


const observer =
  new IntersectionObserver(

    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add("visible");

        }

      });

    },

    {
      threshold: 0.12
    }

  );


revealElements.forEach((element) => {

  observer.observe(element);

});


// --------------------------------
// SIDEBAR ACTIVE SECTION
// --------------------------------

const sections =
  document.querySelectorAll(
    "#about, #research"
  );


const navLinks =
  document.querySelectorAll(
    ".sidebar nav a"
  );


window.addEventListener("scroll", () => {

  let current = "about";


  sections.forEach((section) => {

    const sectionTop =
      section.offsetTop - 200;


    if (window.scrollY >= sectionTop) {

      current =
        section.getAttribute("id");

    }

  });


  navLinks.forEach((link) => {

    link.classList.remove("active");


    if (
      link.getAttribute("href")
      === "#" + current
    ) {

      link.classList.add("active");

    }

  });

});