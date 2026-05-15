const gameSections = [
  {
    title: "Solo",
    filterTag: "Solo",
    kicker: "Calm Focus",
    description: "Lean back into a self-paced challenge with polished, classic arcade energy.",
    themeClass: "theme-solo",
    games: [
      {
        emoji: "🐍",
        title: "Snake",
        url: "https://veee-om.github.io/snake/",
        tag: "Solo",
        genre: "Arcade Reflex",
        description: "A clean solo revival of the classic snake formula built for quick focus sessions.",
        tags: ["Logic", "Reflex", "Classic"]
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
        emoji: "🎲",
        title: "Snake & Ladder",
        url: "https://veee-om.github.io/snake-ladder/",
        tag: "Local",
        genre: "Board Classic",
        description: "A playful digital take on the timeless board game with quick turns and momentum swings.",
        tags: ["Strategy", "Logic", "Multiplayer"]
      },
      {
        emoji: "👑",
        title: "Ludo",
        url: "https://veee-om.github.io/ludo/",
        tag: "Local",
        genre: "Family Strategy",
        description: "Race your tokens home in a colorful local showdown with chance, timing, and tension.",
        tags: ["Strategy", "Multiplayer", "Classic"]
      },
      {
        emoji: "🔢",
        title: "Number Duel",
        url: "https://veee-om.github.io/number-duel/",
        tag: "Local",
        genre: "Mind Match",
        description: "A sharp two-player numbers challenge that rewards prediction, speed, and outsmarting.",
        tags: ["Logic", "Strategy", "Multiplayer"]
      },
      {
        emoji: "🧠",
        title: "Predict It",
        url: "https://veee-om.github.io/predict-it/",
        tag: "Local",
        genre: "Party Guessing",
        description: "A light competitive guessing game built for laughs, feints, and surprising reversals.",
        tags: ["Logic", "Party", "Multiplayer"]
      },
      {
        emoji: "🏝️",
        title: "Island Game",
        url: "https://veee-om.github.io/island-game/",
        tag: "Local",
        genre: "Tactical Adventure",
        description: "A shared-screen challenge with island-inspired strategy and room for clever moves.",
        tags: ["Strategy", "Adventure", "Multiplayer"]
      },
      {
        emoji: "♟️",
        title: "Chess",
        url: "https://veee-om.github.io/chess/",
        tag: "Local",
        genre: "Classic Strategy",
        description: "A timeless tactical duel built for thoughtful moves, long plans, and sharp turn-by-turn battles.",
        tags: ["Strategy", "Logic", "Multiplayer"]
      },
      {
        emoji: "⚛️",
        title: "Chain Reaction",
        url: "https://veee-om.github.io/chain-reaction/",
        tag: "Local",
        genre: "Tactical Logic",
        description: "A volatile board battle where every move can trigger cascading turns, reversals, and clever area control.",
        tags: ["Strategy", "Logic", "Multiplayer"]
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
        emoji: "🏏",
        title: "Hand Cricket",
        url: "https://hand-cricket-ou5k.onrender.com/",
        tag: "Online",
        genre: "Real-Time Sport",
        description: "A multiplayer spin on street cricket where every move feels like a clutch call.",
        tags: ["Multiplayer", "Live", "Strategy"]
      },
      {
        emoji: "🪜",
        title: "Snake & Ladder Live",
        url: "https://saap-seedhi-live.onrender.com/",
        tag: "Online",
        genre: "Live Board Game",
        description: "The classic climb-and-drop formula reimagined for synchronous online sessions.",
        tags: ["Multiplayer", "Classic", "Live"]
      },
      {
        emoji: "🌍",
        title: "GeoArena",
        url: "https://geo-arena.onrender.com/",
        tag: "Online",
        genre: "Competitive Worldplay",
        description: "A live geographic battleground built for quick thinking, map instinct, and momentum.",
        tags: ["GIS", "Multiplayer", "Strategy"]
      },
      {
        emoji: "🏙️",
        title: "Urban Planner",
        url: "https://urban-planner.onrender.com/",
        tag: "Online",
        genre: "Collaborative Strategy",
        description: "A connected systems game where planning, coordination, and tactical choices shape the outcome.",
        tags: ["Strategy", "GIS", "Multiplayer"]
      }
    ]
  }
];

const sectionsContainer = document.getElementById("sections-container");
const featuredContainer = document.getElementById("featured-game");
const sectionTemplate = document.getElementById("section-template");
const featuredTemplate = document.getElementById("featured-template");
const cardTemplate = document.getElementById("card-template");
const searchInput = document.getElementById("search");
const resultsCount = document.getElementById("results-count");
const gamesTotal = document.getElementById("games-total");
const emptyState = document.getElementById("empty-state");
const resetFiltersButton = document.getElementById("reset-filters");
const filterChips = [...document.querySelectorAll(".filter-chip")];
const loadingScreen = document.getElementById("loading-screen");
const searchToggle = document.getElementById("search-toggle");
const filterToggle = document.getElementById("filter-toggle");
const searchPanel = document.getElementById("search-panel");
const filterPanel = document.getElementById("filter-panel");
let revealObserver;
const featuredGame = {
  emoji: "🌍",
  title: "GeoArena",
  url: "https://geo-arena.onrender.com/",
  tag: "Online",
  genre: "Competitive Worldplay",
  description:
    "A live geographic battleground where fast map instinct, precision, and multiplayer pressure turn every round into a sharp competitive sprint.",
  tags: ["GIS", "Multiplayer", "Strategy"]
};

let activeFilter = "All";

const totalGames = gameSections.reduce((sum, section) => sum + section.games.length, 0);
gamesTotal.textContent = totalGames;

function createTagMarkup(tags = []) {
  return tags
    .map((tag) => `<span class="info-chip">${tag}</span>`)
    .join("");
}

function renderFeaturedGame() {
  const featuredFragment = featuredTemplate.content.cloneNode(true);
  const featuredCard = featuredFragment.querySelector(".featured-game-card");
  const liveBadge = featuredFragment.querySelector(".live-pill");
  const modeBadge = featuredFragment.querySelector(".featured-mode");
  const emoji = featuredFragment.querySelector(".featured-emoji");
  const title = featuredFragment.querySelector(".featured-title");
  const description = featuredFragment.querySelector(".featured-description");
  const tags = featuredFragment.querySelector(".featured-tags");
  const playButton = featuredFragment.querySelector(".featured-play-button");

  featuredCard.classList.add("theme-online");
  modeBadge.textContent = featuredGame.tag;
  emoji.textContent = featuredGame.emoji;
  title.textContent = featuredGame.title;
  description.textContent = featuredGame.description;
  tags.innerHTML = createTagMarkup(featuredGame.tags);
  playButton.href = featuredGame.url;
  playButton.setAttribute("aria-label", `Play ${featuredGame.title}`);

  if (featuredGame.tag === "Online") {
    liveBadge.classList.remove("hidden");
  }

  featuredContainer.innerHTML = "";
  featuredContainer.appendChild(featuredFragment);
}

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
    sectionShell.classList.add("reveal");
    kicker.textContent = section.kicker;
    title.textContent = section.title;
    description.textContent = section.description;

    filteredGames.forEach((game, index) => {
      const cardFragment = cardTemplate.content.cloneNode(true);
      const card = cardFragment.querySelector(".game-card");
      const liveBadge = cardFragment.querySelector(".live-pill");

      card.querySelector(".tag-badge").textContent = game.tag;
      card.querySelector(".game-title").textContent = `${game.emoji} ${game.title}`;
      card.querySelector(".game-description").textContent = game.description;
      card.querySelector(".game-genre").textContent = game.genre;
      card.querySelector(".game-tags").innerHTML = createTagMarkup(game.tags);
      card.setAttribute("tabindex", "0");

      const playButton = card.querySelector(".play-button");
      playButton.href = game.url;
      playButton.setAttribute("aria-label", `Play ${game.title}`);

      if (game.tag === "Online") {
        liveBadge.classList.remove("hidden");
      }

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
  setupRevealObserver();
}

function updateFilterState(nextFilter) {
  activeFilter = nextFilter;

  filterChips.forEach((chip) => {
    chip.classList.toggle("active", chip.dataset.filter === nextFilter);
  });

  renderSections(searchInput.value, activeFilter);
}

function closePanels() {
  [searchPanel, filterPanel].forEach((panel) => panel.classList.add("hidden"));
  [searchToggle, filterToggle].forEach((button) => {
    button.setAttribute("aria-expanded", "false");
    button.classList.remove("active");
  });
  document.querySelectorAll(".tool-chip.open").forEach((chip) => {
    chip.classList.remove("open");
  });
}

function togglePanel(button, panel) {
  const willOpen = panel.classList.contains("hidden");
  closePanels();

  if (willOpen) {
    panel.classList.remove("hidden");
    button.setAttribute("aria-expanded", "true");
    button.classList.add("active");
    button.closest(".tool-chip")?.classList.add("open");
  }
}

function setupRevealObserver() {
  if (revealObserver) {
    revealObserver.disconnect();
  }

  const revealItems = document.querySelectorAll(".reveal");

  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
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

searchToggle.addEventListener("click", () => {
  togglePanel(searchToggle, searchPanel);
  if (!searchPanel.classList.contains("hidden")) {
    searchInput.focus();
  }
});

filterToggle.addEventListener("click", () => {
  togglePanel(filterToggle, filterPanel);
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".tool-chip")) {
    closePanels();
  }
});

window.addEventListener("load", () => {
  window.setTimeout(() => {
    loadingScreen.classList.add("opacity-0", "pointer-events-none");
  }, 450);

  setupRevealObserver();
});

renderSections();
renderFeaturedGame();
