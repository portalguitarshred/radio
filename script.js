document.addEventListener('DOMContentLoaded', () => {
    const stationList = document.getElementById('station-list');
    const audioPlayer = document.getElementById('audio-player');
    const volumeControl = document.getElementById('volume-control');
    const statusMessage = document.createElement('div');
    statusMessage.id = 'status-message';
    document.body.appendChild(statusMessage);
    let currentPlaying = null;
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    const stations = [
        { name: 'Rock', url: 'https://stream.zeno.fm/qupiusi3w5puv' },
        { name: 'Jazz', url: 'https://server01.ouvir.radio.br:8006/stream?1716175071041' },
        { name: 'Blues', url: 'https://stream-172.zeno.fm/5npyxpydys8uv?zt=eyJhbGciOiJIUzI1NiJ9.eyJzdHJlYW0iOiI1bnB5eHB5ZHlzOHV2IiwiaG9zdCI6InN0cmVhbS0xNzIuemVuby5mbSIsInJ0dGwiOjUsImp0aSI6InhoZFV4UGNNUUc2eWsxR0I5ZzdENFEiLCJpYXQiOjE3MTYxNzUxMzksImV4cCI6MTcxNjE3NTE5OX0.-H5QPR8KYpGEe4-i0vuClifNYM0sWZzNvkTHhRqPUuM&1716175139266' },
        { name: 'Metal', url: 'https://stm39.stmsrv.com:8382/;?1716176724313' },
        { name: 'Anos 80', url: 'https://stream-158.zeno.fm/3ywickpd3rkvv?zt=eyJhbGciOiJIUzI1NiJ9.eyJzdHJlYW0iOiIzeXdpY2twZDNya3Z2IiwiaG9zdCI6InN0cmVhbS0xNTguemVuby5mbSIsInJ0dGwiOjUsImp0aSI6IjVNUzljTlY0VG02VWlBZFVvazBqcFEiLCJpYXQiOjE3MTYxNzg2ODcsImV4cCI6MTcxNjE3ODc0N30.Umsbo62LR5tbHfFHYA63nvU1B6z38tBmwLqOZ07L50c&1716178687366' }
    ];

    stations.forEach(station => {
        const li = document.createElement('li');
        li.textContent = station.name;

        // Adiciona ícone de coração
        const heartIcon = document.createElement('i');
        heartIcon.classList.add('fa', 'fa-heart', 'heart-icon');
        if (favorites.includes(station.url)) {
            heartIcon.classList.add('favorited');
        }
        heartIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            heartIcon.classList.toggle('favorited');
            if (heartIcon.classList.contains('favorited')) {
                favorites.push(station.url);
            } else {
                favorites = favorites.filter(fav => fav !== station.url);
            }
            localStorage.setItem('favorites', JSON.stringify(favorites));
        });
        li.appendChild(heartIcon);

        // Adiciona ícone de compartilhamento
        const shareIcon = document.createElement('i');
        shareIcon.classList.add('fa', 'fa-share-alt', 'share-icon');
        shareIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            openShareModal(station.url);
        });
        li.appendChild(shareIcon);

        // Adiciona barras do espectro de áudio
        const spectrum = document.createElement('div');
        spectrum.classList.add('spectrum');
        for (let i = 0; i < 5; i++) {
            const bar = document.createElement('div');
            spectrum.appendChild(bar);
        }
        li.appendChild(spectrum);

        // Adiciona contêiner para informações da música
        const songInfo = document.createElement('div');
        songInfo.classList.add('song-info');
        songInfo.innerHTML = `
            <p><strong>Música:</strong> <span class="song-name"></span></p>
            <p><strong>Artista/Banda:</strong> <span class="artist-name"></span></p>
        `;
        li.addEventListener('click', () => {
            console.log(`Playing: ${station.name} - URL: ${station.url}`);
            audioPlayer.src = station.url;
            statusMessage.textContent = 'Carregando...';
            statusMessage.classList.add('show');
        
            audioPlayer.play().then(() => {
                statusMessage.textContent = '';
                statusMessage.classList.remove('show');
                fetchSongInfo(station.url, songInfo); // Atualiza as informações da música
            }).catch(error => {
                console.error('Playback failed', error);
                statusMessage.textContent = 'Erro ao carregar a estação. Tente novamente.';
            });
        
            audioPlayer.oncanplay = () => {
                statusMessage.textContent = '';
                statusMessage.classList.remove('show');
            };
        
            audioPlayer.onerror = () => {
                statusMessage.textContent = 'Erro ao carregar a estação. Tente novamente.';
            };
        
            if (currentPlaying) {
                currentPlaying.classList.remove('playing', 'accordion-active');
                currentPlaying.nextElementSibling.style.display = 'none'; // Oculta o contêiner anterior
            }
            li.classList.add('playing', 'accordion-active');
            songInfo.style.display = 'block'; // Exibe o contêiner atual
            currentPlaying = li;
        });

        stationList.appendChild(li);
        stationList.appendChild(songInfo); // Adiciona o contêiner abaixo do item da lista
    });

    function fetchSongInfo(url, songInfo) {
        // Simulação de atualização de informações da música
        setTimeout(() => {
            const songName = "Nome da Música"; // Isso seria obtido da API do stream
            const artistName = "Artista/Banda"; // Isso seria obtido da API do stream
            songInfo.querySelector('.song-name').textContent = songName;
            songInfo.querySelector('.artist-name').textContent = artistName;
        }, 1000);
    }

    volumeControl.addEventListener('input', (e) => {
        audioPlayer.volume = e.target.value;
        console.log(`Volume: ${audioPlayer.volume}`);
    });

    const clockIcon = document.getElementById('clock-icon');
    const timerModal = document.getElementById('timerModal');
    const closeModal = document.getElementById('closeModal');
    const setTimerButton = document.getElementById('setTimer');
    const timerInput = document.getElementById('timer');

    clockIcon.addEventListener('click', () => {
        timerModal.style.display = 'block';
    });

    closeModal.addEventListener('click', () => {
        timerModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === timerModal) {
            timerModal.style.display = 'none';
        }
    });

    setTimerButton.addEventListener('click', () => {
        const minutes = parseInt(timerInput.value, 10);
        if (isNaN(minutes) || minutes <= 0) {
            alert('Por favor, insira um valor válido de minutos.');
            return;
        }

        const milliseconds = minutes * 60 * 1000;
        setTimeout(() => {
            audioPlayer.pause();
            audioPlayer.currentTime = 0;
            alert('O temporizador desligou a rádio.');
        }, milliseconds);

        timerModal.style.display = 'none';
        alert(`Temporizador definido para ${minutes} minutos.`);
    });

    const shareModal = document.getElementById('shareModal');
    const closeShareModal = document.getElementById('closeShareModal');
    const copyLinkButton = document.getElementById('copyLink');
    const shareFacebookButton = document.getElementById('shareFacebook');
    const shareTwitterButton = document.getElementById('shareTwitter');
    let currentShareUrl = '';

    closeShareModal.addEventListener('click', () => {
        shareModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === shareModal) {
            shareModal.style.display = 'none';
        }
    });

    function openShareModal(url) {
        currentShareUrl = url;
        shareModal.style.display = 'block';
    }

    copyLinkButton.addEventListener('click', () => {
        navigator.clipboard.writeText(currentShareUrl).then(() => {
            alert('Link copiado para a área de transferência.');
        }).catch(err => {
            console.error('Erro ao copiar o link: ', err);
        });
    });

    shareFacebookButton.addEventListener('click', () => {
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentShareUrl)}`;
        window.open(facebookUrl, '_blank');
    });

    shareTwitterButton.addEventListener('click', () => {
        const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentShareUrl)}`;
        window.open(twitterUrl, '_blank');
    });
});
