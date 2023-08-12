const url = 'http://localhost:3000/quotes?_embed=likes';
const likesUrl = 'http://localhost:3000/likes';
const quotesUrl = 'http://localhost:3000/quotes';
const ul = document.getElementById('quote-list');
const form = document.getElementById('new-quote-form');


function renderQuotes(quote) {
    let li = document.createElement('li');
    let blockQuote = document.createElement('blockquote');
    let quoteEl = document.createElement('p');
    let author = document.createElement('footer');
    let br = document.createElement('br');
    let buttonLikes = document.createElement('button');
    let buttonDelete = document.createElement('button');

    li.className = 'quote-card';
    blockQuote.className = 'blockquote';
    quoteEl.className = 'mb-0';
    author.className = 'blockquote-footer';
    buttonLikes.className = 'btn-success';
    buttonDelete.className = 'btn-danger';

    quoteEl.textContent = quote.quote;
    author.textContent = quote.author;
    buttonLikes.innerHTML = `Likes: <span>${quote.likes.length}</span>`;
    buttonDelete.textContent = 'Delete';

    blockQuote.append(quoteEl, author, br, buttonLikes, buttonDelete);
    li.append(blockQuote);
    ul.append(li);

    buttonLikes.addEventListener('click', () => {
        let timeStamp = Date.now();
        addLikes(quote.id, timeStamp);
    })

    buttonDelete.addEventListener('click', () => {
        deleteQuote(quote.id);
    })
}

function deleteQuote(id) {
    fetch(`${quotesUrl}/${id}`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json"}
    })
}

function addLikes(id, timestamp) {

    let obj = {
        quoteId: id,
        createdAt: timestamp
    }

    fetch(likesUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accepts: "application/json"
        },
        body: JSON.stringify(obj)
    })

}


form.addEventListener('submit', (e) => {
    e.preventDefault();
    let newQuote = e.target.quote.value;
    let newAuthor = e.target.author.value;


    postNewQuote(newQuote, newAuthor);
    
})

function postNewQuote(quote, author) {
    let obj = {
        author: author,
        quote: quote
    }

    fetch('http://localhost:3000/quotes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accepts: 'application/json'
        },
        body: JSON.stringify(obj)
    })
    .then(resp => resp.json())
    .then(data => {
        data.forEach(quote => renderQuotes(quote))
    })
}


fetch(url)
.then(resp => resp.json())
.then(data => {
    data.forEach(quote => {
        renderQuotes(quote);
    });
    console.log(data[1])
})