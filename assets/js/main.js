'use strict';

const loader = document.getElementById('loader');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const newQuoteButton = document.getElementById('new-quote');
const quoteContainer = document.getElementById('quote-container');

let apiQuotes = [];

const loading = () => {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

const complete = () => {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

const newQuote = () => {
    loading();

    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    if (!quote.author) {
        quoteAuthor.textContent = 'Unknown';
    } else if (quote.author == 'type.fit') {
        quoteAuthor.textContent = 'Unknown';
    }
    else {
        quoteAuthor.textContent = quote.author.split(',')[0];
    }

    quoteText.textContent = quote.text;

    complete();
}

async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';

    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        console.log(error)
    }
}

newQuoteButton.addEventListener('click', newQuote);

getQuotes();