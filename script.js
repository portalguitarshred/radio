document.addEventListener('DOMContentLoaded', () => {
    const stationList = document.getElementById('station-list');
    const audioPlayer = document.getElementById('audio-player');
    const volumeControl = document.getElementById('volume-control');
    const statusMessage = document.createElement('div'); // Elemento para mensagens de status
    statusMessage.id = 'status-message';
    document.body.appendChild(statusMessage); // Adiciona o elemento de status ao corpo do documento
    let currentPlaying = null;
    let favorites = JSON.parse(localStorage.getItem('favorites')) || []; // Carrega favoritos do localStorage

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

        li.addEventListener('click', () => {
            console.log(`Playing: ${station.name} - URL: ${station.url}`);
            audioPlayer.src = station.url;
            statusMessage.textContent = 'Carregando...'; // Mensagem de carregamento
            statusMessage.classList.add('show'); // Mostrar mensagem de status
        
            audioPlayer.play().then(() => {
                statusMessage.textContent = ''; // Limpa a mensagem de carregamento
                statusMessage.classList.remove('show'); // Esconde a mensagem de status
            }).catch(error => {
                console.error('Playback failed', error);
                statusMessage.textContent = 'Erro ao carregar a estação. Tente novamente.'; // Mensagem de erro
            });
        
            audioPlayer.oncanplay = () => {
                statusMessage.textContent = ''; // Limpa a mensagem de carregamento
                statusMessage.classList.remove('show'); // Esconde a mensagem de status
            };
        
            audioPlayer.onerror = () => {
                statusMessage.textContent = 'Erro ao carregar a estação. Tente novamente.'; // Mensagem de erro
            };
        
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
        console.log(`Volume: ${audioPlayer.volume}`);
    });

    // Lógica do Temporizador
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
        if (event.target === registerModal) {
            registerModal.style.display = 'none';
        }
    });

    registerButton.addEventListener('click', () => {
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (username && email && password) {
            // Aqui você pode adicionar a lógica para salvar os dados do usuário
            alert('Usuário registrado com sucesso!');
            registerModal.style.display = 'none';
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    });
});
