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
const sarkiOlusturButonu = document.getElementById('sarkiOlusturButonu');
const sozMetni = document.getElementById('sozMetni');

sarkiOlusturButonu.addEventListener('click', function() {
    const metin = sozMetni.value;
    console.log(metin);
});