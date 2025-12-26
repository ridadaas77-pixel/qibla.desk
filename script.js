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
  });

// Random Quran Verse
function loadVerse() {
  fetch("https://api.alquran.cloud/v1/ayah/random")
    .then(res => res.json())
    .then(data => {
      document.getElementById("verse").textContent =
        data.data.text;
    })
    .catch(() => {
      document.getElementById("verse").textContent =
        "Failed to load verse.";
    });
}
