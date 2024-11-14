let scriptExecutedDesk = false;
let scriptExecutedMob = false;
function getScreenWidth() {
    return window.innerWidth ? window.innerWidth : $(window).width();
}
function loadVideo() {
    const videoContainer = document.getElementById('bs-video-container');
    if (getScreenWidth() >= 768 && !scriptExecutedDesk) {
        scriptExecutedDesk = true;
        scriptExecutedMob = false;
        videoContainer.innerHTML = `
            <video poster="new_files/bf_banner_1920_698.webp" class="bs-bg-video" preload="none" playsinline autoplay muted loop>
                <source src="new_files/1920-698.webm" type="video/webm" />
                <source src="new_files/1920-698.mp4" type="video/mp4" />
            </video>
      `;
    }
    if (getScreenWidth() <= 768 && !scriptExecutedMob) {
        scriptExecutedMob = true;
        scriptExecutedDesk = false;
        videoContainer.innerHTML = `
            <video poster="new_files/bf_banner_375_542.webp" class="bs-bg-video" preload="none" playsinline autoplay muted loop>
                <source src="new_files/375-542.webm" type="video/webm" />
                <source src="new_files/375-542.mp4" type="video/mp4" />
            </video>
      `;
    }
}
window.addEventListener('load', loadVideo);
window.addEventListener('resize', loadVideo);