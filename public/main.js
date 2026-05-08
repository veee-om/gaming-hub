const gameSections = [
  {
    title: "Solo",
    filterTag: "Solo",
    kicker: "Calm Focus",
    description: "Lean back into a self-paced challenge with polished, classic arcade energy.",
    themeClass: "theme-solo",
    games: [
      {
        title: "Snake",
        url: "https://veee-om.github.io/snake/",
        tag: "Solo",
        genre: "Arcade Reflex",
        description: "A clean solo revival of the classic snake formula built for quick focus sessions."
      }
    ]
  },
  {
    title: "Pass & Play",
    filterTag: "Local",
    kicker: "Shared Screen",
    description: "Fast, fun local matchups designed for side-by-side chaos and friendly rivalry.",
    themeClass: "theme-local",
    games: [
      {
        title: "Snake & Ladder",
        url: "https://veee-om.github.io/snake-ladder/",
        tag: "Local",
        genre: "Board Classic",
        description: "A playful digital take on the timeless board game with quick turns and momentum swings."
      },
      {
        title: "Ludo",
        url: "https://veee-om.github.io/ludo/",
        tag: "Local",
        genre: "Family Strategy",
        description: "Race your tokens home in a colorful local showdown with chance, timing, and tension."
      },
      {
        title: "Number Duel",
        url: "https://veee-om.github.io/number-duel/",
        tag: "Local",
        genre: "Mind Match",
        description: "A sharp two-player numbers challenge that rewards prediction, speed, and outsmarting."
      },
      {
        title: "Predict It",
        url: "https://veee-om.github.io/predict-it/",
        tag: "Local",
        genre: "Party Guessing",
        description: "A light competitive guessing game built for laughs, feints, and surprising reversals."
      },
      {
        title: "Island Game",
        url: "https://veee-om.github.io/island-game/",
        tag: "Local",
        genre: "Tactical Adventure",
        description: "A shared-screen challenge with island-inspired strategy and room for clever moves."
      }
    ]
  },
  {
    title: "Play Online",
    filterTag: "Online",
    kicker: "Live Pulse",
    description: "Real-time multiplayer experiences with brighter energy, social tension, and instant action.",
    themeClass: "theme-online",
    games: [
      {
        title: "Hand Cricket",
        url: "https://hand-cricket-ou5k.onrender.com/",
        tag: "Online",
        genre: "Real-Time Sport",
        description: "A multiplayer spin on street cricket where every move feels like a clutch call."
      },
      {
        title: "Snake & Ladder Live",
        url: "https://saap-seedhi-live.onrender.com/",
        tag: "Online",
        genre: "Live Board Game",
        description: "The classic climb-and-drop formula reimagined for synchronous online sessions."
      },
      {
        title: "GeoArena",
        url: "https://geo-arena.onrender.com/",
        tag: "Online",
        genre: "Competitive Worldplay",
        description: "A live geographic battleground built for quick thinking, map instinct, and momentum."
      },
      {
        title: "Urban Planner",
        url: "https://urban-planner.onrender.com/",
        tag: "Online",
        genre: "Collaborative Strategy",
        description: "A connected systems game where planning, coordination, and tactical choices shape the outcome."
      }
    ]
  }
];

const sectionsContainer = document.getElementById("sections-container");
const sectionTemplate = document.getElementById("section-template");
const cardTemplate = document.getElementById("card-template");
const searchInput = document.getElementById("search");
const resultsCount = document.getElementById("results-count");
const emptyState = document.getElementById("empty-state");
const resetFiltersButton = document.getElementById("reset-filters");
const filterChips = [...document.querySelectorAll(".filter-chip")];
const loadingScreen = document.getElementById("loading-screen");

let activeFilter = "All";

const totalGames = gameSections.reduce((sum, section) => sum + section.games.length, 0);

function renderSections(searchTerm = "", filter = "All") {
  const normalizedSearch = searchTerm.trim().toLowerCase();
  sectionsContainer.innerHTML = "";

  let visibleGames = 0;

  gameSections.forEach((section) => {
    const filteredGames = section.games.filter((game) => {
      const matchesSearch =
        !normalizedSearch ||
        `${game.title} ${game.description} ${game.genre} ${section.title}`
          .toLowerCase()
          .includes(normalizedSearch);

      const matchesFilter =
        filter === "All" || game.tag === filter || section.filterTag === filter;

      return matchesSearch && matchesFilter;
    });

    if (!filteredGames.length) {
      return;
    }

    visibleGames += filteredGames.length;

    const sectionFragment = sectionTemplate.content.cloneNode(true);
    const sectionShell = sectionFragment.querySelector(".category-shell");
    const kicker = sectionFragment.querySelector(".category-kicker");
    const title = sectionFragment.querySelector(".category-title");
    const description = sectionFragment.querySelector(".category-copy");
    const rail = sectionFragment.querySelector(".card-rail");

    sectionShell.classList.add(section.themeClass);
    kicker.textContent = section.kicker;
    title.textContent = section.title;
    description.textContent = section.description;

    filteredGames.forEach((game, index) => {
      const cardFragment = cardTemplate.content.cloneNode(true);
      const card = cardFragment.querySelector(".game-card");

      card.querySelector(".tag-badge").textContent = game.tag;
      card.querySelector(".game-index").textContent = `${String(index + 1).padStart(2, "0")}`;
      card.querySelector(".game-title").textContent = game.title;
      card.querySelector(".game-description").textContent = game.description;
      card.querySelector(".game-genre").textContent = game.genre;

      const playButton = card.querySelector(".play-button");
      playButton.href = game.url;
      playButton.setAttribute("aria-label", `Play ${game.title}`);

      card.addEventListener("mousemove", (event) => {
        const bounds = card.getBoundingClientRect();
        const x = event.clientX - bounds.left;
        const y = event.clientY - bounds.top;
        card.style.setProperty("--mx", `${x}px`);
        card.style.setProperty("--my", `${y}px`);
      });

      rail.appendChild(cardFragment);
    });

    sectionsContainer.appendChild(sectionFragment);
  });

  resultsCount.textContent =
    visibleGames === totalGames && !normalizedSearch && filter === "All"
      ? `Showing all ${totalGames} games`
      : `Showing ${visibleGames} ${visibleGames === 1 ? "game" : "games"}`;

  emptyState.classList.toggle("hidden", visibleGames > 0);
}

function updateFilterState(nextFilter) {
  activeFilter = nextFilter;

  filterChips.forEach((chip) => {
    chip.classList.toggle("active", chip.dataset.filter === nextFilter);
  });

  renderSections(searchInput.value, activeFilter);
}

searchInput.addEventListener("input", () => {
  renderSections(searchInput.value, activeFilter);
});

filterChips.forEach((chip) => {
  chip.addEventListener("click", () => {
    updateFilterState(chip.dataset.filter);
  });
});

resetFiltersButton.addEventListener("click", () => {
  searchInput.value = "";
  updateFilterState("All");
});

window.addEventListener("load", () => {
  window.setTimeout(() => {
    loadingScreen.classList.add("opacity-0", "pointer-events-none");
  }, 450);
});

renderSections();
