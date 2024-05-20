document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed'); // Log básico

    const stationList = document.getElementById('station-list');
    const audioPlayer = document.getElementById('audio-player');
    const volumeControl = document.getElementById('volume-control');
    const trackTitle = document.getElementById('track-title');
    const trackArtist = document.getElementById('track-artist');
    const trackArt = document.getElementById('track-art');
    let currentPlaying = null;

    const stations = [
        { name: 'Rock', url: 'https://21933.live.streamtheworld.com/RADIO_89FM_ADP.aac?1716174521095', statusUrl: 'http://your-icecast-server:port/status-json.xsl' },
        { name: 'Jazz', url: 'https://server01.ouvir.radio.br:8006/stream?1716175071041', statusUrl: 'http://your-icecast-server:port/status-json.xsl' },
        { name: 'Blues', url: 'https://stream-172.zeno.fm/5npyxpydys8uv?zt=eyJhbGciOiJIUzI1NiJ9.eyJzdHJlYW0iOiI1bnB5eHB5ZHlzOHV2IiwiaG9zdCI6InN0cmVhbS0xNzIuemVuby5mbSIsInJ0dGwiOjUsImp0aSI6InhoZFV4UGNNUUc2eWsxR0I5ZzdENFEiLCJpYXQiOjE3MTYxNzUxMzksImV4cCI6MTcxNjE3NTE5OX0.-H5QPR8KYpGEe4-i0vuClifNYM0sWZzNvkTHhRqPUuM&1716175139266', statusUrl: 'http://your-icecast-server:port/status-json.xsl' },
        { name: 'Metal', url: 'https://stm39.stmsrv.com:8382/;?1716176724313', statusUrl: 'http://your-icecast-server:port/status-json.xsl' },
        { name: 'Anos 80', url: 'https://stream-158.zeno.fm/3ywickpd3rkvv?zt=eyJhbGciOiJIUzI1NiJ9.eyJzdHJlYW0iOiIzeXdpY2twZDNya3Z2IiwiaG9zdCI6InN0cmVhbS0xNTguemVuby5mbSIsInJ0dGwiOjUsImp0aSI6IjVNUzljTlY0VG02VWlBZFVvazBqcFEiLCJpYXQiOjE3MTYxNzg2ODcsImV4cCI6MTcxNjE3ODc0N30.Umsbo62LR5tbHfFHYA63nvU1B6z38tBmwLqOZ07L50c&1716178687366', statusUrl: 'http://your-icecast-server:port/status-json.xsl' }
    ];

    function fetchTrackInfo(station) {
        console.log('Fetching track info from:', station.statusUrl); // Log básico
        fetch(station.statusUrl)
            .then(response => {
                console.log('Response received:', response); // Log básico
                return response.json();
            })
            .then(data => {
                console.log('Data received:', data); // Log básico
                const source = data.icestats.source;
                if (source.title) {
                    trackTitle.textContent = source.title;
                    trackArtist.textContent = source.artist || 'Artista Desconhecido';
                    trackArt.src = source.art || 'default_art.jpg'; // Use 'default_art.jpg' como imagem padrão
                    trackArt.style.display = 'block';
                } else {
                    trackTitle.textContent = 'Título da Música';
                    trackArtist.textContent = 'Artista Desconhecido';
                    trackArt.src = 'default_art.jpg';
                    trackArt.style.display = 'block';
                }
            })
            .catch(error => {
                console.error('Error fetching track metadata', error);
                trackTitle.textContent = 'Título da Música';
                trackArtist.textContent = 'Artista Desconhecido';
                trackArt.src = 'default_art.jpg';
                trackArt.style.display = 'block';
            });
    }

    stations.forEach(station => {
        const li = document.createElement('li');
        li.textContent = station.name;
        li.addEventListener('click', () => {
            console.log(`Playing: ${station.name} - URL: ${station.url}`); // Log básico
            audioPlayer.src = station.url;
            audioPlayer.play().catch(error => {
                console.error('Playback failed', error);
            });

            if (currentPlaying) {
                currentPlaying.classList.remove('playing');
            }
            li.classList.add('playing');
            currentPlaying = li;

            // Fetch track information
            fetchTrackInfo(station);
        });
        stationList.appendChild(li);
    });

    volumeControl.addEventListener('input', (e) => {
        audioPlayer.volume = e.target.value;
        console.log(`Volume: ${audioPlayer.volume}`); // Log básico
    });
});
