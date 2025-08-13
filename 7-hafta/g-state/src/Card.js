import React from "react";

function Card() {
  return (
    <div className="card">
      <h2>React ile Kart Bileşeni</h2>
      <p>
        Bu kart, modern tasarım ve okunabilir yazı stilleriyle hazırlanmıştır.<br />
        <b>Öne Çıkan Özellikler:</b>
      </p>
      <ul>
        <li>Düzgün ve sade yazı fontları</li>
        <li>Kolay okunabilir metin düzeni</li>
        <li>Responsive ve estetik görünüm</li>
      </ul>
      <div style={{marginTop: "32px", textAlign: "left"}}>
        <p>
          Bu örnek kart bileşeni, React ile kolayca oluşturulabilir ve özelleştirilebilir. 
          Modern web uygulamalarında kullanıcıya bilgi sunmak için sıkça kullanılır.
          <br /><br />
          Kartlar, içerikleri düzenli ve şık bir şekilde göstermek için idealdir. 
          Tasarımda renkler ve yazı tipleri seçilebilir, böylece kullanıcı deneyimi artırılır.
        </p>
        <p>
          Ayrıca, kart bileşenleri mobil uyumlu olacak şekilde tasarlanabilir. 
          Böylece farklı cihazlarda da düzgün bir görünüm elde edilir.
        </p>
      </div>
    </div>
  );
}

export default Card;