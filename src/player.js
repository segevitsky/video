import getData from './modules/fetchData';
import { incrementViews, thumbsUp, thumbsDown } from './modules/firebase';


function convertSeconds(time){
  time = Number(time);
  let m = Math.floor(time % 3600 / 60);
  if (time < 10) {
    time = time + '';
    time = time.padStart(2,'0');
  }
  if (m === 1)  {
    return '0' + m + ':00';
  } 
  return '00:' + time ;
}


// Does the browser actually support the video element?
let supportsVideo = !!document.createElement('video').canPlayType;
if (supportsVideo) {
  // Obtain handles to main elements
  let video = document.querySelector('video');
  let videoControls = document.getElementById('video-controls');
  let videoLength;

  // Hide the default controls
  video.controls = false;

  //Lets get our video length
  video.onloadedmetadata = function(){
    videoLength = Math.floor(this.duration);
    console.log(videoLength);
  };

  // Display the user defined video controls
  videoControls.setAttribute('data-state', 'visible');

  // our video keys and progress bar
  let playpause = document.getElementById('playpause');
  let stop = document.getElementById('stop');
  let mute = document.getElementById('mute');
  let volinc = document.getElementById('volinc');
  let voldec = document.getElementById('voldec');
  let progress = document.getElementById('progress');
  const timer = document.getElementById( 'timer' );
  let progressBar = document.getElementById('progress-bar');

  // If the browser doesn't support the progress element, set its state for some different styling
  let supportsProgress = (document.createElement('progress').max !== undefined);
  if (!supportsProgress) progress.setAttribute('data-state', 'fake');

  let changeButtonState = function(type) {
    // Play/Pause button
    if (type == 'playpause') {
      if (video.paused || video.ended) {
        playpause.setAttribute('data-state', 'play');
      }
      else {
        playpause.setAttribute('data-state', 'pause');
      }
    }
    // Mute button
    else if (type == 'mute') {
      mute.setAttribute('data-state', video.muted ? 'unmute' : 'mute');
    }
  };


  // Check the volume
  let checkVolume = function(dir) {
    if (dir) {
      let currentVolume = Math.floor(video.volume * 10) / 10;
      if (dir === '+') {
        if (currentVolume < 1) video.volume += 0.1;
      }
      else if (dir === '-') {
        if (currentVolume > 0) video.volume -= 0.1;
      }
      // If the volume has been turned off, also set it as muted
      if (currentVolume <= 0) video.muted = true;
      else video.muted = false;
    }
    changeButtonState('mute');
  };

  // Change the volume
  let alterVolume = function(dir) {
    checkVolume(dir);
  };


  // Only add the events if addEventListener is supported (IE8 and less don't support it, but that will use Flash anyway)
  if (document.addEventListener) {
    // Wait for the video's meta data to be loaded, then set the progress bar's max value to the duration of the video
    video.addEventListener('loadedmetadata', function() {
      progress.setAttribute('max', video.duration);
    });

    // Add event listeners for video specific events
    video.addEventListener('play', function() {
      changeButtonState('playpause');
    }, false);
    
    video.addEventListener('volumechange', function() {
      checkVolume();
    }, false);

    video.addEventListener('click',() => {
      changeButtonState('playpause');
    });

    // Add events for all buttons			
    playpause.addEventListener('click', function(e) {
      if (video.paused || video.ended) video.play();
      else video.pause();
    });			

    stop.addEventListener('click', function() {
      video.pause();
      video.currentTime = 0;
      progress.value = 0;
      // Update the play/pause button's 'data-state' which allows the correct button image to be set via CSS
      changeButtonState('playpause');
    });
  
    mute.addEventListener('click', function() {
      video.muted = !video.muted;
      changeButtonState('mute');
    });

    volinc.addEventListener('click', function() {
      alterVolume('+');
    });

    voldec.addEventListener('click', function() {
      alterVolume('-');
    });
    

    // As the video is playing, update the progress bar
    video.addEventListener('timeupdate', function(e) {
      // For mobile browsers, ensure that the progress element's max attribute is set
      if (!progress.getAttribute('max')) progress.setAttribute('max', video.duration);
      progress.value = video.currentTime;
      progressBar.style.width = Math.floor((video.currentTime / video.duration) * 100) + '%';
      timer.innerHTML = convertSeconds(Math.floor(e.target.currentTime));
    });


    // React to the user clicking within the progress bar
    progress.addEventListener('click', function(e) {
      //let pos = (e.pageX  - this.offsetLeft) / this.offsetWidth; // Also need to take the parent into account here as .controls now has position:relative
      let pos = (e.pageX  - (this.offsetLeft + this.offsetParent.offsetLeft)) / this.offsetWidth;
      video.currentTime = pos * video.duration;
    });

  }
}