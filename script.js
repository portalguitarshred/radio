document.addEventListener('DOMContentLoaded', () => {
    const stationList = document.getElementById('station-list');
    const audioPlayer = document.getElementById('audio-player');

    const stations = [
        { name: 'Rock Guitar', url: 'https://21933.live.streamtheworld.com/RADIO_89FM_ADP.aac?1716174521095' }, // URL funcional para Rock
        { name: 'Jazz Guitar', url: 'https://server01.ouvir.radio.br:8006/stream?1716175071041' },
        { name: 'Blues Guitar', url: 'https://stream-172.zeno.fm/5npyxpydys8uv?zt=eyJhbGciOiJIUzI1NiJ9.eyJzdHJlYW0iOiI1bnB5eHB5ZHlzOHV2IiwiaG9zdCI6InN0cmVhbS0xNzIuemVuby5mbSIsInJ0dGwiOjUsImp0aSI6InhoZFV4UGNNUUc2eWsxR0I5ZzdENFEiLCJpYXQiOjE3MTYxNzUxMzksImV4cCI6MTcxNjE3NTE5OX0.-H5QPR8KYpGEe4-i0vuClifNYM0sWZzNvkTHhRqPUuM&1716175139266' },
        { name: 'Heavy Metal Guitar', url: 'http://66.70.187.30:8992/stream?1716175515235' },
        { name: 'Gospel', url: 'https://8612.brasilstream.com.br/stream?1716175969400' }
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
