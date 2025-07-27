const beatSecici = document.querySelector('#beatSecici');
const sesOynatici = document.querySelector('#sesOynatici');
const sarkiOlusturButonu = document.querySelector('#sarkiOlusturButonu');
const sozMetniTextarea = document.querySelector('#sozMetni');
const sonucPaneliElementi = document.querySelector('#sonucPaneli');
const sonucSozleriElementi = document.querySelector('#sonucSozleri');
const kaydetButonu = document.querySelector('#kaydetButonu');
const durdurButonu = document.querySelector('#durdurButonu');
const kayitOynatici = document.querySelector('#kayitOynatici');

let mediaRecorder;
let audioChunks = [];

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
});

kaydetButonu.addEventListener('click', async function() {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);
    
    mediaRecorder.ondataavailable = event => {
      audioChunks.push(event.data);
    };

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: 'audio/mp3' });
      const audioUrl = URL.createObjectURL(audioBlob);
      kayitOynatici.src = audioUrl;
    };

    audioChunks = [];
    mediaRecorder.start();
    
    kaydetButonu.style.display = 'none';
    durdurButonu.style.display = 'inline-block';
  } else {
     alert('Tarayıcınız ses kaydını desteklemiyor.');
  }
});

durdurButonu.addEventListener('click', function() {
  mediaRecorder.stop();
  kaydetButonu.style.display = 'inline-block';
  durdurButonu.style.display = 'none';
});