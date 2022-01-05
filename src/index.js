document.addEventListener("DOMContentLoaded", () => {
    fetchQuotes()
    const newQuoteForm = document.getElementById("new-quote-form")
    newQuoteForm.addEventListener("submit", createNewQuote)
})

function fetchQuotes(){
    fetch("http://localhost:3000/quotes")
        .then(response => response.json())
        .then(data => data.forEach(quote => {
            populateQuotes(quote)
        }))
}

function populateQuotes(element){
    const quoteCardParent = document.getElementById("quote-list")
    
    const quoteCard = document.createElement("li")
        quoteCard.className = "quote-card"
        quoteCardParent.append(quoteCard)
    
        const blockQuote = document.createElement("blockquote")
        blockQuote.className = "blockquote"
        quoteCard.append(blockQuote)
    
        const cardQuote = document.createElement("p")
        cardQuote.className ="mb-0"
        cardQuote.innerText = element.quote
        quoteCard.append(cardQuote)
    
        const cardAuthor = document.createElement("footer")
        cardAuthor.className = "blockquote-footer"
        cardAuthor.innerText = element.author
        quoteCard.append(cardAuthor)
    const br = document.createElement("br")
    quoteCard.append(br)

    const likeButton = document.createElement("button")
        likeButton.className = "btn-success"
        likeButton.innerHTML = `Likes: <span>0</span>`
        quoteCard.append(likeButton)
        likeButton.addEventListener("click", () =>{
            let likeObj = {
                quoteId:parseInt(element.id)
            }
            fetch("http://localhost:3000/likes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body:JSON.stringify(likeObj)
            })
            .then(response => response.json())
        })
        likeButton.addEventListener("click", (e) =>{
            fetch("http://localhost:3000/likes")
                .then(response => response.json())
                .then(data =>{
                    e.preventDefault()
                    console.log(data)
                    let likeArray = []
                    if(data.forEach(likeEl => {
                        likeEl.id === element.id
                    })){
                        likeArray.push(likeEl)
                        console.log(likeEl)
                    }
                })    
        })
        
        const deleteButton = document.createElement("button")
        deleteButton.className = "btn-danger"
        deleteButton.innerText = "Delete"
        quoteCard.append(deleteButton)
    deleteButton.addEventListener("click", () => {
        fetch(`http://localhost:3000/quotes/${element.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(data => quoteCard.remove(data))
    }
    )
}

function createNewQuote(e){
   e.preventDefault()

   const quoteGrab = document.getElementById("new-quote")
   const authorGrab = document.getElementById("author")
   let quoteObj = {
       quote:quoteGrab.value,
       author:authorGrab.value
   }

   fetch("http://localhost:3000/quotes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(quoteObj)
        })
        .then(response => response.json())
        .then(data => populateQuotes(data))

}

