document.addEventListener("DOMContentLoaded", () => {

    const music = document.getElementById("bgMusic");
    const button = document.getElementById("musicToggle");

    let playing = false;

    async function startMusic() {
        try {
            await music.play();
            playing = true;
            button.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
        } catch (e) {
            // Tarayıcı otomatik oynatmaya izin vermedi.
        }
    }

    function stopMusic() {
        music.pause();
        playing = false;
        button.innerHTML = '<i class="fa-solid fa-music"></i>';
    }

    // Masaüstünde otomatik başlatmayı dene
    startMusic();

    // Mobilde ilk dokunuşta başlat
    ["click","touchstart","scroll"].forEach(event => {
        document.addEventListener(event, startMusic, { once:true });
    });

    button.addEventListener("click", (e) => {

        e.stopPropagation();

        if (playing) {
            stopMusic();
        } else {
            startMusic();
        }

    });

});