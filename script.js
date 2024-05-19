document.addEventListener('DOMContentLoaded', () => {
    const stationList = document.getElementById('station-list');
    const audioPlayer = document.getElementById('audio-player');

    const stations = [
        { name: 'Rock Guitar', url: 'https://rockfm-ice.stream.goloudservices.com/rockfm.mp3' }, // URL direta de um stream de áudio de Rock
        { name: 'Jazz Guitar', url: 'http://stream-url-jazz' }, // Substitua por uma URL real de Jazz
        { name: 'Blues Guitar', url: 'http://stream-url-blues' }, // Substitua por uma URL real de Blues
        { name: 'Heavy Metal Guitar', url: 'http://stream-url-metal' }, // Substitua por uma URL real de Heavy Metal
        { name: 'Instrumental Guitar', url: 'http://stream-url-instrumental' } // Substitua por uma URL real de Instrumental
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
