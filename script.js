document.addEventListener('DOMContentLoaded', () => {
    const stationList = document.getElementById('station-list');
    const audioPlayer = document.getElementById('audio-player');

    const stations = [
        { name: 'Rock Guitar', url: 'https://21933.live.streamtheworld.com/RADIO_89FM_ADP.aac?1716174521095' }, // URL funcional para Rock
        { name: 'Jazz Guitar', url: 'http://streaming.tdiradio.com:8000/house.mp3' },
        { name: 'Blues Guitar', url: 'https://stream-176.zeno.fm/d6dg4e0dytzuv?zt=eyJhbGciOiJIUzI1NiJ9.eyJzdHJlYW0iOiJkNmRnNGUwZHl0enV2IiwiaG9zdCI6InN0cmVhbS0xNzYuemVuby5mbSIsInJ0dGwiOjUsImp0aSI6IlVVbmZmYXkyUmZPSzdCbmlUVFM3anciLCJpYXQiOjE3MTYxNzQ5MDUsImV4cCI6MTcxNjE3NDk2NX0.O8qECDCQ-9K5GskMS0gpkSa9sQIMLBX5CfThrNJ7h4M&1716174904649' },
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
