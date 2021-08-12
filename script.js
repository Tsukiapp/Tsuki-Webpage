const containers = document.getElementsByClassName("container")
const searchInputs = document.getElementsByClassName("header__title-input")
const seeMoreButtons = document.getElementsByClassName("card__footer-button")
const accordingFetchLength = [20, 50, 50]
let checkedContainers = [newsChecked = false, topChecked = false, seasonalChecked = false]
let savedFetchInfo = {
    news: null,
    seasonal: null,
    top: null
}

// Event listeners ------------------
for (let i = 0; i < searchInputs.length; i++) {
    searchInputs[i].addEventListener("keyup", () => {submitFetchValue(i)})
}

for (let i = 0; i < seeMoreButtons.length; i++) {
    seeMoreButtons[i].addEventListener("click", () => {createNewElements(i)})    
}

window.addEventListener("scroll", () => {
    if(checkedContainers[1] !== true) {
        checkContainerSight(1)
    }
    if(checkedContainers[2] !== true) {
        checkContainerSight(2)
    }
    if(checkedContainers[3] !== true) {
        checkContainerSight(3)
    }
})

// Functions ------------------

function redirect(urlIndex) {
    window.open(urlIndex.url)
}

function createNews() {
    news = document.createElement("div")
    news.classList.add("card__body-news")
    news.classList.add("card__items-container")

    title = document.createElement("p")
    title.classList.add("news__title--loading")
    title.classList.add("loading")

    thumbnail = document.createElement("div")
    thumbnail.classList.add("news__thumbnail--loading")
    thumbnail.classList.add("loading")

    thumbnail_container = document.createElement("div")
    thumbnail_container.classList.add("news__thumbnail-container--loading")

    date = document.createElement("h3")
    date.classList.add("container__date--loading")
    date.classList.add("loading")

    thumbnail_container.append(date)
    thumbnail.append(thumbnail_container)
    news.append(thumbnail)
    news.append(title)

    document.getElementsByClassName("newsCard__body")[0].append(news)
}

function createSeasonal() {
    seasonal = document.createElement("div")
    seasonal.classList.add("card__body-seasonal")

    seasonalCover = document.createElement("div")
    seasonalCover.classList.add("seasonal__cover")
    coverThumbnail = document.createElement("div")
    coverThumbnail.classList.add("seasonal__cover-thumbnail--loading")
    coverThumbnail.classList.add("loading")
    thumbnailRating = document.createElement("div")
    thumbnailRating.classList.add("seasonal__thumbnail-rating--loading")
    thumbnailScore = document.createElement("h3")
    thumbnailScore.classList.add("seasonal__thumbnail-score--loading")
    thumbnailScore.classList.add("loading")
    thumbnailScoreBar = document.createElement("div")
    thumbnailScoreBar.classList.add("seasonal__thumbnail-scoreBar--loading")
    thumbnailScoreBar.classList.add("loading")
    scoreBarProgress = document.createElement("div")
    scoreBarProgress.classList.add("seasonal__thumbnail-scoreBarProgress")

    seasonalDescription = document.createElement("div")
    seasonalDescription.classList.add("seasonal__description")
    descriptionMainInfo = document.createElement("div")
    descriptionMainInfo.classList.add("seasonal__description-mainInfo")
    descriptionTitle = document.createElement("h2")
    descriptionTitle.classList.add("seasonal__description-title--loading")
    descriptionTitle.classList.add("loading")
    descriptionInfo = document.createElement("p")
    descriptionInfo.classList.add("seasonal__description-info--loading")
    descriptionInfo.classList.add("loading")
    descriptionTags = document.createElement("div")
    descriptionTags.classList.add("seasonal__description-tags")
    genre = document.createElement("h4")
    genre.classList.add("tags-genre--loading")
    genre.classList.add("loading")
    producer = document.createElement("h4")
    producer.classList.add("tags-producer--loading")
    producer.classList.add("loading")

    seasonal.append(seasonalCover)
    
    seasonalCover.append(coverThumbnail)
    coverThumbnail.append(thumbnailRating)
    thumbnailRating.append(thumbnailScore)
    thumbnailRating.append(thumbnailScoreBar)
    thumbnailScoreBar.append(scoreBarProgress)
    
    seasonal.append(seasonalDescription)

    seasonalDescription.append(descriptionMainInfo)
    descriptionMainInfo.append(descriptionTitle)
    descriptionMainInfo.append(descriptionInfo)
    seasonalDescription.append(descriptionTags)
    descriptionTags.append(genre)
    descriptionTags.append(producer)

    document.getElementsByClassName("seasonalCard__body")[0].append(seasonal)
}

function createTop() {
    tops = document.createElement("div")
    tops.classList.add("card__body-top")
    tops.classList.add("card__items-container")
    
    thumbnail = document.createElement("div")
    thumbnail.classList.add("top__thumbnail--loading")
    thumbnail.classList.add("loading")

    title = document.createElement("a")
    title.classList.add("top__title--loading")
    title.classList.add("loading")

    tops.append(thumbnail)
    tops.append(title)

    document.getElementsByClassName("topCard__body")[0].append(tops)
}

function createNewElements(subjectIndex) {
    if(subjectIndex === 0) {
        if(document.getElementsByClassName("card__body-news").length + 6 <= accordingFetchLength[subjectIndex]) {
            for (let i = 0; i < 6; i++) {
                createNews()
            }
        } else {
            seeMoreButtons[subjectIndex].disabled = true
            let n
            for (let i = 5; i + document.getElementsByClassName("card__body-news").length >= accordingFetchLength[subjectIndex]; i--) {
                n = i
            }

            for (let i = 0; i < n; i++) {
                createNews()
            }
        } 
        displayAnimeInfo(subjectIndex + 1, subjectIndex + 1, null)

    } else if(subjectIndex === 1) {

        if(document.getElementsByClassName("card__body-seasonal").length + 4 <= accordingFetchLength[subjectIndex]) {
            for (let i = 0; i < 4; i++) {
                createSeasonal()
            }
        } else {
            seeMoreButtons[subjectIndex].disabled = true
            let n
            for (let i = 3; i + document.getElementsByClassName("card__body-seasonal").length >= accordingFetchLength[subjectIndex]; i--) {
                n = i
            }

            for (let i = 0; i < n; i++) {
                createSeasonal()
            }
        } 
        displayAnimeInfo(subjectIndex + 1, subjectIndex + 1)

    } else if(subjectIndex === 2) {
        if(document.getElementsByClassName("card__body-top").length + 6 <= accordingFetchLength[subjectIndex]) {
            for (let i = 0; i < 6; i++) {
                createTop()
            }
        } else {
            seeMoreButtons[subjectIndex].disabled = true
            let n
            for (let i = 5; i + document.getElementsByClassName("card__body-top").length >= accordingFetchLength[subjectIndex]; i--) {
                n = i
            }

            for (let i = 0; i < n; i++) {
                createTop()
            }
        } 
        displayAnimeInfo(subjectIndex + 1, subjectIndex + 1)
    }
}

function hideAnimeInfo(containerIndex) {
    containers[containerIndex].classList.remove("displayingInfo")
    if(containerIndex === 0) {

        document.getElementsByClassName("cover__thumbnail")[0].classList.add("loading")
        document.getElementsByClassName("cover__thumbnail")[0].classList.replace("cover__thumbnail", "cover__thumbnail--loading")

        document.getElementsByClassName("cover__thumbnail-score")[0].classList.add("loading")
        document.getElementsByClassName("cover__thumbnail-score")[0].classList.replace("cover__thumbnail-score", "cover__thumbnail-score--loading")

        document.getElementsByClassName("cover__thumbnail-scoreBar")[0].classList.add("loading")
        document.getElementsByClassName("cover__thumbnail-scoreBar")[0].classList.replace("cover__thumbnail-scoreBar", "cover__thumbnail-scoreBar--loading")

        document.getElementsByClassName("cover__description-title")[0].classList.add("loading")
        document.getElementsByClassName("cover__description-title")[0].classList.replace("cover__description-title", "cover__description-title--loading")

        document.getElementsByClassName("cover__description-text")[0].classList.add("loading")
        document.getElementsByClassName("cover__description-text")[0].classList.replace("cover__description-text", "cover__description-text--loading")

        document.getElementsByClassName("cover__thumbnail-img")[0].src = ""
        document.getElementsByClassName("cover__thumbnail-score--loading")[0].innerText = ""
        document.getElementsByClassName("cover__thumbnail-scoreBarProgress")[0].style.width = 0
        document.getElementsByClassName("cover__description-title--loading")[0].innerText = ""
        document.getElementsByClassName("cover__description-text--loading")[0].innerText = ""

        charactersLength = document.getElementsByClassName("characters__characterName").length

        for (let i = 0; i < charactersLength; i++) {

            document.getElementsByClassName("characters__characterName")[0].innerText = ""
            document.getElementsByClassName("characters__thumbnail-img")[0].src = ""

            document.getElementsByClassName("characters__characterName")[0].classList.add("loading")
            document.getElementsByClassName("characters__characterName")[0].classList.replace("characters__characterName", "characters__characterName--loading")

            document.getElementsByClassName("characters__thumbnail-img")[0].classList.replace("characters__thumbnail-img", "characters__thumbnail-img--loading")

            document.getElementsByClassName("characters__thumbnail")[0].classList.add("loading")
            document.getElementsByClassName("characters__thumbnail")[0].classList.replace("characters__thumbnail", "characters__thumbnail--loading")
        }

    } else if(containerIndex === 1) {

    } else if(containerIndex === 2) {
        
    } else if(containerIndex === 3) {

    }
}

function displayAnimeInfo(fetchedInfo, containerIndex, detailSearch){
    containers[containerIndex].classList.add("displayingInfo")
    console.log(fetchedInfo)
    if(containerIndex === 0) {

        document.getElementsByClassName("cover__thumbnail--loading")[0].classList.remove("loading")
        document.getElementsByClassName("cover__thumbnail--loading")[0].classList.replace("cover__thumbnail--loading", "cover__thumbnail")
        
        document.getElementsByClassName("cover__thumbnail-score--loading")[0].classList.remove("loading")
        document.getElementsByClassName("cover__thumbnail-score--loading")[0].classList.replace("cover__thumbnail-score--loading", "cover__thumbnail-score")

        document.getElementsByClassName("cover__thumbnail-scoreBar--loading")[0].classList.remove("loading")
        document.getElementsByClassName("cover__thumbnail-scoreBar--loading")[0].classList.replace("cover__thumbnail-scoreBar--loading", "cover__thumbnail-scoreBar")

        document.getElementsByClassName("cover__description-title--loading")[0].classList.remove("loading")
        document.getElementsByClassName("cover__description-title--loading")[0].classList.replace("cover__description-title--loading", "cover__description-title")

        document.getElementsByClassName("cover__description-text--loading")[0].classList.remove("loading")
        document.getElementsByClassName("cover__description-text--loading")[0].classList.replace("cover__description-text--loading", "cover__description-text")

        document.getElementsByClassName("cover__thumbnail-img")[0].src = fetchedInfo.images[0]
        document.getElementsByClassName("cover__description-title")[0].innerText = fetchedInfo.title
        document.getElementsByClassName("cover__description-text")[0].innerText = fetchedInfo.description

        if(fetchedInfo.score !== null) {
            document.getElementsByClassName("cover__thumbnail-score")[0].innerText = fetchedInfo.score.toFixed(1) + " / 10"
            scoreBarProgress = fetchedInfo.score / 10 * 100
            document.getElementsByClassName("cover__thumbnail-scoreBarProgress")[0].style.width = `${scoreBarProgress}%`
            if(scoreBarProgress <= 40) {
                document.getElementsByClassName("cover__thumbnail-scoreBarProgress")[0].style.backgroundColor = "var(--low-rating-red)"
            } else if (scoreBarProgress <= 60) {
                document.getElementsByClassName("cover__thumbnail-scoreBarProgress")[0].style.backgroundColor = "var(--mid-rating-yellow)"
            } else if (scoreBarProgress <= 80) {
                document.getElementsByClassName("cover__thumbnail-scoreBarProgress")[0].style.backgroundColor = "var(--high-rating-green)"
            } else {
                document.getElementsByClassName("cover__thumbnail-scoreBarProgress")[0].style.backgroundColor = "var(--highest-rating-blue)"
            }
        } else {
            document.getElementsByClassName("cover__thumbnail-score")[0].innerText = "N/A"
        }

        charactersLength = document.getElementsByClassName("characters__characterName--loading").length

        for (let i = 0; i < charactersLength; i++) {
            document.getElementsByClassName("characters__characterName--loading")[0].innerText = fetchedInfo.characters[i].name
            document.getElementsByClassName("characters__thumbnail-img--loading")[0].src = fetchedInfo.characters[i].img

            document.getElementsByClassName("characters__characterName--loading")[0].classList.remove("loading")
            document.getElementsByClassName("characters__characterName--loading")[0].classList.replace("characters__characterName--loading", "characters__characterName")
            
            document.getElementsByClassName("characters__thumbnail-img--loading")[0].classList.replace("characters__thumbnail-img--loading", "characters__thumbnail-img")

            document.getElementsByClassName("characters__thumbnail--loading")[0].classList.remove("loading")
            document.getElementsByClassName("characters__thumbnail--loading")[0].classList.replace("characters__thumbnail--loading", "characters__thumbnail")
        }

    } else if(containerIndex === 1) {

        if(detailSearch !== null) {
            fetch(`http://localhost:5000/anime/news/details?id=${detailSearch}`)
            .then(response => response.json())
            .then(processedResponse => console.log(processedResponse))
            .catch(error => console.warn(error))
        } else {

        loadedNewsLength = document.getElementsByClassName("news__title").length
        loadingNewsLength = document.getElementsByClassName("news__title--loading").length

        for (let i = 0; i < loadingNewsLength; i++) {
            
            document.getElementsByClassName("news__title--loading")[0].classList.remove("loading")
            document.getElementsByClassName("news__title--loading")[0].classList.replace("news__title--loading", "news__title")
            
            document.getElementsByClassName("news__thumbnail--loading")[0].classList.remove("loading")
            document.getElementsByClassName("news__thumbnail--loading")[0].classList.replace("news__thumbnail--loading", "news__thumbnail")

            document.getElementsByClassName("news__thumbnail-container--loading")[0].classList.replace("news__thumbnail-container--loading", "news__thumbnail-container")
            
            document.getElementsByClassName("container__date--loading")[0].classList.remove("loading")
            document.getElementsByClassName("container__date--loading")[0].classList.replace("container__date--loading", "container__date")
            
            document.getElementsByClassName("news__title")[i + loadedNewsLength].innerText = savedFetchInfo.news[i + loadedNewsLength].newsTitle
            document.getElementsByClassName("news__title")[i + loadedNewsLength].addEventListener("click", () => {
                displayAnimeInfo(null, 1, savedFetchInfo.news[i + loadedNewsLength].newsID)
                console.log(savedFetchInfo.news[i + loadedNewsLength].newsID)
            })
            document.getElementsByClassName("news__thumbnail")[i + loadedNewsLength].style.backgroundImage = `url(${savedFetchInfo.news[i + loadedNewsLength].newsThumbnail})`
            document.getElementsByClassName("container__date")[i + loadedNewsLength].innerText = savedFetchInfo.news[i + loadedNewsLength].newsDate
        }
    }

    } else if(containerIndex === 2) {
        loadedSeasonalLength = document.getElementsByClassName("seasonal__description-title").length
        loadingSeasonalLength = document.getElementsByClassName("seasonal__description-title--loading").length

        for (let i = 0; i < loadingSeasonalLength; i++) {
            
            document.getElementsByClassName("seasonal__cover-thumbnail--loading")[0].classList.remove("loading")
            document.getElementsByClassName("seasonal__cover-thumbnail--loading")[0].classList.replace("seasonal__cover-thumbnail--loading", "seasonal__cover-thumbnail")
            
            document.getElementsByClassName("seasonal__thumbnail-rating--loading")[0].classList.remove("loading")
            document.getElementsByClassName("seasonal__thumbnail-rating--loading")[0].classList.replace("seasonal__thumbnail-rating--loading", "seasonal__thumbnail-rating")
            
            document.getElementsByClassName("seasonal__thumbnail-score--loading")[0].classList.remove("loading")
            document.getElementsByClassName("seasonal__thumbnail-score--loading")[0].classList.replace("seasonal__thumbnail-score--loading", "seasonal__thumbnail-score")

            document.getElementsByClassName("seasonal__thumbnail-scoreBar--loading")[0].classList.remove("loading")
            document.getElementsByClassName("seasonal__thumbnail-scoreBar--loading")[0].classList.replace("seasonal__thumbnail-scoreBar--loading", "seasonal__thumbnail-scoreBar")

            document.getElementsByClassName("seasonal__description-title--loading")[0].classList.remove("loading")
            document.getElementsByClassName("seasonal__description-title--loading")[0].classList.replace("seasonal__description-title--loading", "seasonal__description-title")

            document.getElementsByClassName("seasonal__description-info--loading")[0].classList.remove("loading")
            document.getElementsByClassName("seasonal__description-info--loading")[0].classList.replace("seasonal__description-info--loading", "seasonal__description-info")

            document.getElementsByClassName("tags-genre--loading")[0].classList.remove("loading")
            document.getElementsByClassName("tags-genre--loading")[0].classList.replace("tags-genre--loading", "tags-genre")

            document.getElementsByClassName("tags-producer--loading")[0].classList.remove("loading")
            document.getElementsByClassName("tags-producer--loading")[0].classList.replace("tags-producer--loading", "tags-producer")
            
            document.getElementsByClassName("seasonal__cover-thumbnail")[i + loadedSeasonalLength].style.backgroundImage = `url(${savedFetchInfo.seasonal[i + loadedSeasonalLength].images[0]})`

            if(savedFetchInfo.seasonal[i + loadedSeasonalLength].score !== null) {
                document.getElementsByClassName("seasonal__thumbnail-score")[i + loadedSeasonalLength].innerText = parseFloat(savedFetchInfo.seasonal[i + loadedSeasonalLength].score).toFixed(1) + " / 10"
                scoreBarProgress = savedFetchInfo.seasonal[i + loadedSeasonalLength].score / 10 * 100
                console.log(scoreBarProgress)
                document.getElementsByClassName("seasonal__thumbnail-scoreBarProgress")[i + loadedSeasonalLength].style.width = `${scoreBarProgress}%`
                if(scoreBarProgress <= 40) {
                    document.getElementsByClassName("seasonal__thumbnail-scoreBarProgress")[i + loadedSeasonalLength].style.backgroundColor = "var(--low-rating-red)"
                } else if (scoreBarProgress <= 60) {
                    document.getElementsByClassName("seasonal__thumbnail-scoreBarProgress")[i + loadedSeasonalLength].style.backgroundColor = "var(--mid-rating-yellow)"
                } else if (scoreBarProgress <= 80) {
                    document.getElementsByClassName("seasonal__thumbnail-scoreBarProgress")[i + loadedSeasonalLength].style.backgroundColor = "var(--high-rating-green)"
                } else {
                    document.getElementsByClassName("seasonal__thumbnail-scoreBarProgress")[i + loadedSeasonalLength].style.backgroundColor = "var(--highest-rating-blue)"
                }
            } else {
                document.getElementsByClassName("cover__thumbnail-score")[0].innerText = "N/A"
            }

            document.getElementsByClassName("seasonal__description-title")[i + loadedSeasonalLength].innerText = savedFetchInfo.seasonal[i + loadedSeasonalLength].title
            
            document.getElementsByClassName("seasonal__description-info")[i + loadedSeasonalLength].innerText = savedFetchInfo.seasonal[i + loadedSeasonalLength].description

            document.getElementsByClassName("tags-genre")[i + loadedSeasonalLength].innerText = savedFetchInfo.seasonal[i + loadedSeasonalLength].genre

            document.getElementsByClassName("tags-producer")[i + loadedSeasonalLength].innerText = savedFetchInfo.seasonal[i + loadedSeasonalLength].producer
        }

    } else if(containerIndex === 3) {
        loadedTopLength = document.getElementsByClassName("top__title").length
        loadingTopLength = document.getElementsByClassName("top__title--loading").length

        console.log(loadedTopLength)
        for (let i = 0; i < loadingTopLength; i++) {
            
            document.getElementsByClassName("top__thumbnail--loading")[0].classList.remove("loading")
            document.getElementsByClassName("top__thumbnail--loading")[0].classList.replace("top__thumbnail--loading", "top__thumbnail")

            document.getElementsByClassName("top__title--loading")[0].classList.remove("loading")
            document.getElementsByClassName("top__title--loading")[0].classList.replace("top__title--loading", "top__title")

            rawLink = savedFetchInfo.top[i + loadedTopLength].thumbnailImage
            regex = /(\s2x)/g
            link = rawLink.replace(regex, "")
            document.getElementsByClassName("top__thumbnail")[i + loadedTopLength].style.backgroundImage = `url(${link})`

            document.getElementsByClassName("top__title")[i + loadedTopLength].innerText = savedFetchInfo.top[i + loadedTopLength].title
            document.getElementsByClassName("top__title")[i + loadedTopLength].href = savedFetchInfo.top[i + loadedTopLength].url
        }
    }
}

function fetchAnimeInfo(input, endPointIndex) {
    if(endPointIndex === 0) {
        if(containers[endPointIndex].classList.contains("displayingInfo")) {
            hideAnimeInfo(endPointIndex)
        }
        fetch(`http://localhost:5000/anime/search?keyword=${input}&type=anime`)
            .then(response => response.json())
            .then(processedResponse => displayAnimeInfo(processedResponse, endPointIndex))
            .catch(error => console.warn(error))
    } else if(endPointIndex === 1) {
        if(containers[endPointIndex].classList.contains("displayingInfo")) {
            hideAnimeInfo(endPointIndex)
        }
        fetch(`http://localhost:5000/anime/news`)
            .then(response => response.json())
            .then(processedResponse => savedFetchInfo.news = processedResponse)
            .then(processedResponse => displayAnimeInfo(processedResponse, endPointIndex, null))
            .catch(error => console.warn(error))
    } else if(endPointIndex === 2) {
        if(containers[endPointIndex].classList.contains("displayingInfo")) {
            hideAnimeInfo(endPointIndex)
        }
        fetch(`http://localhost:5000/anime/season`)
            .then(response => response.json())
            .then(processedResponse => savedFetchInfo.seasonal = processedResponse)
            .then(processedResponse => displayAnimeInfo(processedResponse, endPointIndex))
            .catch(error => console.warn(error))
    } else if(endPointIndex === 3) {
        fetch(`http://localhost:5000/anime/top`)
            .then(response => response.json())
            .then(processedResponse => savedFetchInfo.top = processedResponse)
            .then(processedResponse => displayAnimeInfo(processedResponse, endPointIndex))
            .catch(error => console.warn(error))
    }
}

let timeoutHandle = []
function submitFetchValue(inputIndex) {
    clearTimeout(timeoutHandle[inputIndex])

    timeoutHandle[inputIndex] = setTimeout(() => {
        if(searchInputs[inputIndex].value !== "") {
            fetchAnimeInfo(searchInputs[inputIndex].value, inputIndex)
        }
    }, 600)
}

function checkContainerSight(containerIndex) {
    if((window.scrollY + window.innerHeight) >= calculateContainersHeight(containerIndex)) {
        checkedContainers[containerIndex] = true
        fetchAnimeInfo(null, containerIndex)
    }
}

function calculateContainersHeight(containerIndex) {
    let n = 0
    let marginTop = 0
    let j
    for (let i = containerIndex; i > 0; i--) {
        n = n + document.getElementsByClassName("container__card")[i].offsetHeight
        j = window.getComputedStyle(document.getElementsByClassName("container__card")[i])
        marginTop = marginTop + parseFloat(j["marginTop"])
    }
    return n + marginTop + document.getElementsByTagName("header")[0].offsetHeight
}