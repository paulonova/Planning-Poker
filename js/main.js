


var divElement;
var spanElement;
var cardContainer = document.getElementById("card-container");


function createAllCards(){

    for (let i = 0; i < cardsValue.length; i++) {
        divElement = document.createElement("DIV");
        divElement.setAttribute("class", "scrum-card");
        spanElement.document.createElement("SPAN");
        // spanElement.
        
    } 

}

// SECOND PROJECT EXAMPLE

let cards = ["0", "1/2", "1","2","3","5","8","13","20","40", "?"];

let users = [];

let playerName;

let selectedCard = null;

let gameState = false;

let deck = document.getElementById('deck');

let score = document.getElementById('score');

let finishBtn = document.getElementById('finish');

let clearBtn = document.getElementById('clear');

let nameInput = document.getElementById('name');




class Player{
    constructor(name, score){

    }
}



/**
 * Show cards
 */
finishBtn.addEventListener('click', function(e){
    e.preventDefault();
    
});

/**
 * Clear cards
 */
clearBtn.addEventListener('click', function(e){
    e.preventDefault();
    
});

/**
 * Handle card selection
 */
function selectCard(card){
    playerName = nameInput.value;
    if(playerName){
        selectedCard = card;
        render();
        saveSelection();
    }else{
        alert('Please enter your name');
    }
}

function deleteUser(name){  

}

function saveSelection(){
    if(playerName){

    }
}

/**
 * Add card markup to deck
 */
function addCard(element, value, name){
    let cardElement = document.createElement('div');
    
    if(name){
        cardElement.className = value ? 'card card-user card-ready' : 'card card-user';
        cardElement.innerHTML = '<div class="card_inner">' + (gameState ? value : '') + (name ? '<div class="card_name">' + name + '</div>' : '') + '</div>';
    }else{
        cardElement.className = value == selectedCard ? 'card card-selected' : 'card';
        cardElement.innerHTML = '<div class="card_inner">' + value + (name ? '<div class="card_name">' + name + '</div>' : '') + '</div>';
    }
    
    
    if(name){
        cardElement.addEventListener('click', function(e){
            deleteUser(name);
        });
    }else{
        cardElement.addEventListener('click', function(e){
            selectCard(value);
        });
    }
    
    element.appendChild(cardElement);
}


/**
 * Render UI elements
 */
function render(){
    renderCards();
    renderScore();
}

function renderScore(){
    score.innerHTML = '<div class="score_title">Players</div>';
    
    if(gameState){
        score.classList.add('score-visible');
    }else{
        score.classList.remove('score-visible')
    }
    
    users.forEach( x => {
        addCard(score, x.selected, x.name);
    })
}



function renderCards(){
    deck.innerHTML = '';
    
    cards.forEach((item, index) => {
        addCard(deck, item);
    });
}

render();