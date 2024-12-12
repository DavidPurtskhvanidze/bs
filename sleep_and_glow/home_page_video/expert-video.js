let scriptExecutedDesk = false;
let scriptExecutedMob = false;
function getScreenWidth() {
    return window.innerWidth ? window.innerWidth : $(window).width();
}
function loadVideo() {
    const videoContainer = document.getElementById('expertVideoContainer');
    if (getScreenWidth() >= 600 && !scriptExecutedDesk) {
        scriptExecutedDesk = true;
        scriptExecutedMob = false;
        videoContainer.innerHTML = `
        <video id="expertFullWidthVideo" poster="files/Sara_Gomez_16x9.webm" class="expert-full-width-video" preload="none" playsinline autoplay muted loop>
            <source src="files/Sara_Gomez_16x9.webm" type="video/webm" />
            <source src="files/Sara_Gomez_16x9.mp4" type="video/mp4" />
            No video available.
        </video>
      `;
    }
    if (getScreenWidth() <= 600 && !scriptExecutedMob) {
        scriptExecutedMob = true;
        scriptExecutedDesk = false;
        videoContainer.innerHTML = `
        <video id="expertFullWidthVideo" poster="files/Sara_Gomez_9x16.webm" class="expert-full-width-video" preload="none" playsinline autoplay muted loop>
            <source src="files/Sara_Gomez_9x16.webm" type="video/webm" />
            <source src="files/Sara_Gomez_9x16.mp4" type="video/mp4" />
            No video available.
        </video>
      `;
    }

    console.log(getScreenWidth(), scriptExecutedMob, scriptExecutedDesk)

    const video = document.getElementById("expertFullWidthVideo");
    const playPauseBtn = document.getElementById("videoPlayPause");
    const muteUnmuteBtn = document.getElementById("videoMuteUnmute");

    playPauseBtn.addEventListener("click", function () {
        if (video.paused) {
            video.play();
            playPauseBtn.classList.remove('video-play-button');
            playPauseBtn.classList.add('video-pause-button');
        } else {
            video.pause();
            playPauseBtn.classList.remove('video-pause-button');
            playPauseBtn.classList.add('video-play-button');
        }
    });
    muteUnmuteBtn.addEventListener("click", function () {
        if (video.muted) {
            video.muted = false;
            muteUnmuteBtn.classList.remove('video-unmute_button');
            muteUnmuteBtn.classList.add('video-mute_button');
        } else {
            video.muted = true;
            muteUnmuteBtn.classList.remove('video-mute_button');
            muteUnmuteBtn.classList.add('video-unmute_button');
        }

    });
}
window.addEventListener('load', loadVideo);


