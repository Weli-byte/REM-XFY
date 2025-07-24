const beatSecici = document.getElementById('beatSecici');
const sesOynatici = document.getElementById('sesOynatici');

beatSecici.addEventListener('change', function() {
    const secilenBeat = this.value;
    if (secilenBeat) {
        sesOynatici.src = secilenBeat;
        sesOynatici.play();
    } else {
        sesOynatici.pause();
        sesOynatici.src = '';
    }
});


// --- Şarkı Oluşturma Paneli Mantığı ---

// Önce ilgili tüm HTML elementlerini bir kere seçip hafızaya alalım
const sarkiOlusturButonu = document.querySelector('#sarkiOlusturButonu');
const sozMetniElementi = document.querySelector('#sozMetni');
const sonucPaneliElementi = document.querySelector('#sonucPaneli');
const sonucSozleriElementi = document.querySelector('#sonucSozleri');

// Şimdi butona tıklandığında ne olacağını söyleyelim
sarkiOlusturButonu.addEventListener('click', function() {
  
  // 1. Adım: Metin kutusundan o anki yazıyı al
  const girilenMetin = sozMetniElementi.value;

  // 2. Adım: Alınan yazıyı sonuç panelindeki paragrafın içine yaz
  sonucSozleriElementi.innerText = girilenMetin;

  // 3. Adım: Gizli olan sonuç panelini görünür yap
  sonucPaneliElementi.style.display = 'block';

});
document.getElementById('aiSozYazButonu').addEventListener('click', async function() {
  const konu = document.getElementById('aiKonu').value.trim();
  const textarea = document.getElementById('sozTextarea'); // Textarea'nın id'si bu olmalı

  if (!konu) {
    textarea.value = 'Lütfen bir konu giriniz.';
    return;
  }

  textarea.value = 'Yapay zeka düşünüyor...';

  try {
    const response = await fetch('/.netlify/functions/getLyrics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ konu })
    });

    const data = await response.json();

    if (data.soz) {
      textarea.value = data.soz;
    } else if (data.error) {
      textarea.value = 'Hata: ' + data.error;
    } else {
      textarea.value = 'Beklenmeyen bir hata oluştu.';
    }
  } catch (err) {
    textarea.value = 'Sunucuya bağlanılamadı.';
  }
});