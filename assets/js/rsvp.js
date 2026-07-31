document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("rsvpForm");

    if (!form) return;

    const guestGroup = document.getElementById("guestCountGroup");
    const guestInput = document.getElementById("guestCountInput");

    const plusBtn = document.getElementById("plusGuest");
    const minusBtn = document.getElementById("minusGuest");

    const radios = document.querySelectorAll('input[name="attendance"]');

    const submitButton = form.querySelector("button[type='submit']");



    function updateGuestVisibility() {

        const selected = document.querySelector('input[name="attendance"]:checked');

        if (!selected) return;

        guestGroup.style.display =
            selected.value === "Katılıyorum" ? "block" : "none";

    }



    radios.forEach(radio => {

        radio.addEventListener("change", updateGuestVisibility);

    });



    plusBtn.addEventListener("click", () => {

        guestInput.value = Number(guestInput.value) + 1;

    });



    minusBtn.addEventListener("click", () => {

        if (Number(guestInput.value) > 1) {

            guestInput.value = Number(guestInput.value) - 1;

        }

    });



    form.addEventListener("submit", function (e) {

        e.preventDefault();



        const fullname = document
            .getElementById("fullname")
            .value
            .trim();

        const attendance = document.querySelector(
            'input[name="attendance"]:checked'
        ).value;

        const guestCount =
            attendance === "Katılıyorum"
                ? guestInput.value
                : "0";



        if (fullname === "") {

            alert("Lütfen ad soyad giriniz.");

            return;

        }



        submitButton.disabled = true;

        submitButton.innerText = "Gönderiliyor...";



        emailjs.send(

            "service_o8ixuai",

            "template_6ugysau",

            {

                fullname: fullname,

                attendance: attendance,

                guestCount: guestCount,

                time: new Date().toLocaleString("tr-TR")

            }

        )

        .then(() => {

    form.reset();

    guestInput.value = 1;

    updateGuestVisibility();

    document.getElementById("rsvpSuccess").style.display = "block";

    form.style.display = "none";

})

        .catch((error) => {

            console.error(error);

            alert("Bir hata oluştu. Lütfen tekrar deneyiniz.");

        })

        .finally(() => {

            submitButton.disabled = false;

            submitButton.innerText = "Katılım Bilgisini Gönder";

        });

    });



    updateGuestVisibility();

});