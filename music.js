document.addEventListener("DOMContentLoaded", () => {

    const music = document.getElementById("bgMusic");
    const openingScreen = document.getElementById("openingScreen");
    const openInvitation = document.getElementById("openInvitation");
    const musicToggle = document.getElementById("musicToggle");

    let playing = false;

    // DAVETİYEYİ AÇ
    openInvitation.addEventListener("click", async () => {

        try {
            await music.play();

            playing = true;

            if (musicToggle) {
                musicToggle.innerHTML =
                    '<i class="fa-solid fa-volume-high"></i>';
            }

        } catch (error) {
            console.log("Müzik başlatılamadı:", error);
        }

        // Açılış kapağını kapat
        openingScreen.classList.add("hide");

    });


    // MÜZİK BUTONU
    if (musicToggle) {

        musicToggle.addEventListener("click", (event) => {

            event.stopPropagation();

            if (playing) {

                music.pause();

                playing = false;

                musicToggle.innerHTML =
                    '<i class="fa-solid fa-music"></i>';

            } else {

                music.play().then(() => {

                    playing = true;

                    musicToggle.innerHTML =
                        '<i class="fa-solid fa-volume-high"></i>';

                }).catch(error => {

                    console.log("Müzik başlatılamadı:", error);

                });

            }

        });

    }

});