let savedData = null;

window.onload = () => {
  
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      document.getElementById('latitude').value = position.coords.latitude.toFixed(4);
      document.getElementById('longitude').value = position.coords.longitude.toFixed(4);
    }, error => {
      console.warn("Geolocalizzazione non consentita.");
    });
  }
};


const weatherDescriptions = {
  0: { text: "Cielo sereno", icon: "☀️" },
  1: { text: "Prevalentemente sereno", icon: "🌤️" },
  2: { text: "Parzialmente nuvoloso", icon: "⛅" },
  3: { text: "Coperto", icon: "☁️" },
  45: { text: "Nebbia", icon: "🌫️" },
  48: { text: "Nebbia con brina", icon: "🌫️❄️" },
  51: { text: "Pioviggine leggera", icon: "🌦️" },
  53: { text: "Pioviggine moderata", icon: "🌧️" },
  55: { text: "Pioviggine intensa", icon: "🌧️" },
  61: { text: "Pioggia leggera", icon: "🌦️" },
  63: { text: "Pioggia moderata", icon: "🌧️" },
  65: { text: "Pioggia intensa", icon: "🌧️🌧️" },
  71: { text: "Neve leggera", icon: "🌨️" },
  73: { text: "Neve moderata", icon: "🌨️" },
  75: { text: "Neve intensa", icon: "❄️" },
  80: { text: "Rovesci leggeri", icon: "🌧️" },
  81: { text: "Rovesci moderati", icon: "🌧️🌧️" },
  82: { text: "Rovesci forti", icon: "🌧️🌧️🌧️" },
  95: { text: "Temporale", icon: "⛈️" },
  96: { text: "Temporale con grandine", icon: "⛈️🧊" },
  99: { text: "Temporale forte con grandine", icon: "⛈️🧊🧊" }
};

function getMeteo() {
  const lat = document.getElementById('latitude').value;
  const lon = document.getElementById('longitude').value;

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,precipitation,rain,cloud_cover,wind_speed_10m,weather_code`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      savedData = data;
      displayMeteo(data.current);
    })
    .catch(error => {
      document.getElementById('meteoData').innerHTML = 'Errore nella richiesta API.';
      console.error(error);
    });
}

function displayMeteo(current) {
  const code = current.weather_code;
  const meteo = weatherDescriptions[code] || { text: "Codice meteo non definito", icon: "❓" };

  const html = `
    <h3>Dati Meteo Attuali</h3>
    <div style="font-size: 48px;">${meteo.icon}</div>
    <p><strong>${meteo.text}</strong></p>
    <p><strong>Temperatura:</strong> ${current.temperature_2m} °C</p>
    <p><strong>Umidità:</strong> ${current.relative_humidity_2m} %</p>
    <p><strong>Precipitazioni:</strong> ${current.precipitation} mm</p>
    <p><strong>Pioggia:</strong> ${current.rain} mm</p>
    <p><strong>Nuvolosità:</strong> ${current.cloud_cover} %</p>
    <p><strong>Vento:</strong> ${current.wind_speed_10m} km/h</p>
  `;
  document.getElementById('meteoData').innerHTML = html;
}
