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