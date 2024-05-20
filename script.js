document.addEventListener('DOMContentLoaded', () => {
    const stationList = document.getElementById('station-list');
    const audioPlayer = document.getElementById('audio-player');
    const volumeControl = document.getElementById('volume-control');
    const trackTitle = document.getElementById('track-title');
    const trackArtist = document.getElementById('track-artist');
    const trackArt = document.getElementById('track-art');
    let currentPlaying = null;

    const stations = [
        { name: 'Rock', url: 'https://21933.live.streamtheworld.com/RADIO_89FM_ADP.aac?1716174521095', api: 'https://example.com/rock_metadata' },
        { name: 'Jazz', url: 'https://server01.ouvir.radio.br:8006/stream?1716175071041', api: 'https://example.com/jazz_metadata' },
        { name: 'Blues', url: 'https://stream-172.zeno.fm/5npyxpydys8uv?zt=eyJhbGciOiJIUzI1NiJ9.eyJzdHJlYW0iOiI1bnB5eHB5ZHlzOHV2IiwiaG9zdCI6InN0cmVhbS0xNzIuemVuby5mbSIsInJ0dGwiOjUsImp0aSI6InhoZFV4UGNNUUc2eWsxR0I5ZzdENFEiLCJpYXQiOjE3MTYxNzUxMzksImV4cCI6MTcxNjE3NTE5OX0.-H5QPR8KYpGEe4-i0vuClifNYM0sWZzNvkTHhRqPUuM&1716175139266', api: 'https://example.com/blues_metadata' },
        { name: 'Metal', url: 'https://stm39.stmsrv.com:8382/;?1716176724313', api: 'https://example.com/metal_metadata' },
        { name: 'Anos 80', url: 'https://stream-158.zeno.fm/3ywickpd3rkvv?zt=eyJhbGciOiJIUzI1NiJ9.eyJzdHJlYW0iOiIzeXdpY2twZDNya3Z2IiwiaG9zdCI6InN0cmVhbS0xNTguemVuby5mbSIsInJ0dGwiOjUsImp0aSI6IjVNUzljTlY0VG02VWlBZFVvazBqcFEiLCJpYXQiOjE3MTYxNzg2ODcsImV4cCI6MTcxNjE3ODc0N30.Umsbo62LR5tbHfFHYA63nvU1B6z38tBmwLqOZ07L50c&1716178687366', api: 'https://example.com/80s_metadata' }
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
                currentPlaying.classList.remove('playing');
            }
            li.classList.add('playing');
            currentPlaying = li;

            // Atualiza as informações da música atual através da API
            fetch(station.api)
                .then(response => response.json())
                .then(data => {
                    trackTitle.textContent = data.title || 'Título da Música';
                    trackArtist.textContent = data.artist || 'Artista';
                    trackArt.src = data.art || 'default_art.jpg';
                    trackArt.style.display = 'block';
                })
                .catch(error => {
                    console.error('Error fetching track metadata', error);
                    trackTitle.textContent = 'Título da Música';
                    trackArtist.textContent = 'Artista';
                    trackArt.src = 'default_art.jpg';
                    trackArt.style.display = 'block';
                });
        });
        stationList.appendChild(li);
    });

    volumeControl.addEventListener('input', (e) => {
        audioPlayer.volume = e.target.value;
        console.log(`Volume: ${audioPlayer.volume}`);
    });
});
