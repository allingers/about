// Mer om mig
const aboutButton = document.querySelector(".about-button");
const aboutMore = document.querySelector("#about-more");
const aboutLabel = document.querySelector(".button-label");
aboutMore.classList.add("is-collapsible");
aboutMore.inert = true;
aboutButton.hidden = false;
aboutButton.setAttribute("aria-expanded", "false");
aboutLabel.textContent = "Mer om mig";

aboutButton.addEventListener("click", () => {
  const isOpen = aboutButton.classList.toggle("is-open");
  aboutMore.classList.toggle("is-open", isOpen);
  aboutButton.setAttribute("aria-expanded", String(isOpen));
  aboutMore.inert = !isOpen;

  if (isOpen) {
    aboutLabel.textContent = "Visa mindre";
  } else {
    aboutLabel.textContent = "Mer om mig";
  }
});

// Flikar
const tabList = document.querySelector(".tabs");
const tabs = Array.from(tabList.querySelectorAll("button"));
const panels = tabs.map((tab) =>
  document.getElementById(tab.getAttribute("aria-controls")),
);
tabList.hidden = false;
tabList.setAttribute("role", "tablist");

function selectTab(index) {
  tabs.forEach((tab, tabIndex) => {
    const isSelected = index === tabIndex;
    tab.setAttribute("aria-selected", String(isSelected));
    tab.tabIndex = isSelected ? 0 : -1;
    panels[tabIndex].hidden = !isSelected;
  });
}

tabs.forEach((tab, index) => {
  tab.setAttribute("role", "tab");
  panels[index].setAttribute("role", "tabpanel");
  panels[index].tabIndex = 0;
  tab.addEventListener("click", () => selectTab(index));
  tab.addEventListener("keydown", (event) => {
    let nextIndex = index;
    if (event.key === "ArrowRight") {
      nextIndex = (index + 1) % tabs.length;
    } else if (event.key === "ArrowLeft") {
      nextIndex = (index - 1 + tabs.length) % tabs.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = tabs.length - 1;
    } else {
      return;
    }
    event.preventDefault();
    selectTab(nextIndex);
    tabs[nextIndex].focus();
  });
});
selectTab(0);

// Skriv, pausa, sudda och byt titel. Skärmläsare får en separat, fast text.
const typewriter = document.querySelector(".typewriter");
const animationButton = document.querySelector(".animation-button");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const titles = ["UX-student", "Webbutvecklare"];
let titleIndex = 0;
let characterIndex = titles[0].length;
let deleting = true;
let paused = false;
let timer;

function typeNextCharacter() {
  if (paused || reducedMotion.matches || document.hidden) return;

  const title = titles[titleIndex];
  characterIndex += deleting ? -1 : 1;
  typewriter.textContent = title.slice(0, characterIndex);
  let delay = deleting ? 65 : 110;

  if (!deleting && characterIndex === title.length) {
    deleting = true;
    delay = 1800;
  } else if (deleting && characterIndex === 0) {
    deleting = false;
    titleIndex = (titleIndex + 1) % titles.length;
    delay = 350;
  }
  timer = window.setTimeout(typeNextCharacter, delay);
}

function updateAnimation() {
  window.clearTimeout(timer);
  animationButton.hidden = reducedMotion.matches;
  if (reducedMotion.matches) {
    typewriter.textContent = "UX-student · Webbutvecklare";
  } else {
    typewriter.textContent = titles[titleIndex].slice(0, characterIndex);
    if (!paused && !document.hidden) {
      timer = window.setTimeout(typeNextCharacter, 1800);
    }
  }
}

animationButton.addEventListener("click", () => {
  paused = !paused;
  animationButton.textContent = paused
    ? "Starta textanimation"
    : "Pausa textanimation";
  updateAnimation();
});
reducedMotion.addEventListener("change", updateAnimation);
document.addEventListener("visibilitychange", updateAnimation);
updateAnimation();

// Tona in innehåll en gång när det scrollas in i bild.
// Utan stöd för IntersectionObserver eller med minskad rörelse är allt synligt.
if ("IntersectionObserver" in window && !reducedMotion.matches) {
  const revealElements = document.querySelectorAll(
    ".about-image, .about-text, .section-label, .tabs, .tab-panels, .journey > h2, .timeline li, .contact-button, footer",
  );

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) reveal(entry.target);
      });
    },
    { rootMargin: "0px 0px -24px 0px" },
  );

  function reveal(element) {
    element.classList.remove("reveal-pending");
    revealObserver.unobserve(element);
  }

  revealElements.forEach((element) => {
    // Dölj inte innehåll som redan syns, exempelvis efter en omladdning.
    if (element.getBoundingClientRect().top >= window.innerHeight) {
      element.classList.add("scroll-reveal", "reveal-pending");
      revealObserver.observe(element);
      // Tangentbordsfokus ska aldrig hamna i osynligt innehåll.
      element.addEventListener("focusin", () => reveal(element), {
        once: true,
      });
    }
  });

  reducedMotion.addEventListener("change", () => {
    if (reducedMotion.matches) {
      revealElements.forEach(reveal);
      revealObserver.disconnect();
    }
  });
}
