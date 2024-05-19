document.addEventListener('DOMContentLoaded', () => {
    const stationList = document.getElementById('station-list');
    const audioPlayer = document.getElementById('audio-player');

    const stations = [
        { name: 'Rock Guitar', url: 'https://stream-ssl.shoutcast.com/classicrock' },  // URL direta de um stream de áudio
        { name: 'Jazz Guitar', url: 'http://stream-url-jazz' },
        { name: 'Blues Guitar', url: 'http://stream-url-blues' },
        { name: 'Heavy Metal Guitar', url: 'http://stream-url-metal' },
        { name: 'Instrumental Guitar', url: 'http://stream-url-instrumental' }
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
