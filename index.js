const menuOpenButton = document.querySelector('#menu-open-button');
const menuCloseButton = document.querySelector('#menu-close-button');
const navLinks = document.querySelectorAll('.nav-link');

menuOpenButton.addEventListener("click",() => {
    //mobile visibility
document.body.classList.toggle("show-mobile-menu");
});
//close
menuCloseButton.addEventListener("click",() => 
menuOpenButton.click ()
);

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        if (document.body.classList.contains("show-mobile-menu")) {
            document.body.classList.remove("show-mobile-menu");
        }
    });
});

//albums music
const playbtn = document.getElementById('play');
const prevbtn = document.getElementById('prev');
const nextbtn = document.getElementById('next');
const musiccontainer = document.getElementById('music_model_container');
const audio = document.getElementById('audio');
const currenttimeElement = document.getElementById('currenttime');
const durationElement = document.getElementById('duration');
const progress = document.getElementById('progress');
const progresscontainer = document.getElementById('progress_bar');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const artist = document.querySelector('.artist');
let music_no = document.querySelectorAll('.music_no');

// Declaration of songs
const songs= ['intro', 'hope','joyeux3','happy','life'];
const artists = ['intro', 'hope','joyeux3','happy','life'];
const bgcolor = ['#8365b4', '#b38465', '#b36593', '#93b365', '#ef9d66'];

// Index for songs
let songIndex = 0;
let artistIndex = 0;
let bgcolorIndex = 0;


////// Load song and appl animations
function loadSong(song, artistName, bgColorName) {
    title.innerText = song;
    artist.innerText = artistName;
    audio.src = `./music/${song}.mp3`;
    cover.src = `./images/${artistName}.jpg`;

    music_no.forEach((e1) => {
        e1.innerText = '0' + (songIndex + 1);
    });

    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('timeupdate', updatecurrenttime);
    pauseSong();
    // GSAP animations
    gsap.from(cover, {
        duration: 1,
        opacity: 0.9,
        scale: 1.25,
        ease: 'easeInOut',
    });
    gsap.from(title, {
        duration: 1,
        opacity: 0,
        y: 50,
        ease: 'easeInOut',
    });
    gsap.from(artist, {
        duration: 0.75,
        opacity: 0,
        y: 40,
        ease: 'easeInOut',
    });
    gsap.to(musiccontainer, {
        duration: 1,
        backgroundColor: bgColorName,
        ease: 'easeInOut',
    });
    gsap.from('.music_no', {
        duration: 0.75,
        stagger: 0.1,
        opacity: 0,
        y: 30,
        ease: 'easeInOut',
    }); 
    artists.forEach (e1=>{
         if(e1===artists[artistIndex]){
             let albumCover=e1.replace(/\s/g,'');
 
         gsap.to(`#${albumCover}`,{
             duration:0.75,
             y:-20,
             opacity:1,
             ease:"EaseInOut"
         });
     }else{
        
         let albumCover=e1.replace(/\s/g,'');
 
     gsap.to(`#${albumCover}`,{
         duration:0.75,
         y:0,
         opacity:0.5,
         ease:"EaseInOut"
     });
   }
 });
 

   
}

// Play song
function playSong() {
    musiccontainer.classList.add('play');
    document.getElementById('pause_btn').style.display = 'block';
    document.getElementById('play_btn').style.display = 'none';
    audio.play();
}

// Pause song
function pauseSong() {
    musiccontainer.classList.remove('play');
    document.getElementById('pause_btn').style.display = 'none';
    document.getElementById('play_btn').style.display = 'block';
    audio.pause();
}

// Previous song
function prevSong() {
    songIndex--;
    artistIndex--;
    bgcolorIndex--;

    if (songIndex < 0) songIndex = songs.length - 1;
    if (artistIndex < 0) artistIndex = artists.length - 1;
    if (bgcolorIndex < 0) bgcolorIndex = bgcolor.length - 1;

    loadSong(songs[songIndex], artists[artistIndex], bgcolor[bgcolorIndex]);
    playSong();

    artists.forEach (e1=>{
         if(e1===artists[artistIndex]){
             let albumCover=e1.replace(/\s/g,'');
 
         gsap.to(`#${albumCover}`,{
             duration:0.75,
             y:-20,
             opacity:1,
             ease:"EaseInOut"
         });
     }else{
        
         let albumCover=e1.replace(/\s/g,'');
 
     gsap.to(`#${albumCover}`,{
         duration:0.75,
         y:0,
         opacity:0.5,
         ease:"EaseInOut"
     });
   }
 });
}

// Next song
function nextSong() {
    songIndex++;
    artistIndex++;
    bgcolorIndex++;

    if (songIndex > songs.length - 1) songIndex = 0;
    if (artistIndex > artists.length - 1) artistIndex = 0;
    if (bgcolorIndex > bgcolor.length - 1) bgcolorIndex = 0;

    loadSong(songs[songIndex], artists[artistIndex], bgcolor[bgcolorIndex]);
    playSong();
    artists.forEach (e1=>{
         if(e1===artists[artistIndex]){
             let albumCover=e1.replace(/\s/g,'');
 
         gsap.to(`#${albumCover}`,{
             duration:0.75,
             y:-20,
             opacity:1,
             ease:"EaseInOut"
         });
     }else{
        
         let albumCover=e1.replace(/\s/g,'');
 
     gsap.to(`#${albumCover}`,{
         duration:0.75,
         y:0,
         opacity:0.5,
         ease:"EaseInOut"
     });
   }
 });
    
}

// Update progress
function updateProgress(e) {
    const { duration, currentTime } = audio;
    if (!isNaN(duration) && duration > 0) {
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
    }
}

// Set progress
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}

// Update duration
function updateDuration() {
    const duration = formatTime(audio.duration);
    durationElement.textContent = duration;
}

// Update current time
function updatecurrenttime() {
    const currenttime = formatTime(audio.currentTime);
    currenttimeElement.textContent = currenttime;
}

// Format time
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Event listeners
playbtn.addEventListener('click', () => {
    const isPlaying = musiccontainer.classList.contains('play');
    isPlaying ? pauseSong() : playSong();
});

prevbtn.addEventListener('click', prevSong);
nextbtn.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', updateProgress);
progresscontainer.addEventListener('click', setProgress);
audio.addEventListener('ended', nextSong);

// Event listener for cover click to change song
const albumCovers = document.querySelectorAll('.music_albums img')
;
albumCovers.forEach((coverImg, index) => {
    coverImg.addEventListener('click', () => {
        songIndex = index;
        artistIndex = index;
        bgcolorIndex = index;
        loadSong(songs[songIndex], artists[artistIndex], bgcolor[bgcolorIndex]);
        playSong();

        playSong();
    artists.forEach (e1=>{
         if(e1===artists[artistIndex]){
             let albumCover=e1.replace(/\s/g,'');
 
         gsap.to(`#${albumCover}`,{
             duration:0.75,
             y:-20,
             opacity:1,
             ease:"EaseInOut"
         });
     }else{
        
         let albumCover=e1.replace(/\s/g,'');
 
     gsap.to(`#${albumCover}`,{
         duration:0.75,
         y:0,
         opacity:0.5,
         ease:"EaseInOut"
     });
   }
 });   
    });
});

// Load initial song
loadSong(songs[songIndex], artists[artistIndex], bgcolor[bgcolorIndex]);
