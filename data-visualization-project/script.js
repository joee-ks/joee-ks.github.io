const artistNames = [
  "Drake", "Kendrick Lamar", "SZA", "Kanye West",
  "Taylor Swift", "Bad Bunny", "The Weeknd",
  "J. Cole", "Doja Cat", "Ice Spice"
];

const listeners = [
  1270640, 1187044, 987747, 848882,
  775312, 690100, 645567,
  630312, 585001, 552334
];

// Doughnut Chart (Top 5)
const doughnutCtx = document.getElementById("doughnutChart").getContext("2d");
new Chart(doughnutCtx, {
  type: "doughnut",
  data: {
    labels: artistNames.slice(0, 5),
    datasets: [{
      data: listeners.slice(0, 5),
        backgroundColor: [
        "#4bc0c0", "#36a2eb", "#9966ff", "#ff6384", "#ff9f40"
        ],
        borderColor: "#121212",
        borderWidth: 1
    }]
  },
options: {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "Top 5 Artists in NYC (2024)",
      color: "#ffffff",
      font: {
        size: 22,
        weight: 'bold',
        family: 'Segoe UI'
      }
    },
    legend: {
      labels: {
        color: "#f1f1f1",
        font: {
          size: 16,
          family: 'Segoe UI'
        }
      }
    }
  }
}
});

// Horizontal Bar Chart (Top 10)
const barCtx = document.getElementById("barChart").getContext("2d");
new Chart(barCtx, {
  type: "bar",
  data: {
    labels: artistNames,
    datasets: [{
      label: "Listeners",
      data: listeners,
      backgroundColor: "rgba(75, 192, 192, 0.7)"
    }]
  },
options: {
  indexAxis: 'y',
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "Top 10 Artists in NYC (2024)",
      color: "#ffffff",
      font: {
        size: 22,
        weight: 'bold',
        family: 'Segoe UI'
      }
    },
    legend: {
      labels: {
        color: "#f1f1f1",
        font: {
          size: 16,
          family: 'Segoe UI'
        }
      }
    }
  },
  scales: {
    x: {
      ticks: {
        color: "#e0e0e0",
        font: {
          size: 14,
          family: 'Segoe UI'
        }
      }
    },
    y: {
      ticks: {
        color: "#e0e0e0",
        font: {
          size: 16,
          family: 'Segoe UI'
        }
      }
    }
  }
}
});
