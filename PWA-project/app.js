document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  // Load background image on canvas
  const background = new Image();
  background.src = "images/background.png"; // Adjust path if needed
  background.onload = () => {
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  };

  // Load daily tip
  const tipElement = document.getElementById("dailyTip");
  fetch("data/tips.json")
    .then(res => res.json())
    .then(tips => {
      const index = new Date().getDate() % tips.length;
      tipElement.textContent = tips[index];
    })
    .catch(() => {
      tipElement.textContent = "🌱 Stay green and do your part today!";
    });

  // Load bonus fact
  const bonusFact = document.getElementById("bonusFact");
  fetch("data/facts.json")
    .then(res => res.json())
    .then(facts => {
      const index = new Date().getDate() % facts.length;
      bonusFact.textContent = facts[index];
    })
    .catch(() => {
      bonusFact.textContent = "♻️ Sustainability starts with small actions!";
    });

  // Dark mode toggle
  const darkModeBtn = document.getElementById("darkModeBtn");
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
  }

  darkModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });

  // Task streak + stats
  const TASK_KEY = "sustainabilityProgress";
  const STATS_KEY = "ecoStats";
  const CHECKBOXES = document.querySelectorAll(".task");
  const streakDisplay = document.getElementById("streakInfo");

  const getToday = () => new Date().toISOString().split("T")[0];

  function loadProgress() {
    const today = getToday();
    const stored = JSON.parse(localStorage.getItem(TASK_KEY)) || {};
    const stats = JSON.parse(localStorage.getItem(STATS_KEY)) || {
      daysUsed: 0,
      totalTasks: 0,
      longestStreak: 0
    };

    if (stored.lastCompletedDate === today && stored.tasksCompleted) {
      CHECKBOXES.forEach(cb => {
        if (stored.tasksCompleted.includes(cb.dataset.task)) {
          cb.checked = true;
        }
      });
    }

    if (stats.lastUsed !== today) {
      stats.daysUsed += 1;
      stats.lastUsed = today;
    }

    if (stored.streak && stored.streak > (stats.longestStreak || 0)) {
      stats.longestStreak = stored.streak;
    }

    document.getElementById("daysUsed").textContent = `Days used: ${stats.daysUsed}`;
    document.getElementById("totalTasks").textContent = `Total tasks completed: ${stored.tasksCompleted?.length || 0}`;
    document.getElementById("longestStreak").textContent = `Longest streak: ${stats.longestStreak}`;
    streakDisplay.textContent = `🌿 Current streak: ${stored.streak || 0} day(s)`;

    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  }

  function saveProgress() {
    const completedTasks = [...CHECKBOXES]
      .filter(cb => cb.checked)
      .map(cb => cb.dataset.task);

    const today = getToday();
    const stored = JSON.parse(localStorage.getItem(TASK_KEY)) || {};
    const stats = JSON.parse(localStorage.getItem(STATS_KEY)) || {
      daysUsed: 0,
      totalTasks: 0,
      longestStreak: 0
    };

    let streak = stored.streak || 0;
    const lastDate = stored.lastCompletedDate;

    if (lastDate !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yString = yesterday.toISOString().split("T")[0];

      streak = lastDate === yString ? streak + 1 : 1;
    }

    const updatedProgress = {
      lastCompletedDate: today,
      tasksCompleted: completedTasks,
      streak
    };

    localStorage.setItem(TASK_KEY, JSON.stringify(updatedProgress));

    if (streak > (stats.longestStreak || 0)) {
      stats.longestStreak = streak;
    }

    stats.totalTasks += completedTasks.length;
    stats.lastUsed = today;
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));

    streakDisplay.textContent = `🌿 Current streak: ${streak} day(s)`;
    document.getElementById("daysUsed").textContent = `Days used: ${stats.daysUsed}`;
    document.getElementById("totalTasks").textContent = `Total tasks completed: ${completedTasks.length}`;
    document.getElementById("longestStreak").textContent = `Longest streak: ${stats.longestStreak}`;
  }

  CHECKBOXES.forEach(cb => cb.addEventListener("change", saveProgress));

  document.getElementById("resetBtn").addEventListener("click", () => {
    localStorage.removeItem(TASK_KEY);
    localStorage.removeItem(STATS_KEY);
    CHECKBOXES.forEach(cb => cb.checked = false);
    streakDisplay.textContent = "🌿 Current streak: 0 day(s)";
    document.getElementById("daysUsed").textContent = "Days used: 0";
    document.getElementById("totalTasks").textContent = "Total tasks completed: 0";
    document.getElementById("longestStreak").textContent = "Longest streak: 0";
  });

  loadProgress();
});

// Register Service Worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js")
      .then(reg => console.log("✅ Service Worker registered:", reg.scope))
      .catch(err => console.error("❌ Service Worker registration failed:", err));
  });
}