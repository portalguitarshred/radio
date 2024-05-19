document.addEventListener('DOMContentLoaded', () => {
    const stationList = document.getElementById('station-list');
    const audioPlayer = document.getElementById('audio-player');

    const stations = [
        { name: 'Rock Guitar', url: 'https://rockradio1.radioca.st/stream' },
        { name: 'Jazz Guitar', url: 'http://streaming.tdiradio.com:8000/house.mp3' },
        { name: 'Blues Guitar', url: 'http://ice1.somafm.com/bootliquor-128-mp3' },
        { name: 'Heavy Metal Guitar', url: 'http://ice1.somafm.com/thistle-128-mp3' },
        { name: 'Instrumental Guitar', url: 'http://ice1.somafm.com/sf1033-128-mp3' }
    ];

    stations.forEach(station => {
        const li = document.createElement('li');
        li.textContent = station.name;
        li.addEventListener('click', () => {
            console.log(`Playing: ${station.name} - URL: ${station.url}`);
            audioPlayer.src = station.url;
            audioPlayer.play().catch(error => {
                console.error('Playback failed', error);
            });
        });
        stationList.appendChild(li);
    });
});
