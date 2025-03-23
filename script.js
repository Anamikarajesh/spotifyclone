console.log("Welcome to Spotify");

// Initialize the Variables
let songindex = 0;
let audioelement = new Audio('songs/1.mp3');
let masterplay = document.getElementById('masterplay');
let myprogressbar = document.getElementById('myprogressbar');
let gif = document.getElementById('gif');
let mastersongname = document.getElementById('mastersongname');
let songitems = Array.from(document.getElementsByClassName('songitem'));
let songitemplays = Array.from(document.getElementsByClassName('songitemplay'));

let songs = [
    {songname: "Warriyo - Mortals [NCS Release]", filepath: "songs/1.mp3", coverpath: "covers/1.jpg"},
    {songname: "Cielo - Huma-Huma", filepath: "songs/2.mp3", coverpath: "covers/2.jpg"},
    {songname: "DEAF KEV - Invincible [NCS Release]", filepath: "songs/3.mp3", coverpath: "covers/3.jpg"},
    {songname: "Different Heaven & EH!DE - My Heart [NCS Release]", filepath: "songs/4.mp3", coverpath: "covers/4.jpg"},
    {songname: "Janji - Heroes Tonight (feat. Johnning) [NCS Release]", filepath: "songs/5.mp3", coverpath: "covers/5.jpg"},
    {songname: "Rabba - Salam-e-Ishq", filepath: "songs/6.mp3", coverpath: "covers/6.jpg"},
    {songname: "Sakhiyaan - Salam-e-Ishq", filepath: "songs/7.mp3", coverpath: "covers/7.jpg"},
    {songname: "Bhula Dena - Salam-e-Ishq", filepath: "songs/8.mp3", coverpath: "covers/8.jpg"},
    {songname: "Tumhari Kasam - Salam-e-Ishq", filepath: "songs/9.mp3", coverpath: "covers/9.jpg"},
    {songname: "Na Jaana - Salam-e-Ishq", filepath: "songs/10.mp3", coverpath: "covers/10.jpg"},
];

// Update song list UI
songitems.forEach((element, i) => { 
    element.getElementsByTagName("img")[0].src = songs[i].coverpath; 
    element.getElementsByClassName("songname")[0].innerText = songs[i].songname; 
});

// Function to reset all small play buttons
const makeallplays = () => {
    songitemplays.forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    });
};

// Handle play/pause click
masterplay.addEventListener('click', () => {
    if (audioelement.paused || audioelement.currentTime <= 0) {
        audioelement.play();
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
        // Update the corresponding small play button
        makeallplays();
        songitemplays[songindex].classList.remove('fa-circle-play');
        songitemplays[songindex].classList.add('fa-circle-pause');
    } else {
        audioelement.pause();
        masterplay.classList.remove('fa-circle-pause');
        masterplay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
        // Update the small play button
        songitemplays[songindex].classList.remove('fa-circle-pause');
        songitemplays[songindex].classList.add('fa-circle-play');
    }
});

// Listen to time updates
audioelement.addEventListener('timeupdate', () => { 
    let progress = parseInt((audioelement.currentTime / audioelement.duration) * 100);
    myprogressbar.value = progress;
});

// Seekbar change event
myprogressbar.addEventListener('change', () => {
    audioelement.currentTime = myprogressbar.value * audioelement.duration / 100;
});

// Play song from individual song item
songitemplays.forEach((element, i) => {
    element.addEventListener('click', (e) => { 
        makeallplays();
        songindex = i;  // Update song index
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioelement.src = songs[songindex].filepath;
        mastersongname.innerText = songs[songindex].songname;
        audioelement.currentTime = 0;
        audioelement.play();
        gif.style.opacity = 1;
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');
    });
});

// Function to update UI when changing song via next/prev
const updateSongUI = () => {
    makeallplays();
    audioelement.src = songs[songindex].filepath;
    mastersongname.innerText = songs[songindex].songname;
    audioelement.currentTime = 0;
    audioelement.play();
    masterplay.classList.remove('fa-circle-play');
    masterplay.classList.add('fa-circle-pause');
    gif.style.opacity = 1;
    songitemplays[songindex].classList.remove('fa-circle-play');
    songitemplays[songindex].classList.add('fa-circle-pause');
};

// Next song
document.getElementById('next').addEventListener('click', () => {
    if (songindex >= songs.length - 1) {
        songindex = 0;
    } else {
        songindex += 1;
    }
    updateSongUI();
});

// Previous song
document.getElementById('previous').addEventListener('click', () => {
    if (songindex <= 0) {
        songindex = songs.length - 1;
    } else {
        songindex -= 1;
    }
    updateSongUI();
});