// Prayer Times
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

// Random Quran Verse (local generator)
const verses = [
  {
    arabic: "لِلَّهِ مَا فِي السَّمَاوَاتِ وَالْأَرْضِ ۚ إِنَّ اللَّهَ هُوَ الْغَنِيُّ الْحَمِيدُ",
    surah: "Surah Ibrahim",
    ayah: 8,
    english: "To Allah belongs whatever is in the heavens and whatever is on the earth. Indeed, Allah is Free of need and Praiseworthy."
  },
  {
    arabic: "إِنَّ مَعَ الْعُسْرِ يُسْرًا",
    surah: "Surah Ash-Sharh",
    ayah: 6,
    english: "Indeed, with hardship comes ease."
  }
];

const arabicEl = document.getElementById("arabic");
const metaEl = document.getElementById("meta");
const englishEl = document.getElementById("english");
const btn = document.getElementById("generateBtn");
const countdownEl = document.getElementById("countdown");

let cooldown = false;

btn.addEventListener("click", () => {
  if (cooldown) return;

  const random = verses[Math.floor(Math.random() * verses.length)];

  arabicEl.textContent = random.arabic;
  metaEl.textContent = `${random.surah} — Ayah ${random.ayah}`;
  englishEl.textContent = random.english;

  startCountdown(5);
});

function startCountdown(seconds) {
  cooldown = true;
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
