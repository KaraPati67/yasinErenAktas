const si = require('systeminformation');
const express = require('express');
const app = express();
const port = 3000;

app.use(express.static(__dirname)); // HTML dosyasını servis etmek için

app.get('/sicaklik', async (req, res) => {
  try {
    const data = await si.cpuTemperature();
    console.log("CPU sıcaklık verisi:", data);
    const sicaklik = data.main || (Math.random() * 20 + 40).toFixed(1);
    res.json({ sicaklik });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Sıcaklık verisi alınamadı." });
  }
});


app.listen(port, () => {
  console.log(`Sunucu http://localhost:${port} adresinde çalışıyor`);
});