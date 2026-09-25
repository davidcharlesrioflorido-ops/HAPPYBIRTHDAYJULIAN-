document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const passwordScreen = document.getElementById("passwordScreen");
    const doorScreen = document.getElementById("doorScreen");
    const birthdayScreen = document.getElementById("birthdayScreen");
    const mainContent = document.getElementById("mainContent");

    const passwordInput = document.getElementById("passwordInput");
    const unlockBtn = document.getElementById("unlockBtn");
    const passwordMessage = document.getElementById("passwordMessage");

    const doors = document.querySelector(".doors");
    const doorContent = document.querySelector(".door-content");
    const openDoorBtn = document.getElementById("openDoorBtn");

    const enterMemoriesBtn = document.getElementById("enterMemoriesBtn");

    const backgroundMusic = document.getElementById("backgroundMusic");

    const envelopeBtn = document.getElementById("envelopeBtn");
    const letterContent = document.querySelector(".letter-paper");

    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const closeLightbox = document.getElementById("closeLightbox");

    const particlesContainer =
        document.getElementById("particles") || document.body;


    /* =====================================================
       SETTINGS
    ===================================================== */

    const SECRET_PASSWORD = "072525";

    let doorOpening = false;


    /* =====================================================
       HELPER FUNCTIONS
    ===================================================== */

    function showElement(element) {

        if (!element) return;

        element.classList.remove("hidden");

        if (element.hasAttribute("aria-hidden")) {
            element.setAttribute("aria-hidden", "false");
        }

    }


    function hideElement(element) {

        if (!element) return;

        element.classList.add("hidden");

        if (element.hasAttribute("aria-hidden")) {
            element.setAttribute("aria-hidden", "true");
        }

    }


    function scrollToTop() {

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "auto"
        });

    }


    /* =====================================================
       INITIAL STATE
    ===================================================== */

    hideElement(doorScreen);
    hideElement(birthdayScreen);
    hideElement(mainContent);
    hideElement(lightbox);


    if (letterContent) {
        letterContent.classList.add("hidden");
    }


    if (envelopeBtn) {
        envelopeBtn.classList.remove("open");
        envelopeBtn.setAttribute("aria-expanded", "false");
    }


    /* =====================================================
       PARTICLES
    ===================================================== */

    function createParticles() {

        if (!particlesContainer) return;

        const fragment = document.createDocumentFragment();

        for (let i = 0; i < 45; i++) {

            const particle = document.createElement("div");

            particle.className = "particle";

            particle.style.left =
                `${Math.random() * 100}%`;

            particle.style.animationDuration =
                `${5 + Math.random() * 8}s`;

            particle.style.animationDelay =
                `${Math.random() * 5}s`;

            particle.style.opacity =
                `${0.2 + Math.random() * 0.7}`;

            fragment.appendChild(particle);
        }

        particlesContainer.appendChild(fragment);
    }

    createParticles();


    /* =====================================================
       PASSWORD
    ===================================================== */

    function unlockWebsite() {

        if (!passwordInput || !passwordScreen) {
            return;
        }

        const enteredPassword =
            passwordInput.value.trim();


        /* ================================================
           CORRECT PASSWORD
        ================================================= */

        if (enteredPassword === SECRET_PASSWORD) {

            if (passwordMessage) {

                passwordMessage.textContent =
                    "Correct! ❤️";

                passwordMessage.style.color =
                    "#4dff88";
            }


            /* ============================================
               START MUSIC
            ============================================ */

            if (backgroundMusic) {

                backgroundMusic.volume = 0.45;

                const playPromise =
                    backgroundMusic.play();

                if (playPromise) {

                    playPromise.catch(() => {
                        /* Browser may block playback.
                           It was triggered by user interaction,
                           so normally it should work. */
                    });

                }
            }


            /* ============================================
               PASSWORD SCREEN EXIT
            ============================================ */

            passwordScreen.classList.add(
                "is-leaving"
            );


            setTimeout(() => {

                hideElement(passwordScreen);

                showElement(doorScreen);

                scrollToTop();

                passwordInput.blur();

            }, 900);


        } else {

            /* ============================================
               WRONG PASSWORD
            ============================================ */

            if (passwordMessage) {

                passwordMessage.textContent =
                    "Wrong password 😭 Try again.";

                passwordMessage.style.color =
                    "#ff4d4d";
            }


            passwordInput.value = "";

            passwordInput.focus();

        }

    }


    if (unlockBtn) {

        unlockBtn.addEventListener(
            "click",
            unlockWebsite
        );

    }


    if (passwordInput) {

        passwordInput.addEventListener(
            "keydown",
            (event) => {

                if (event.key === "Enter") {

                    event.preventDefault();

                    unlockWebsite();

                }

            }
        );

    }


    /* =====================================================
       OPEN SPIDER-VERSE DOORS
    ===================================================== */

    function openSpiderVerse() {

        if (doorOpening) {
            return;
        }

        if (!doors || !doorScreen) {
            return;
        }

        doorOpening = true;


        /* ================================================
           OPEN DOORS
        ================================================= */

        doors.classList.add("open");


        /* ================================================
           HIDE BUTTON
        ================================================= */

        if (openDoorBtn) {

            openDoorBtn.classList.add(
                "is-opening"
            );

            openDoorBtn.disabled = true;

        }


        /* ================================================
           HIDE TEXT
        ================================================= */

        if (doorContent) {

            doorContent.classList.add(
                "is-hiding"
            );

        }


        /* ================================================
           WAIT FOR DOOR ANIMATION
        ================================================= */

        setTimeout(() => {

            doorScreen.classList.add(
                "is-leaving"
            );


            setTimeout(() => {

                hideElement(doorScreen);

                showElement(birthdayScreen);

                scrollToTop();

                doorScreen.classList.remove(
                    "is-leaving"
                );

            }, 800);

        }, 2000);

    }


    if (openDoorBtn) {

        openDoorBtn.addEventListener(
            "click",
            openSpiderVerse
        );

    }


    /* =====================================================
       ENTER MEMORIES
    ===================================================== */

    if (enterMemoriesBtn) {

        enterMemoriesBtn.addEventListener(
            "click",
            () => {

                if (!birthdayScreen) {
                    return;
                }


                birthdayScreen.classList.add(
                    "is-leaving"
                );


                setTimeout(() => {

                    hideElement(birthdayScreen);

                    showElement(mainContent);

                    scrollToTop();

                }, 900);

            }
        );

    }


    /* =====================================================
       ENVELOPE / LETTER
    ===================================================== */

    if (envelopeBtn) {

        envelopeBtn.addEventListener(
            "click",
            () => {

                const isOpening =
                    !envelopeBtn.classList.contains(
                        "open"
                    );


                envelopeBtn.classList.toggle(
                    "open",
                    isOpening
                );


                envelopeBtn.setAttribute(
                    "aria-expanded",
                    String(isOpening)
                );


                if (letterContent) {

                    letterContent.classList.toggle(
                        "hidden",
                        !isOpening
                    );

                }

            }
        );


        /* ================================================
           KEYBOARD ACCESS
        ================================================= */

        envelopeBtn.addEventListener(
            "keydown",
            (event) => {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    envelopeBtn.click();

                }

            }
        );

    }


    /* =====================================================
       MEMORY LIGHTBOX
    ===================================================== */

    const memoryImages =
        document.querySelectorAll(
            ".memory-card img"
        );


    memoryImages.forEach((image) => {

        image.addEventListener(
            "click",
            () => {

                if (
                    !lightbox ||
                    !lightboxImage
                ) {
                    return;
                }


                lightboxImage.src =
                    image.src;


                lightboxImage.alt =
                    image.alt ||
                    "Memory";


                showElement(lightbox);

                document.body.classList.add(
                    "lightbox-open"
                );

            }
        );

    });


    /* =====================================================
       CLOSE LIGHTBOX
    ===================================================== */

    function closeImageViewer() {

        if (!lightbox) {
            return;
        }


        hideElement(lightbox);


        if (lightboxImage) {

            lightboxImage.src = "";

        }


        document.body.classList.remove(
            "lightbox-open"
        );

    }


    if (closeLightbox) {

        closeLightbox.addEventListener(
            "click",
            closeImageViewer
        );

    }


    if (lightbox) {

        lightbox.addEventListener(
            "click",
            (event) => {

                if (
                    event.target === lightbox
                ) {

                    closeImageViewer();

                }

            }
        );

    }


    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" &&
                lightbox &&
                !lightbox.classList.contains("hidden")
            ) {

                closeImageViewer();

            }

        }
    );


    /* =====================================================
       IMAGE KEYBOARD ACCESS
    ===================================================== */

    memoryImages.forEach((image) => {

        image.setAttribute(
            "tabindex",
            "0"
        );


        image.addEventListener(
            "keydown",
            (event) => {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    image.click();

                }

            }
        );

    });

});