const urls = {
    anime: `http://localhost:5000/anime/search?keyword=$&type=anime`,
    news: `http://localhost:5000/anime/news`,
    detailedNews: `http://localhost:5000/anime/news/details?id={anime_id}`,
    season: `http://localhost:5000/anime/season`,
    top: `http://localhost:5000/anime/top`
}

function getAnimeInfo(animeName) {
    return new Promise((resolve, reject) => {
        resolve(fetch(`http://localhost:5000/anime/search?keyword=${animeName}&type=anime`, {mode: "no-cors"}))
        reject("ERROR")
    })
}

async function displayAnimeInfo(userInput) {
    try {
        const anime = await getAnimeInfo(userInput)
        const processedAnime = await anime.json()
        console.log(processedAnime)
    } catch(error) {
        console.log(error)
    }
}
let input = document.getElementById("searchInput")

input.addEventListener("keyup", () => {
    displayAnimeInfo(input.value)
})