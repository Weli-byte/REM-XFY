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