document.addEventListener('DOMContentLoaded', () => {
    const stationList = document.getElementById('station-list');
    const audioPlayer = document.getElementById('audio-player');

    const stations = [
        { name: 'Rock Guitar', url: 'https://rockradio1.radioca.st/stream' }, // URL direta de um stream de áudio de Rock
        { name: 'Jazz Guitar', url: 'http://streaming.tdiradio.com:8000/house.mp3' }, // URL direta de um stream de áudio de Jazz
        { name: 'Blues Guitar', url: 'http://ice1.somafm.com/bootliquor-128-mp3' }, // URL direta de um stream de áudio de Blues
        { name: 'Heavy Metal Guitar', url: 'http://ice1.somafm.com/thistle-128-mp3' }, // URL direta de um stream de áudio de Heavy Metal
        { name: 'Instrumental Guitar', url: 'http://ice1.somafm.com/sf1033-128-mp3' } // URL direta de um stream de áudio de Instrumental
    ];

    stations.forEach(station => {
        const li = document.createElement('li');
        li.textContent = station.name;
        li.addEventListener('click', () => {
            audioPlayer.src = station.url;
            audioPlayer.play();
        });
        stationList.appendChild(li);
    });
});
