// Variable declarations
const quoteText = document.querySelector(".quote");
const btnQuote = document.querySelector(".btn-quote");
const quoteAuthor = document.querySelector(".author");
const speakBtn = document.querySelector(".btn-speak");
const copyBtn = document.querySelector(".btn-copy");
const toolTip = document.querySelector(".tooltiptext");
const quoteApi = "https://api.quotable.io/random";
let readingTimes;

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

// Convert text to speak
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


  readingTimes = readingTime();

  setTimeout(function () {
    btnQuote.style.pointerEvents = "none";
    btnQuote.style.backgroundColor = "#786f6f";
  }, readingTimes * 100);

  setTimeout(function () {
    btnQuote.style.pointerEvents = "auto";
    btnQuote.style.backgroundColor = "#0C4A6E";
  }, readingTimes * 8000);

}

// Copy the text to clipboard
function copyText() {
  navigator.clipboard.writeText(quoteText.innerText);
  toolTip.classList.remove("hidden");
  setTimeout(() => {
    toolTip.classList.add("hidden");
  }, 2000);
}

// Count the Word and time
function readingTime() {
  const text = quoteText.innerText + quoteAuthor.innerText;
  const wpm = 225;
  const words = text.trim().split(/\s+/).length;
  const time = Math.ceil(words / wpm);
  return time;
}
