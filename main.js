const { getLikes } = require("unsplash-js/dist/methods/users")

// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!

const articleHearts = document.querySelectorAll(".like-glyph");

const modal = document.getElementById("modal")
modal.setAttribute("class", "hidden") 

function likeCallback() {
  document.addEventListener('click', (event) => {
  if (event.target.classList[0] === 'like-glyph') {
    mimicServerCall()
    .then(resp => {
      const activated = event.target.classList.contains("actiavted-heart");
      if (activated) {
      event.target.classList.remove("activated-heart");
      event.target.innerHTML = EMPTY_HEART;
      } else {
        event.target.classList.add("activated-heart");
        event.target.innerHTML = FULL_HEART;
      }

      activated;
    })
    .catch(error => {
      // modal.hidden = false
      modal.classList.remove("hidden");
      const modalMessage = document.querySelector("#modal-message")
      modalMessage.innerText = error
      setTimeout(() => {
        modal.hidden = true
      }, 5000)
    })
}});
}

for (const glyph of articleHearts) {
  glyph.addEventListener("click", likeCallback);
}


//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
