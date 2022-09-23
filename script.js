// Variable declarations
const quoteText =  document.querySelector(".quote");
const btnQuote = document.querySelector(".btn-quote");
const quoteAuthor = document.querySelector(".author");

function randomeQuoteGenerator(){
  // Fetching the data from API

  //fetch("http://quotes.stormconsultancy.co.uk/random.json")
  fetch("https://api.quotable.io/random")
  .then(response => response.json())
  .then(data => {
    quoteText.innerText = `${data.content}`;
    quoteAuthor.innerText = `— ${data.author}`;
  }); 
}
randomeQuoteGenerator();

// Event listener
btnQuote.addEventListener("click", randomeQuoteGenerator);
