const beatSecici = document.querySelector('#beatSecici');
const sesOynatici = document.querySelector('#sesOynatici');
const sarkiOlusturButonu = document.querySelector('#sarkiOlusturButonu');
const sozMetniTextarea = document.querySelector('#sozMetni');
const sonucPaneliElementi = document.querySelector('#sonucPaneli');
const sonucSozleriElementi = document.querySelector('#sonucSozleri');

beatSecici.addEventListener('change', function() {
  if (beatSecici.value) {
    sesOynatici.src = beatSecici.value;
    sesOynatici.play();
  } else {
    sesOynatici.pause();
    sesOynatici.src = '';
  }
});

sarkiOlusturButonu.addEventListener('click', function() {
  const girilenMetin = sozMetniTextarea.value;
  sonucSozleriElementi.innerHTML = '';
  const satirlar = girilenMetin.split('\n');

  satirlar.forEach(function(satir) {
    const satirElementi = document.createElement('span');
    satirElementi.className = 'soz-satiri';
    satirElementi.innerText = satir || '\u00A0';
    sonucSozleriElementi.appendChild(satirElementi);
  });

  sonucPaneliElementi.style.display = 'block';
  karaokeAnimasyonunuBaslat();
});

function karaokeAnimasyonunuBaslat() {
  const tumSatirlar = document.querySelectorAll('.soz-satiri');
  let aktifSatirIndex = 0;

  tumSatirlar.forEach(satir => {
    satir.classList.remove('aktif-satir');
  });
  
  if (tumSatirlar.length === 0) return;

  tumSatirlar[aktifSatirIndex].classList.add('aktif-satir');

  const zamanlayici = setInterval(function() {
    if (tumSatirlar[aktifSatirIndex]) {
      tumSatirlar[aktifSatirIndex].classList.remove('aktif-satir');
    }
    
    aktifSatirIndex++;

    if (aktifSatirIndex >= tumSatirlar.length) {
      clearInterval(zamanlayici);
      return;
    }

    if (tumSatirlar[aktifSatirIndex]) {
      tumSatirlar[aktifSatirIndex].classList.add('aktif-satir');
    }
  }, 2000);
}