console.log("Let's Start !!")

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

async function main() {
    let songs = await getSongs();
    console.log(songs);

    // let songUL = document.querySelector(".songList").getElementsByTagName("tr")[0];
    // for (const song of songs) {
    //     songUL.innerHTML = songUL.innerHTML + `<li> ${song.replaceAll("%20", " ")} </li>`;
    // }

    
    // var audio = new Audio(songs[3]);
    // audio.play();
}

main();