function getAnimeInfo(animeName) {
    return new Promise((resolve, reject) => {
        resolve(fetch(`http://localhost:5000/anime/news`, {mode: "no-cors"}))
        reject("ERROR")
    })
}

async function displayAnimeInfo(userInput) {
    try {
        const anime = await getAnimeInfo(userInput)
        const processedAnime = await anime.json()
        console.log(processedAnime[0].newsThumbnail)
        document.getElementById("anime__card-image").src = processedAnime[0].newsThumbnail
    } catch(error) {
        console.log(error)
    }
}

displayAnimeInfo("death note")