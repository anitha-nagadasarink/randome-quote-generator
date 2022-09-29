// Variable declarations
const quoteText = document.querySelector(".quote");
const btnQuote = document.querySelector(".btn-quote");
const quoteAuthor = document.querySelector(".author");
const speakBtn = document.querySelector(".btn-speak");
const copyBtn = document.querySelector(".btn-copy");
const toolTip = document.querySelector(".tooltiptext");
const quoteApi = "https://api.quotable.io/random";

// Event listener
btnQuote.addEventListener("click", randomeQuoteGenerator);
speakBtn.addEventListener("click", textToSpeak);
copyBtn.addEventListener("click", copyText);

function randomeQuoteGenerator() {
  // Fetching the data from API
  fetch(quoteApi)
    .then(response => response.json())
    .then(data => {
      quoteText.innerText = `${data.content}`;
      quoteAuthor.innerText = `— ${data.author}`;
    });
}
randomeQuoteGenerator();

function textToSpeak() {
  let quoteSpeak = new SpeechSynthesisUtterance();
  quoteSpeak.text = quoteText.innerText;
  quoteSpeak.rate = 1; // the speed at which the text is spoken
  quoteSpeak.pitch = 2; //sets a pitch(the relative highness or lowness of a tone)

  //Author Speak 
  let quoteAuhor = new SpeechSynthesisUtterance();
  quoteAuhor.rate = 1;
  quoteAuhor.pitch = 2;
  quoteAuhor.text = quoteAuthor.innerText;

  speechSynthesis.speak(quoteSpeak);
  speechSynthesis.speak(quoteAuhor);
}

function copyText() {
  navigator.clipboard.writeText(quoteText.innerText);
  toolTip.classList.remove("hidden");
  setTimeout(() => {
    toolTip.classList.add("hidden");
  }, 2000);
}
