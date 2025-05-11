let now_playing = document.querySelector('.now-playing');
let track_artist = document.querySelector('.track-artist');
let track_name = document.querySelector('.track-name');
let track_art = document.querySelector('.track-art');

let playpause_button = document.querySelector('.playpause-track');
let next_button = document.querySelector('.next-track');
let prev_button = document.querySelector('.prev-track');


let seek_slider = document.querySelector('.seek-slider');
let volume_slider = document.querySelector('.volume-slider');
let current_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let wave = document.getElementById('wave');
let randomIcon = document.querySelector('.fa-random');
let current_track = document.createElement('audio');

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const music_list = [
    {
        img : 'images/Daft.png',
        name : 'Son Of Flynn',
        artist : 'Daft Punk',
        music : 'music/son of flynn.mp3',
        shadowColor: 'rgba(97, 197, 240, 0.639)'
    },

    {
        img : 'images/rinzler.jpeg',
        name : 'Rinzler',
        artist : 'Daft Punk',
        music : 'music/rinzler.mp3'
        
    },

    {
        img : 'images/end_of_line.jpeg',
        name : 'End of line',
        artist : 'Daft Punk',
        music : 'music/end of line.mp3'
        
    },

    {
        img : 'images/the_grid.jpeg',
        name : 'The Grid',
        artist : 'Daft Punk',
        music : 'music/the grid.mp3'
        
    },

    {
        img : 'images/Overture.jpeg',
        name : 'Overture',
        artist : 'Daft Punk',
        music : 'music/overture.mp3'
        
    }

   
];

loadTrack(track_index);

function loadTrack(track_index){
    clearInterval(updateTimer);
    reset();

    current_track.src = music_list[track_index].music;
    current_track.load();

    track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
    track_name.textContent = music_list[track_index].name;
    track_artist.textContent = music_list[track_index].artist;
    now_playing.textContent = "Playing " + (track_index + 1 ) + " of " + music_list.length;

    updateTimer = setInterval(setUpdate, 1000);

    current_track.addEventListener('ended', nextTrack);
    
}

// function random_bg_color(){
//     let hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e'];
//     let a;

//     function populate(a){
//         for(let i=0; i<6; i++){
//             let x = Math.round(Math.random() * 14);
//             let y = hex[x];
//             a += y;
//         }
//         return a;
//     }
//     let Color1 = populate('#');
//     let Color2 = populate('#');
//     var angle = 'to right';

//     let gradient = 'linear-gradient(' + angle + ',' + Color1 + ", " + Color2 + ')';
//     document.body.style.background = gradient;
// }

// Call to the function
// random_bg_color();

function reset(){
    current_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}

function randomTrack() {
    isRandom ? pauseRandom() : playRandom();
}

function playRandom() {
    isRandom = true;
    randomIcon.classList.add('randomActive');
}

function pauseRandom() {
    isRandom = false;
    randomIcon.classList.remove('randomActive');
}

function repeatTrack(){
    let current_index = track_index;
    loadTrack(current_index);
    playTrack();
}
function playpauseTrack() {
    if (isPlaying) {
        pauseTrack();
        playpause_button.innerHTML = '<i class="fa fa-play-circle fa-5x" title="play/pause"></i>';
    } else {
        playTrack();
        playpause_button.innerHTML = '<i class="fa fa-pause-circle fa-5x" title="play/pause"></i>';
    }
}

function playTrack(){
    current_track.play();
    isPlaying = true;
}
function pauseTrack(){
    current_track.pause();
    isPlaying = false;
}
function nextTrack() {
    if (isRandom) {
        let random_index = Math.floor(Math.random() * music_list.length);
        track_index = random_index;
    } else {
        if (track_index < music_list.length - 1) {
            track_index += 1;
        } else {
            track_index = 0;
        }
    }
    loadTrack(track_index);
    playTrack();
    playpause_button.innerHTML = '<i class="fa fa-pause-circle fa-5x" title="play/pause"></i>'; // Update button to pause icon
}

function prevTrack() {
    if (track_index > 0) {
        track_index -= 1;
    } else {
        track_index = music_list.length - 1;
    }
    loadTrack(track_index);
    playTrack();
    playpause_button.innerHTML = '<i class="fa fa-pause-circle fa-5x" title="play/pause"></i>'; // Update button to pause icon
}


function seekTo(){
    let seekTo = current_track.duration * (seek_slider.value / 100);
    current_track.currentTime = seekTo;
}

function setVolume(){
    current_track.volume = volume_slider.value / 100;
}
function setUpdate() {
    if (!isNaN(current_track.duration)) {
        
        window.requestAnimationFrame(() => {
            
            let seekPosition = (current_track.currentTime / current_track.duration) * 100;
            seek_slider.value = seekPosition;

            
            let currentMinutes = Math.floor(current_track.currentTime / 60);
            let currentSeconds = Math.floor(current_track.currentTime % 60);
            let durationMinutes = Math.floor(current_track.duration / 60);
            let durationSeconds = Math.floor(current_track.duration % 60);

            
            if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
            if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
            if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
            if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

            
            current_time.textContent = currentMinutes + ":" + currentSeconds;
            total_duration.textContent = durationMinutes + ":" + durationSeconds;
        });
    }
}




playpause_button.addEventListener('click', playpauseTrack);





