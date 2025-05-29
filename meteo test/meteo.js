let savedData = null;

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
  const html = `
    <h3>Dati Meteo Attuali</h3>
    <p><strong>Temperatura:</strong> ${current.temperature_2m} °C</p>
    <p><strong>Umidità:</strong> ${current.relative_humidity_2m} %</p>
    <p><strong>Precipitazioni:</strong> ${current.precipitation} mm</p>
    <p><strong>Pioggia:</strong> ${current.rain} mm</p>
    <p><strong>Nuvolosità:</strong> ${current.cloud_cover} %</p>
    <p><strong>Vento:</strong> ${current.wind_speed_10m} km/h</p>
  `;
  document.getElementById('meteoData').innerHTML = html;
}
