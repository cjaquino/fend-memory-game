/*
 * Create a list that holds all of your cards
 */
const deck = ["fa-diamond","fa-diamond",
              "fa-paper-plane-o","fa-paper-plane-o",
              "fa-anchor","fa-anchor",
              "fa-bolt","fa-bolt",
              "fa-cube","fa-cube",
              "fa-leaf","fa-leaf",
              "fa-bicycle","fa-bicycle",
              "fa-bomb","fa-bomb"]

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//select deck class
const deck_element = document.querySelector(".deck");

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
 function shuffleDeck(deck){
   const shuffled_deck = shuffle(deck);
   const fragment = document.createDocumentFragment();

   for (card of shuffled_deck) {
     //create li card element
     const newCard = document.createElement('li');
     newCard.setAttribute('class','card');

     //create icon element for card with appropriate class
     const newIcon = document.createElement('i');
     newIcon.setAttribute('class','fa ' + card);

     //append icon to li
     newCard.appendChild(newIcon);

     //append li with child to fragment element
     fragment.appendChild(newCard);
   }

   //append fragment to deck_element
   deck_element.innerHTML = "";
   deck_element.appendChild(fragment);
 }

shuffleDeck(deck);

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

function openCard(e) {
 e.target.classList.add('show','open');
};

//take the class of the selected i element and store it in an array
function storeCard(e, open_card) {
  const sel_card = e.target;
  open_card.push(sel_card);
}

function compareCards(e, open_card) {
    //check if there's anything stored in the open_cards array
    //if there is, compare classes and see if they matched
    //otherwise, store the selected card class in the open_cards array
      const sel_card = e.target;
      if(sel_card.querySelector('i').classList.value == open_card[0].querySelector('i').classList.value){
        if (sel_card === open_card[0]){
          console.log('same card selected');
        } else {
          cardMatched(e, open_card);
        }
        //function::cards match: lock cards in match class
      } else {
        //function::cards dont match: hide the cards again and clear open_card;
        setTimeout(function myFunc() {
          cardNotMatched(e, open_card)
        }, 500);
      }
}

function cardNotMatched(e, open_card) {
  open_card[0].classList.toggle('show');
  open_card[0].classList.toggle('open');
  e.target.classList.toggle('show');
  e.target.classList.toggle('open');
  open_card.pop();
  // e.target.setAttribute('class','card');
}

let num_matches = 8;

function cardMatched(e, open_card) {
  open_card[0].classList.toggle('show');
  open_card[0].classList.toggle('open');
  open_card[0].classList.toggle('match');
  e.target.classList.toggle('show');
  e.target.classList.toggle('open');
  e.target.classList.toggle('match');
  open_card.pop();
  num_matches--;
  if(!num_matches){
    game_started = 0;
    game_completed = 1;
  }
}

//declare empty open cards array to store open cards
let open_card = [];

//declare counter
let move_counter = 0;

function incrementCounter() {
  move_counter++;
  document.querySelector(".moves").textContent = move_counter;
}

//timer based off of stack overflow solution:https://stackoverflow.com/questions/29971898/how-to-create-an-accurate-timer-in-javascript
let game_started = 0;
let game_completed = 0;
let start_time = Date.now();
const seconds = document.getElementById("seconds");
const minutes = document.getElementById("minutes");


function timer() {
  if (game_started){
    const raw_millis = Date.now() - start_time;
    const mins = Math.floor(raw_millis/60000);
    const secs = Math.floor((raw_millis%60000)/1000);
    seconds.innerHTML = secs;
    minutes.innerHTML = mins;
    console.log(raw_millis);
  }
}

setInterval(timer, 1000);

deck_element.addEventListener('click', function(e){
  if(e.target.nodeName ===  'LI') {
    //if game hast been started, start timer
    if (!game_started) {
      game_started = 1;
      start_time = Date.now();
      // setInterval(timer(start_time),1000);
      // console.log("timer started");
    }
    if(!e.target.classList.contains("open")){
      openCard(e);
      incrementCounter();
      if (open_card.length == 0) {
        storeCard(e, open_card);
      } else {
        compareCards(e, open_card);
      }
    }

  }

  //check if all cards are matched and display message with final score
});

//reset the game. Close and shuffle cards
document.querySelector(".restart").addEventListener('click', function(e) {
  shuffleDeck(deck);
  move_counter = 0;
  document.querySelector(".moves").textContent = move_counter;
  game_started = 0;
  game_completed = 0;
})
