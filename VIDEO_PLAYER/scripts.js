const player = document.querySelector('.player')
const video = player.querySelector('.viewer')
const progress = player.querySelector('.progress')
const progressBar = player.querySelector('.progress__filled')
const toggle = player.querySelector('.toggle')
const skipButtons = player.querySelectorAll('[data-skip]')
const ranges = player.querySelectorAll('.player__slider')
const fullscreen = player.querySelector('.fullscreen_button')

progressBar.style.flexBasis = `0%`
function togglePlay(){
    if(video.paused) {
        video.play()
    } else {
        video.pause()
    }
}

function updateButton() {
    const icon = this.paused ? '▶' : '▮▮'
    toggle.textContent = icon
}

function skip() {
    console.log(this.dataset.skip)
    video.currentTime += parseFloat(this.dataset.skip)
}

function handleRangeUpdate() {
    video[this.name] = this.value
}

function handleUpdateBar(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration
    video.currentTime = scrubTime
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`
}

function toggleFullscreen() {

    if (document.webkitFullscreenElement || video.mozDisplayingFullScreen){
        (video.webkitExitFullscreen) ? video.webkitExitFullscreen() : video.mozExitFullScreen()
    } else {
        (video.webkitRequestFullscreen) ? video.webkitRequestFullscreen() : video.mozRequestFullScreen()
    }
}

video.addEventListener('click', togglePlay)
video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)
video.addEventListener('timeupdate', handleProgress)
let mouseDown = false
progress.addEventListener('click', () => handleUpdateBar)
progress.addEventListener('mousemove', (e) => mouseDown && handleUpdateBar(e))
progress.addEventListener('mousedown', () => mouseDown = true)
progress.addEventListener('mouseup', () => mouseDown = false)


toggle.addEventListener('click', togglePlay)
skipButtons.forEach(button => button.addEventListener('click', skip))
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

fullscreen.addEventListener('click', toggleFullscreen)