const containers = document.getElementsByClassName("container")
const searchInputs = document.getElementsByClassName("header__title-input")
let checkedContainers = [newsChecked = false, topChecked = false, seasonalChecked = false]

// Event listeners ------------------
for (let i = 0; i < searchInputs.length; i++) {
    searchInputs[i].addEventListener("keyup", () => {submitFetchValue(i)})
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
function hideAnimeInfo(containerIndex) {
    containers[containerIndex].classList.remove("displayingInfo")
    if(containerIndex === 0) {
        document.getElementsByClassName("cover__thumbnail")[0].classList.add("loading")
        document.getElementsByClassName("cover__thumbnail")[0].classList.replace("cover__thumbnail", "cover__thumbnail--loading")
        document.getElementsByClassName("cover__thumbnail-img")[0].src = ""

        document.getElementsByClassName("cover__thumbnail-score")[0].classList.add("loading")
        document.getElementsByClassName("cover__thumbnail-score")[0].classList.replace("cover__thumbnail-score", "cover__thumbnail-score--loading")
        document.getElementsByClassName("cover__thumbnail-scoreBar")[0].classList.add("loading")
        document.getElementsByClassName("cover__thumbnail-scoreBar")[0].classList.replace("cover__thumbnail-scoreBar", "cover__thumbnail-scoreBar--loading")
        document.getElementsByClassName("cover__thumbnail-score--loading")[0].innerText = ""
        document.getElementsByClassName("cover__thumbnail-scoreBarProgress")[0].style.width = 0

        document.getElementsByClassName("cover__description-title")[0].classList.add("loading")
        document.getElementsByClassName("cover__description-title")[0].classList.replace("cover__description-title", "cover__description-title--loading")
        document.getElementsByClassName("cover__description-title--loading")[0].innerText = ""

        document.getElementsByClassName("cover__description-text")[0].classList.add("loading")
        document.getElementsByClassName("cover__description-text")[0].classList.replace("cover__description-text", "cover__description-text--loading")
        document.getElementsByClassName("cover__description-text--loading")[0].innerText = ""

        charactersNamesLength = document.getElementsByClassName("characters__characterName").length

        for (let i = 0; i < charactersNamesLength; i++) {
            document.getElementsByClassName("characters__characterName")[0].innerText = ""
            document.getElementsByClassName("characters__characterName")[0].classList.add("loading")
            document.getElementsByClassName("characters__characterName")[0].classList.replace("characters__characterName", "characters__characterName--loading")
        }

        charactersThumbnailsLength = document.getElementsByClassName("characters__thumbnail").length

        for (let i = 0; i < charactersThumbnailsLength; i++) {
            document.getElementsByClassName("characters__thumbnail-img")[0].src = ""
            document.getElementsByClassName("characters__thumbnail-img")[0].classList.replace("characters__thumbnail-img", "characters__thumbnail-img--loading")
            document.getElementsByClassName("characters__thumbnail")[0].classList.add("loading")
            document.getElementsByClassName("characters__thumbnail")[0].classList.replace("characters__thumbnail", "characters__thumbnail--loading")
        }

    } else if(containerIndex === 1) {

    } else if(containerIndex === 2) {
        
    } else if(containerIndex === 3) {

    }
}

function displayAnimeInfo(fetchedInfo, containerIndex){
    console.log(fetchedInfo)
    containers[containerIndex].classList.add("displayingInfo")
    if(containerIndex === 0) {
        document.getElementsByClassName("cover__thumbnail--loading")[0].classList.remove("loading")
        document.getElementsByClassName("cover__thumbnail--loading")[0].classList.replace("cover__thumbnail--loading", "cover__thumbnail")
        document.getElementsByClassName("cover__thumbnail-img")[0].src = fetchedInfo.images[0]

        document.getElementsByClassName("cover__thumbnail-score--loading")[0].classList.remove("loading")
        document.getElementsByClassName("cover__thumbnail-score--loading")[0].classList.replace("cover__thumbnail-score--loading", "cover__thumbnail-score")
        document.getElementsByClassName("cover__thumbnail-scoreBar--loading")[0].classList.remove("loading")
        document.getElementsByClassName("cover__thumbnail-scoreBar--loading")[0].classList.replace("cover__thumbnail-scoreBar--loading", "cover__thumbnail-scoreBar")
        if(fetchedInfo.score !== null) {
            document.getElementsByClassName("cover__thumbnail-score")[0].innerText = fetchedInfo.score.toFixed(1) + " / 10"
            scoreBarProgress = fetchedInfo.score / 10 * 100
            document.getElementsByClassName("cover__thumbnail-scoreBarProgress")[0].style.width = `${scoreBarProgress}%`
            if(scoreBarProgress <= 3) {
                document.getElementsByClassName("cover__thumbnail-scoreBarProgress")[0].style.backgroundColor = "var(--low-rating-red)"
            } else if (scoreBarProgress <= 5) {
                document.getElementsByClassName("cover__thumbnail-scoreBarProgress")[0].style.backgroundColor = "var(--mid-rating-yellow)"
            } else if (scoreBarProgress <= 8) {
                document.getElementsByClassName("cover__thumbnail-scoreBarProgress")[0].style.backgroundColor = "var(--high-rating-green)"
            } else {
                document.getElementsByClassName("cover__thumbnail-scoreBarProgress")[0].style.backgroundColor = "var(--highest-rating-blue)"
            }
        } else {
            document.getElementsByClassName("cover__thumbnail-score")[0].innerText = "N/A"
        }

        document.getElementsByClassName("cover__description-title--loading")[0].classList.remove("loading")
        document.getElementsByClassName("cover__description-title--loading")[0].classList.replace("cover__description-title--loading", "cover__description-title")
        document.getElementsByClassName("cover__description-title")[0].innerText = fetchedInfo.title

        document.getElementsByClassName("cover__description-text--loading")[0].classList.remove("loading")
        document.getElementsByClassName("cover__description-text--loading")[0].classList.replace("cover__description-text--loading", "cover__description-text")
        document.getElementsByClassName("cover__description-text")[0].innerText = fetchedInfo.description
        

        charactersNamesLength = document.getElementsByClassName("characters__characterName--loading").length

        for (let i = 0; i < charactersNamesLength; i++) {
            document.getElementsByClassName("characters__characterName--loading")[0].innerText = fetchedInfo.characters[i].name
            document.getElementsByClassName("characters__characterName--loading")[0].classList.remove("loading")
            document.getElementsByClassName("characters__characterName--loading")[0].classList.replace("characters__characterName--loading", "characters__characterName")
        }

        charactersThumbnailsLength = document.getElementsByClassName("characters__thumbnail--loading").length

        for (let i = 0; i < charactersThumbnailsLength; i++) {
            document.getElementsByClassName("characters__thumbnail-img--loading")[0].src = fetchedInfo.characters[i].img
            document.getElementsByClassName("characters__thumbnail-img--loading")[0].classList.replace("characters__thumbnail-img--loading", "characters__thumbnail-img")
            document.getElementsByClassName("characters__thumbnail--loading")[0].classList.remove("loading")
            document.getElementsByClassName("characters__thumbnail--loading")[0].classList.replace("characters__thumbnail--loading", "characters__thumbnail")
        }

    } else if(containerIndex === 1) {

    } else if(containerIndex === 2) {
        
    } else if(containerIndex === 3) {

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
            .catch(error => console.log(error))
    } 
    // else if(endPointIndex === 1) {
    //     fetch(`http://localhost:5000/anime/news`)
    //         .then(response => response.json())
    //         .then(processedResponse => console.log(processedResponse))
    //         .catch(error => console.log(error))
    // } else if(endPointIndex === 2) {
    //     fetch(`http://localhost:5000/anime/season`)
    //         .then(response => response.json())
    //         .then(processedResponse => console.log(processedResponse))
    //         .catch(error => console.log(error))
    // } else if(endPointIndex === 3) {
    //     fetch(`http://localhost:5000/anime/top`)
    //         .then(response => response.json())
    //         .then(processedResponse => console.log(processedResponse))
    //         .catch(error => console.log(error))
    // }
}

let timeoutHandle = []
function submitFetchValue(inputIndex) {
    clearTimeout(timeoutHandle[inputIndex])

    timeoutHandle[inputIndex] = setTimeout(() => {
        if(searchInputs[inputIndex].value !== "")
        fetchAnimeInfo(searchInputs[inputIndex].value, inputIndex)
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