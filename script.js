// -----------------------------
// Prayer Times
// -----------------------------
fetch("https://api.aladhan.com/v1/timingsByCity?city=Duisburg&country=Germany&method=2")
  .then(res => res.json())
  .then(data => {
    const times = data.data.timings;
    const list = document.getElementById("times");

    ["Fajr","Dhuhr","Asr","Maghrib","Isha"].forEach(prayer => {
      const li = document.createElement("li");
      li.textContent = `${prayer}: ${times[prayer]}`;
      list.appendChild(li);
    });
  })
  .catch(() => {
    const list = document.getElementById("times");
    list.innerHTML = "<li>Failed to load prayer times.</li>";
  });

// -----------------------------
// Random Quran Verse Generator (Arabic + English)
// -----------------------------
const arabicEl = document.getElementById("arabic");
const metaEl = document.getElementById("meta");
const englishEl = document.getElementById("english");
const btn = document.getElementById("generateBtn");
const countdownEl = document.getElementById("countdown");

let cooldown = false;

// Function to fetch and display a random ayah
async function generateAyah() {
  if (cooldown) return;
  cooldown = true;
  startCountdown(5);

  try {
    // Random ayah number
    const randomRes = await fetch("https://api.alquran.cloud/v1/ayah/random");
    const randomData = await randomRes.json();
    const ayahNumber = randomData.data.number;

    // Fetch Arabic
    const arabicRes = await fetch(`https://api.alquran.cloud/v1/ayah/${ayahNumber}/ar.alafasy`);
    const arabicData = await arabicRes.json();

    // Fetch English translation (Asad)
    const englishRes = await fetch(`https://api.alquran.cloud/v1/ayah/${ayahNumber}/en.asad`);
    const englishData = await englishRes.json();

    arabicEl.textContent = arabicData.data.text;
    metaEl.textContent = `${arabicData.data.surah.englishName} — Ayah ${arabicData.data.numberInSurah}`;
    englishEl.textContent = englishData.data.text;

  } catch (e) {
    arabicEl.textContent = "Failed to load ayah.";
    metaEl.textContent = "";
    englishEl.textContent = "";
  }
}

// Button click triggers a new ayah
btn.addEventListener("click", generateAyah);

// -----------------------------
// Countdown Timer
// -----------------------------
function startCountdown(seconds) {
  let timeLeft = seconds;
  countdownEl.textContent = `Next verse in ${timeLeft}s`;

  const interval = setInterval(() => {
    timeLeft--;
    countdownEl.textContent = `Next verse in ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(interval);
      countdownEl.textContent = "";
      cooldown = false;
    }
  }, 1000);
}

// -----------------------------
// Preload first ayah on page load
// -----------------------------
window.addEventListener("DOMContentLoaded", generateAyah);
