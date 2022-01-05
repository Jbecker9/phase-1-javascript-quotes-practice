document.addEventListener("DOMContentLoaded", (e) => {
    e.preventDefault()
    fetchQuotes()
    newQuote()
})

function fetchQuotes(){
    fetch("http://localhost:3000/quotes?_embed=likes")
        .then(response => response.json())
        .then(data => data.forEach(element => {
            populateQuotes(element)
        }))
}

function populateQuotes(e){
    const quoteCardParent = document.getElementById("quote-list")
    const quoteCard = document.createElement("li")
        quoteCard.className = "quote-card"
        quoteCardParent.append(quoteCard)
    const blockQuote = document.createElement("blockquote")
        blockQuote.className = "blockquote"
        quoteCard.append(blockQuote)
    const cardQuote = document.createElement("p")
        cardQuote.className ="mb-0"
        cardQuote.innerText = e.quote
        quoteCard.append(cardQuote)
    const cardAuthor = document.createElement("footer")
        cardAuthor.className = "blockquote-footer"
        cardAuthor.innerText = e.author
        quoteCard.append(cardAuthor)
    const br = document.createElement("br")
    quoteCard.append(br)
    const likeButton = document.createElement("button")
        likeButton.className = "btn-success"
        likeButton.innerHTML = `Likes: <span>0</span>`
        quoteCard.append(likeButton)
    const deleteButton = document.createElement("button")
        deleteButton.className = "btn-danger"
        deleteButton.innerText = "Delete"
        quoteCard.append(deleteButton)
}

function newQuote(){
    const formGroup = document.getElementById("new-quote-form")
    formGroup.addEventListener("submit", (event) => {
        event.preventDefault()
        functionWork(event)
    })
}

function functionWork(e){
    const formControl = document.getElementById("new-quote-form").querySelectorAll(".form-control")
    let quoteObj = {
        newQuote:e.target.new_quote.value,
        author:e.target.author.value
    }
    fetch("http://localhost:3000/quotes", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(quoteObj)
        })
        .then(response => response.json())
        .then(data => console.log(data))
}

