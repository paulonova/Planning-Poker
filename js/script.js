

let cards = ["0", "1/2", "1","2","3","5","8","13","20","40", "?", "&#x2615;"];

let users = [];

let playerName;

var player;

let selectedCard = null;

let gameState = false;

var playerSelected = false;


/*ELEMENTS ***/
let deck = document.getElementById('deck');

let score = document.getElementById('score');

let finishBtn = document.getElementById('finish');

let clearBtn = document.getElementById('clear');

let addPlayerBtn = document.getElementById('add-player');

let nameInput = document.getElementById('name');


class Player{
    constructor(playerName){
        this.playerName = playerName;
    }

    setPlayerSelected(status){
        this.playerSelected = status;
    }

    getPlayerSelected(){
        return this.playerSelected;
    }
}


function addCard(element, value, name){
    let cardElement = document.createElement("DIV");

    if(name){
        cardElement.className = value ? 'card card-user card-ready' : 'card card-user';
        cardElement.innerHTML = '<div class="card_inner">' + (gameState ? value : '') 
            + (name ? '<div class="card_name">' + name + '</div>' : '') + '</div>';
    }else{
        cardElement.className = value == selectedCard ? 'card card-selected' : 'card';
        cardElement.innerHTML = '<div class="card_inner">' + value + (name ? '<div class="card_name">' 
            + name + '</div>' : '') + '</div>';
    }

    cardElement.addEventListener("click", function(){
        console.log("Card EVENT: " + value);
        selectCard(value);
    })

    element.appendChild(cardElement);
}


/** AddPlayer EVENT*/
addPlayerBtn.addEventListener("click", function(){
    playerName = nameInput.value;
    player = new Player(playerName);

    if(player.playerName){
        console.log("AddPlayer: " + player.playerName);
        player.setPlayerSelected(true);
        nameInput.value = "";
    }else{
        alert("Please enter your name");
    }
    console.log("Player Selected: " + player.getPlayerSelected());
    
});


function selectCard(card){

    /**Preciso  pegar o playerSelect com valores atuais..*/

    console.log("Testing PlayerSelected: " + playerSelected)
    if(player.playerName != "undefined"){
        selectedCard = card;
        render();
    }else{
        alert("Something wrong");
    }
    
}


/**RENDER CARDS *** */
function renderCards(){
    deck.innerHTML = "";
    cards.forEach((item, index) => {
        addCard(deck, item);
    });
}

/** Render UI elements */
function render(){
    renderCards();
    // renderScore();
}

render();