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
// SIDEBAR ACTIVE PAGE
// --------------------------------
// The active page is set in each HTML file. Keep it persistent while scrolling.


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

    if (!bibtexContent || !bibtexModal) {
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

  if (!bibtexModal) {
    return;
  }

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

if (bibtexCopy && bibtexContent) {

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


// --------------------------------
// NEWS ARCHIVE
// --------------------------------

const recentNews =
  document.getElementById("recent-news");

const olderNews =
  document.getElementById("older-news");

const archive =
  document.getElementById("news-archive");

const archiveToggle =
  document.getElementById("news-archive-toggle");


if (
  recentNews &&
  olderNews &&
  archive &&
  archiveToggle
) {

  const MAX_RECENT_NEWS = 5;

  const newsItems =
    Array.from(
      recentNews.querySelectorAll(".news-item")
    );


  // Sort news by date

  newsItems.sort((a, b) => {

    const dateA =
      new Date(a.dataset.date);

    const dateB =
      new Date(b.dataset.date);

    return dateB - dateA;

  });


  // Keep five most recent items visible

  newsItems.forEach((item, index) => {

    if (index < MAX_RECENT_NEWS) {

      recentNews.appendChild(item);

    }

    else {

      olderNews.appendChild(item);

    }

  });


  // Show or hide archive button

  if (olderNews.children.length === 0) {

    archive.hidden = true;

  }

  else {

    archive.hidden = false;

  }


  // Open or close archive

  archiveToggle.addEventListener(
    "click",
    () => {

      const isOpen =
        archiveToggle.getAttribute(
          "aria-expanded"
        ) === "true";


      archiveToggle.setAttribute(
        "aria-expanded",
        String(!isOpen)
      );


      olderNews.hidden =
        isOpen;


      const label =
        archiveToggle.querySelector(
          "span:first-child"
        );


      if (label) {

        label.textContent =
          isOpen
            ? "View older news"
            : "Hide older news";

      }

    }
  );

}


// --------------------------------
// PUBLICATION FILTERS
// --------------------------------

const publicationFilters =
  document.querySelectorAll(".pub-filter");

const publications =
  document.querySelectorAll(".full-publication");

const publicationSections =
  document.querySelectorAll(".publication-year-section");


if (
  publicationFilters.length > 0 &&
  publications.length > 0
) {

  function filterPublications(selectedCategory) {

    publicationSections.forEach((section) => {

      const sectionPublications =
        section.querySelectorAll(
          ".full-publication"
        );

      let visibleCount = 0;


      sectionPublications.forEach(
        (publication) => {

          const category =
            publication.getAttribute(
              "data-category"
            );


          /*
            MAIN WORK
            ---------
            Shows:
            - Peer-reviewed papers
            - Extended abstracts
            - Organized workshops

            Does NOT show:
            - Other
          */

          const shouldShow =
            selectedCategory === "all"
              ? category !== "other"
              : category === selectedCategory;


          if (shouldShow) {

            publication.style.display = "";

            visibleCount++;

          }

          else {

            publication.style.display = "none";

          }

        }
      );


      // Hide an entire year if nothing
      // in that year matches the filter

      if (visibleCount > 0) {

        section.style.display = "";

      }

      else {

        section.style.display = "none";

      }

    });

  }


  publicationFilters.forEach((filter) => {

    filter.addEventListener(
      "click",
      () => {

        const selectedCategory =
          filter.getAttribute(
            "data-filter"
          );


        // Update active filter

        publicationFilters.forEach(
          (button) => {

            button.classList.remove(
              "active"
            );

          }
        );


        filter.classList.add(
          "active"
        );


        // Apply selected filter

        filterPublications(
          selectedCategory
        );

      }
    );

  });


  /*
    Default publication view:
    MAIN WORK

    "Other" only appears when the
    visitor explicitly selects Other.
  */

  filterPublications("all");

}


// --------------------------------
// LIGHT / DARK MODE
// --------------------------------

const themeToggle =
  document.querySelector(".theme-toggle");


function applyTheme(theme) {

  document.documentElement.setAttribute(
    "data-theme",
    theme
  );


  if (themeToggle) {

    const next =
      theme === "dark"
        ? "light"
        : "dark";


    themeToggle.setAttribute(
      "aria-label",
      `Switch to ${next} mode`
    );


    themeToggle.setAttribute(
      "title",
      `Switch to ${next} mode`
    );

  }

}


// Light is intentionally the default,
// unless the visitor has made a choice before.

applyTheme(
  localStorage.getItem("kc-theme") ||
  "light"
);


if (themeToggle) {

  themeToggle.addEventListener(
    "click",
    () => {

      const current =
        document.documentElement.getAttribute(
          "data-theme"
        ) || "light";


      const next =
        current === "dark"
          ? "light"
          : "dark";


      localStorage.setItem(
        "kc-theme",
        next
      );


      applyTheme(next);

    }
  );

}


// --------------------------------
// PUBLICATION SEARCH
// --------------------------------

const publicationSearch =
  document.getElementById(
    "publication-search"
  );

const publicationSearchClear =
  document.getElementById(
    "publication-search-clear"
  );

const publicationSearchStatus =
  document.getElementById(
    "publication-search-status"
  );


if (
  publicationSearch &&
  publications.length > 0
) {

  let currentPublicationFilter =
    "all";


  function publicationMatchesCategory(
    publication
  ) {

    const category =
      publication.getAttribute(
        "data-category"
      );


    return currentPublicationFilter === "all"
      ? category !== "other"
      : category === currentPublicationFilter;

  }


  function applyPublicationSearchAndFilter() {

    const query =
      publicationSearch.value
        .trim()
        .toLowerCase();


    let totalVisible = 0;


    publicationSections.forEach(
      (section) => {

        let visibleInSection = 0;


        section
          .querySelectorAll(
            ".full-publication"
          )
          .forEach(
            (publication) => {

              const matchesText =
                !query ||
                publication.textContent
                  .toLowerCase()
                  .includes(query);


              const show =
                publicationMatchesCategory(
                  publication
                ) &&
                matchesText;


              publication.style.display =
                show ? "" : "none";


              if (show) {

                visibleInSection++;

                totalVisible++;

              }

            }
          );


        section.style.display =
          visibleInSection
            ? ""
            : "none";

      }
    );


    publicationSearchClear.hidden =
      !query;


    if (publicationSearchStatus) {

      publicationSearchStatus.textContent =
        query
          ? `${totalVisible} ${
              totalVisible === 1
                ? "result"
                : "results"
            }`
          : "";

    }

  }


  publicationSearch.addEventListener(
    "input",
    applyPublicationSearchAndFilter
  );


  publicationSearchClear?.addEventListener(
    "click",
    () => {

      publicationSearch.value =
        "";

      publicationSearch.focus();

      applyPublicationSearchAndFilter();

    }
  );


  // Run after the existing category-filter
  // click handler, then combine both constraints.

  publicationFilters.forEach(
    (filter) => {

      filter.addEventListener(
        "click",
        () => {

          currentPublicationFilter =
            filter.getAttribute(
              "data-filter"
            ) || "all";


          applyPublicationSearchAndFilter();

        }
      );

    }
  );

}

// --------------------------------
// BACK TO TOP
// --------------------------------

const backToTop =
  document.querySelector(".back-to-top");


if (backToTop) {

  function updateBackToTop() {

    if (window.scrollY > 20) {

      backToTop.classList.add("visible");

    }

    else {

      backToTop.classList.remove("visible");

    }

  }


  window.addEventListener(
    "scroll",
    updateBackToTop,
    { passive: true }
  );


  // Check position when page first loads
  updateBackToTop();

}
// --------------------------------
// RESEARCH PROJECT MODALS
// --------------------------------
const projectData = {
  privacy: {
    kicker: "Privacy",
    title: "When technology crosses a line.",
    intro: "I study how people experience privacy violations, the harms that follow, and where existing privacy frameworks fail to capture those experiences.",
    projects: [
      { name: "Privacy incidents & harms", text: "A mixed-methods project examining how people describe privacy incidents and their consequences, with the goal of understanding where established privacy-harm taxonomies align with, or miss, lived experience." },
      { name: "Privacy education for autistic adults", text: "Work examining how privacy education can better support autistic adults in recognizing and navigating privacy risks online." }
    ],
    pastProjects: [
      { name: "Digital contact tracing & public-health privacy", text: "Research examining how people think about privacy, disclosure, and adoption of digital contact-tracing technologies in public-health contexts, including how political identity can shape willingness to adopt these systems." }
    ],
    publications: [
      { title: "PRISM: Evaluating a Rule-Based, Scenario-Driven Social Media Privacy Education Program for Young Autistic Adults", meta: "CSCW · 2026", url: "https://dl.acm.org/doi/10.1145/3816987" },
      { title: "A House Divided: How U.S. Politics Could Shape Contact-Tracing Adoption in Future Pandemics", meta: "CHI · 2025", url: "https://dl.acm.org/doi/full/10.1145/3706598.3713645" }
    ]
  },
  ai: {
    kicker: "Responsible AI",
    title: "Who bears the AI harms we overlook?",
    intro: "I study how generative AI systems affect people whose experiences are often overlooked in technology design and evaluation, and how those harms can be identified and measured more effectively.",
    projects: [
      { name: "Evaluating GenAI harms", text: "Developing approaches for identifying observable indicators of generative-AI harms, with a focus on autistic people and other populations whose experiences may not be captured by standard evaluation practices." },
      { name: "Autism & generative-AI chatbots", text: "Research examining how autistic adults perceive and respond to persuasive generative-AI conversational agents, including their use in targeted advertising contexts." }
    ],
    pastProjects: [],
    publications: [
      { title: "Persuasiveness of Conversational Agents for Targeted Advertising: Autism and Gen-AI Chatbots", meta: "CSCW · 2025", url: "https://dl.acm.org/doi/abs/10.1145/3757645" }
    ]
  },
  social: {
    kicker: "Social Computing",
    title: "Being human through a screen.",
    intro: "I study how technology shapes communication, relationships, social cues, and the expectations people negotiate when interacting online.",
    projects: [
      { name: "Autistic adults & social media", text: "A longitudinal diary and interview study examining autistic adults’ day-to-day experiences with social media, including how platform use relates to social experiences and emotional outcomes." },
      { name: "Autistic adults & online messaging", text: "Interview research exploring how autistic adults navigate online messaging, social expectations, communication norms, and the ways technologies can amplify or reduce communication challenges." }
    ],
    pastProjects: [],
    publications: []
  }
};

const projectModal = document.querySelector("#project-modal");
const projectModalContent = document.querySelector("#project-modal-content");
let projectModalTrigger = null;

function projectModalMarkup(data) {
  const projects = data.projects.map(project => `
    <div class="project-item">
      <h4>${project.name}</h4>
      <p>${project.text}</p>
    </div>`).join("");
  const pastProjects = data.pastProjects?.length ? `
    <div class="project-modal-section">
      <h3>Past projects</h3>
      ${data.pastProjects.map(project => `
        <div class="project-item">
          <h4>${project.name}</h4>
          <p>${project.text}</p>
        </div>`).join("")}
    </div>` : "";
  const publications = data.publications.length ? `
    <div class="project-modal-section">
      <h3>Related publications</h3>
      ${data.publications.map(pub => `
        <a class="project-citation" href="${pub.url}" target="_blank" rel="noopener">
          <strong>${pub.title} ↗</strong>
          <span>${pub.meta}</span>
        </a>`).join("")}
    </div>` : "";
  return `
    <p class="project-modal-kicker">${data.kicker}</p>
    <h2 id="project-modal-title">${data.title}</h2>
    <p class="project-modal-intro">${data.intro}</p>
    <div class="project-modal-section">
      <h3>Current projects</h3>
      ${projects}
    </div>
    ${pastProjects}
    ${publications}`;
}

function openProjectModal(card) {
  if (!projectModal || !projectModalContent) return;
  const data = projectData[card.dataset.project];
  if (!data) return;
  projectModalTrigger = card;
  projectModalContent.innerHTML = projectModalMarkup(data);
  projectModal.classList.add("open");
  projectModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  projectModal.querySelector(".project-modal-close")?.focus();
}
function closeProjectModal() {
  if (!projectModal) return;
  projectModal.classList.remove("open");
  projectModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  projectModalTrigger?.focus();
}

document.querySelectorAll(".project-card").forEach(card => {
  card.addEventListener("click", () => openProjectModal(card));
  card.addEventListener("keydown", event => {
    if (event.key === "Enter" || event.key === " ") { event.preventDefault(); openProjectModal(card); }
  });
});
projectModal?.querySelectorAll("[data-modal-close]").forEach(el => el.addEventListener("click", closeProjectModal));
document.addEventListener("keydown", event => { if (event.key === "Escape" && projectModal?.classList.contains("open")) closeProjectModal(); });


// CSCW 2026 photo gallery
(() => {
  const openButton = document.getElementById('cscw-gallery-open');
  const gallery = document.getElementById('cscw-gallery');
  if (!openButton || !gallery) return;
  const photos = [
    ['images/cscw-prism-team.jpg', 'PRISM presentation with colleagues'],
    ['images/cscw-student-volunteers.jpg', 'CSCW 2026 student volunteer team'],
    ['images/cscw-privacy-workshop.jpg', 'Privacy research workshop in progress'],
    ['images/cscw-prism-presentation.jpg', 'Presenting PRISM at CSCW 2026'],
    ['images/cscw-organizing-team.jpg', 'CSCW 2026 organizing team dinner']
  ];
  const img = document.getElementById('cscw-gallery-image');
  const caption = document.getElementById('cscw-gallery-caption');
  const count = document.getElementById('cscw-gallery-count');
  const close = gallery.querySelector('.cscw-gallery-close');
  let current = 0;
  function render() { img.src = photos[current][0]; img.alt = photos[current][1]; caption.textContent = photos[current][1]; count.textContent = `${current + 1} / ${photos.length}`; }
  function dismiss() { gallery.hidden = true; document.body.style.overflow = ''; openButton.focus(); }
  openButton.addEventListener('click', () => { current = 0; render(); gallery.hidden = false; document.body.style.overflow = 'hidden'; close.focus(); });
  close.addEventListener('click', dismiss);
  gallery.querySelector('.cscw-gallery-prev').addEventListener('click', () => { current = (current - 1 + photos.length) % photos.length; render(); });
  gallery.querySelector('.cscw-gallery-next').addEventListener('click', () => { current = (current + 1) % photos.length; render(); });
  gallery.addEventListener('click', e => { if (e.target === gallery) dismiss(); });
  document.addEventListener('keydown', e => { if (gallery.hidden) return; if (e.key === 'Escape') dismiss(); if (e.key === 'ArrowLeft') { current = (current - 1 + photos.length) % photos.length; render(); } if (e.key === 'ArrowRight') { current = (current + 1) % photos.length; render(); } });
})();
