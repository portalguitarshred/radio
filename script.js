document.addEventListener('DOMContentLoaded', () => {
    const stationList = document.getElementById('station-list');
    const audioPlayer = document.getElementById('audio-player');
    const audioVisualizer = document.getElementById('audio-visualizer');

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

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaElementSource(audioPlayer);
    source.connect(analyser);
    analyser.connect(audioContext.destination);

    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const canvasCtx = audioVisualizer.getContext('2d');
    audioVisualizer.width = window.innerWidth;
    audioVisualizer.height = 100;

    function draw() {
        requestAnimationFrame(draw);
        analyser.getByteFrequencyData(dataArray);
        canvasCtx.fillStyle = '#000';
        canvasCtx.fillRect(0, 0, audioVisualizer.width, audioVisualizer.height);

        const barWidth = (audioVisualizer.width / bufferLength) * 2.5;
        let barHeight;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i];
            canvasCtx.fillStyle = 'rgb(' + (barHeight + 100) + ',50,50)';
            canvasCtx.fillRect(x, audioVisualizer.height - barHeight / 2, barWidth, barHeight / 2);

            x += barWidth + 1;
        }
    }

    draw();

    // Ensure the audio context is resumed on user interaction
    document.body.addEventListener('click', () => {
        if (audioContext.state ===
