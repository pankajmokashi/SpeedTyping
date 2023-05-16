function checkWords(event, data, myInterval){
    let input = event.target
    input.style.Color = "white";
    if(input.value === data.slice(0, input.value.length)){
        input.style.backgroundColor = "green";
        if(input.value === ""){
            input.style.backgroundColor = "white";
        }
    }
    else{
        input.style.backgroundColor = "red";
    }
    if(data === input.value){
        clearInterval(myInterval)
        setTimeout(async () => {
            const time = document.getElementById("time")
            time.innerText = 0
            input.value = ""
            await fetchURL()
        }, 3000)
    }
}

function displayQuote(data){
    const quote = document.querySelector(".quote-display")
    quote.innerHTML = data.content

    const inputText = document.getElementById("quoteInput")
    inputText.disabled = false
    const time = document.getElementById("time")
    let timer = 0
    let myInterval = setInterval(() => {
        timer = timer + 1
        time.innerText = timer
    }, 1000)

    inputText.addEventListener("keyup", () => {
        checkWords(event, data.content, myInterval)
    })
}

async function fetchURL() {
    const url = "https://api.quotable.io/random"
    const response = await fetch(url)
    const data = await response.json()
    displayQuote(data)
}

async function startTimer(event){
    event.target.disabled = true
    await fetchURL()
}

const timer = document.getElementById("start")
timer.addEventListener("click", startTimer)