console.log("Let's Start !!")

async function main() {
    let a = await fetch("http://127.0.0.1:3000/songs")
    let resonse = await a.text();
    console.log(resonse) 
}

main();

