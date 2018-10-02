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
 if(e.target.nodeName === 'LI') {
   e.target.classList.add('show','open');
 }
};

//take the class of the selected i element and store it in an array
function storeCard(e, open_cards) {
  console.log('store card fn running')
  const sel_card_class = e.target.querySelector('i').classList;
  console.log(sel_card_class);
  open_cards.push(sel_card_class);
  console.log('store card fn running')
}

function checkCard(e, open_cards) {
  console.log('check card fn running')
  if(e.target.nodeName === 'LI') {
    //check if there's anything stored in the open_cards array
    //if there is, compare classes and see if they matched
    //otherwise, store the selected card class in the open_cards array
    if(open_cards.length > 0) {
      const sel_card_classes = e.target.querySelector('i').classList;
      if(sel_card_classes.value == open_cards[0].value){
        alert('cards match!')
      } else {
        alert('cards dont match');

      }
    } else {
      storeCard(e, open_cards);
    }
  }
  console.log('check fn completed')
}
let open_cards = [];
deck_element.addEventListener('click', function(e){

  openCard(e);
  checkCard(e, open_cards);
});
