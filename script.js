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
  const id = Math.floor(Math.random() * 6236) + 1;

  fetch(`https://api.quran.com/api/v4/verses/by_id/${id}`)
    .then(res => res.json())
    .then(data => {
      document.getElementById("verse").textContent =
        data.verse.text_uthmani;
    });
}

loadVerse();
