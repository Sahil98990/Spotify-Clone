

let currentSong = new Audio();
let songs;

function secondsToMinutesSeconds(seconds) {
    if(isNaN(seconds)  || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2,'0');
    const formattedSeconds = String(remainingSeconds).padStart(2,'0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

async function getSongs() {
    let div = document.getElementById("divi");
    let as = div.getElementsByTagName("a");
    let songs = [];
    for(let i=0; i<as.length; i++) {
        const element = as[i];
        if(element.href.endsWith(".mp3")) {
            songs.push(element.href)
        }
    }
    return songs;
}

const playMusic = (track, pause=false) => {
    // let audio = new Audio(track);
    currentSong.src = track;
   
        let name = currentSong.src.split("songs/")[1];
        name = name.replaceAll("%20", " ");
        name = name.replace(".mp3", "");

    if(!pause) {
        currentSong.play();
        play.src = "img/pause.svg";
    }
    document.querySelector(".songinfo").innerHTML = name;
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00"
}

async function main() {
    

    //Get list of all songs
    songs = await getSongs();
    playMusic(songs[0], true)
    // console.log(songs);

    //Show all songs in playlist
    // let songUL = document.querySelector(".songList").getElementsByTagName("tr")[0];
    // for (const song of songs) {
    //     songUL.innerHTML = songUL.innerHTML + `<li> ${song.replaceAll("%20", " ")} </li>`;
    // }

    

    // var audio = new Audio(songs[3]);
    // audio.play();


    //Attach an Event Listener to each song
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e=>{
        e.addEventListener('click', element=>{
            playMusic(e.querySelector(".info").firstElementChild.firstElementChild.href)
        })
    })

    //Attach an Event Listener to each Playlist
    Array.from(document.querySelector(".cardContainer").getElementsByClassName("card")).forEach(e=>{
        e.addEventListener('click', element=>{
            console.log(e.querySelector(".songLink").firstElementChild.href)
            playMusic(e.querySelector(".songLink").firstElementChild.href)
        })
    })

    //Attach an Event Listener to play, prev and next buttons
    play.addEventListener("click", () => {
        if(currentSong.paused) {
            currentSong.play();
            play.src = "img/pause.svg";
        }
        else {
            currentSong.pause();
            play.src = "img/play.svg";
        }
    })

    //Listen for timeupdate event
    currentSong.addEventListener("timeupdate", () => {
        document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`
        document.querySelector(".circle").style.left = (currentSong.currentTime/currentSong.duration) * 100 + "%";
    })

    //Add an Event Listener to seekbar
    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX/e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = ((currentSong.duration) * percent)/100;
    })

    //Add an Event Listener for hamburger
    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0";
    })

    //Add an Event Listener for close button
    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-100%";
    })

    //Add an Event Listener to prev
    prev.addEventListener("click", () => {
        currentSong.pause();
        console.log("Previous clicked");
        let index = songs.indexOf(currentSong.src)
        if ((index - 1) >= 0) {
            playMusic(songs[index - 1]);
        }
    })

    //Add an Event Listener to next
    next.addEventListener("click", () => {
        currentSong.pause();
        console.log("Next clicked");
        // console.log(currentSong)
        // console.log(currentSong.src.split("/") [5])
        // let name = currentSong.src.split("/") [5];
        // name = name.replaceAll("%20", " ");
        // name = name.replace(".mp3", "");
        // console.log(name)
        let index = songs.indexOf(currentSong.src)
        if ((index + 1) < songs.length) {
            playMusic(songs[index + 1]);
        }
    })

    //Add an event to volume seeekbar
    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e) => {
        console.log("Volume", e.target.value);
        currentSong.volume = parseInt(e.target.value)/100;
    })

    // Add Event Listener for mute the track
    document.querySelector(".volume > img").addEventListener('click', e => {
        if(e.target.src.includes("volume.svg")) {
            e.target.src = e.target.src.replace("volume.svg", "mute.svg");
            currentSong.volume = 0;
            document.querySelector(".range").getElementsByTagName("input")[0].value = 0;
        }
        else {
            e.target.src = e.target.src.replace("mute.svg", "volume.svg");
            currentSong.volume = 0.1;
            document.querySelector(".range").getElementsByTagName("input")[0].value = 10;
        }
    })

}

main();