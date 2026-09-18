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


// --------------------------------
// BIBTEX POPUP
// --------------------------------

const bibtexEntries = {

  prism2026: `@article{chapman2026prism,
  title={PRISM: Evaluating a Rule-Based, Scenario-Driven Social Media Privacy Education Program for Young Autistic Adults},
  author={Chapman, Kirsten and Smith, Garrett and Klabacka, Kaitlyn and Bills, Joseph Thomas and Bushman, Addisyn and Gabrielsen, Terisa and Wisniewski, Pamela J. and Page, Xinru},
  year={2026}
}`,

  chapman2025persuasiveness: `@article{chapman2025persuasiveness,
  title={Persuasiveness of Conversational Agents for Targeted Advertising: Autism and Gen-AI Chatbots},
  author={Chapman, Kirsten and Klabacka, Kaitlyn and Smith, Garrett and Page, Xinru},
  journal={Proceedings of the ACM on Human-Computer Interaction},
  volume={9},
  number={7},
  pages={1--23},
  year={2025},
  publisher={ACM New York, NY, USA}
}`,

  smith2025house: `@inproceedings{smith2025house,
  title={A House Divided: How US Politics Could Shape Contact-Tracing Adoption in Future Pandemics},
  author={Smith, Garrett and Chapman, Kirsten and Weng, Tzu-Yu and Hao, Haijing and Mondal, Mainack and Smith, Staci and Chen, Yunan and Page, Xinru},
  booktitle={Proceedings of the 2025 CHI Conference on Human Factors in Computing Systems},
  pages={1--20},
  year={2025}
}`,

  chapman2022privacy: `@inproceedings{chapman2022privacy,
  title={A privacy paradox? Impact of privacy concerns on willingness to disclose covid-19 health status in the United States},
  author={Chapman, Kirsten and Klimes, Melanie and Wellman, Braden and Smith, Garrett and Mondal, Mainack and Smith, Staci and Chen, Yunan and Hao, Haijing and Page, Xinru},
  booktitle={Companion Publication of the 2022 Conference on Computer Supported Cooperative Work and Social Computing},
  pages={159--162},
  year={2022}
}`,

  chapman2022others: `@article{chapmanothers,
  title={" Others Have the Right to Know": Determinants of Willingness to Share COVID-19-Related Health Symptoms},
  author={Chapman, Kirsten and Klimes, Melanie and Wellman, Braden and Smith, Garrett and Bonham, Madeline and Chen, Yunan and Smith, Staci and Mondal, Mainack and Page, Xinru}
}`

};


// Get popup elements

const bibtexModal =
  document.getElementById("bibtex-modal");

const bibtexContent =
  document.getElementById("bibtex-content");

const bibtexClose =
  document.getElementById("bibtex-close");

const bibtexCopy =
  document.getElementById("bibtex-copy");

const bibtexLinks =
  document.querySelectorAll(".bibtex-link");


// Open popup

bibtexLinks.forEach((link) => {

  link.addEventListener("click", (event) => {

    event.preventDefault();

    const citationID =
      link.dataset.bibtex;

    const citation =
      bibtexEntries[citationID];

    if (!citation) {
      return;
    }

    bibtexContent.textContent =
      citation;

    bibtexModal.classList.add("open");

    document.body.style.overflow =
      "hidden";

  });

});


// Close popup

function closeBibtexModal() {

  bibtexModal.classList.remove("open");

  document.body.style.overflow =
    "";

}


if (bibtexClose) {

  bibtexClose.addEventListener(
    "click",
    closeBibtexModal
  );

}


// Close when clicking outside the box

if (bibtexModal) {

  bibtexModal.addEventListener(
    "click",
    (event) => {

      if (event.target === bibtexModal) {

        closeBibtexModal();

      }

    }
  );

}


// Close with Escape key

document.addEventListener(
  "keydown",
  (event) => {

    if (
      event.key === "Escape" &&
      bibtexModal?.classList.contains("open")
    ) {

      closeBibtexModal();

    }

  }
);


// Copy BibTeX

if (bibtexCopy) {

  bibtexCopy.addEventListener(
    "click",
    async () => {

      const citation =
        bibtexContent.textContent;

      try {

        await navigator.clipboard.writeText(
          citation
        );

        bibtexCopy.textContent =
          "Copied!";

        setTimeout(() => {

          bibtexCopy.textContent =
            "Copy BibTeX";

        }, 1500);

      }

      catch (error) {

        console.error(
          "Could not copy BibTeX:",
          error
        );

      }

    }
  );

}