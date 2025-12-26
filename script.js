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
// Random Quran Verse Generator
// -----------------------------
const arabicEl = document.getElementById("arabic");
const metaEl = document.getElementById("meta");
const englishEl = document.getElementById("english");
const btn = document.getElementById("generateBtn");
const countdownEl = document.getElementById("countdown");

let cooldown = false;

btn.addEventListener("click", async () => {
  if (cooldown) return;
  cooldown = true;
  startCountdown(5);

  try {
    // Fetch random ayah from the full Qur’an with English translation (Sahih)
    const res = await fetch("https://api.alquran.cloud/v1/ayah/random/en.asad");
    const data = await res.json();
    const ayah = data.data;

    arabicEl.textContent = ayah.text; // Arabic text
    metaEl.textContent = `${ayah.surah.englishName} — Ayah ${ayah.numberInSurah}`;
    
    // English translation from API (Sahih / Asad version)
    // If you want another translation, replace 'en.asad' in the URL with a supported version
    englishEl.textContent = ayah.text; // Arabic is same as text; translation handled by endpoint
  } catch (e) {
    arabicEl.textContent = "Failed to load ayah.";
    metaEl.textContent = "";
    englishEl.textContent = "";
  }
});

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
