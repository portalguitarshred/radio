document.addEventListener('DOMContentLoaded', () => {
    const stationList = document.getElementById('station-list');
    const audioPlayer = document.getElementById('audio-player');
    const volumeControl = document.getElementById('volume-control');
    let currentPlaying = null; // Variável para acompanhar a estação tocando

    const stations = [
        { name: 'Rock', url: 'https://21933.live.streamtheworld.com/RADIO_89FM_ADP.aac?1716174521095' }, // URL funcional para Rock
        { name: 'Jazz', url: 'https://server01.ouvir.radio.br:8006/stream?1716175071041' },
        { name: 'Blues', url: 'https://stream-172.zeno.fm/5npyxpydys8uv?zt=eyJhbGciOiJIUzI1NiJ9.eyJzdHJlYW0iOiI1bnB5eHB5ZHlzOHV2IiwiaG9zdCI6InN0cmVhbS0xNzIuemVuby5mbSIsInJ0dGwiOjUsImp0aSI6InhoZFV4UGNNUUc2eWsxR0I5ZzdENFEiLCJpYXQiOjE3MTYxNzUxMzksImV4cCI6MTcxNjE3NTE5OX0.-H5QPR8KYpGEe4-i0vuClifNYM0sWZzNvkTHhRqPUuM&1716175139266' },
        { name: 'Metal', url: 'https://stm39.stmsrv.com:8382/;?1716176724313' },
        { name: 'Anos 80', url: 'https://stream-158.zeno.fm/3ywickpd3rkvv?zt=eyJhbGciOiJIUzI1NiJ9.eyJzdHJlYW0iOiIzeXdpY2twZDNya3Z2IiwiaG9zdCI6InN0cmVhbS0xNTguemVuby5mbSIsInJ0dGwiOjUsImp0aSI6IjVNUzljTlY0VG02VWlBZFVvazBqcFEiLCJpYXQiOjE3MTYxNzg2ODcsImV4cCI6MTcxNjE3ODc0N30.Umsbo62LR5tbHfFHYA63nvU1B6z38tBmwLqOZ07L50c&1716178687366' }
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

            if (currentPlaying) {
                currentPlaying.classList.remove('playing'); // Remove a classe 'playing' da estação anterior
            }
            li.classList.add('playing'); // Adiciona a classe 'playing' à estação atual
            currentPlaying = li; // Atualiza a estação atual
        });
        stationList.appendChild(li);
    });

    // Controle de volume
    volumeControl.addEventListener('input', (e) => {
        audioPlayer.volume = e.target.value;
    });
});
