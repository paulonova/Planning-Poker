
/**VARIABLES ***/
var cards = ["0", "1/2", "1","2","3","5","8","13","20","40", "?", "&#x2615;"];
var isCardSelected = false;
var users = [];
var playerName;
var player;
var selectedCard = null;
var gameState = false;
var isPlayerSelected = false;  //bool false...


/**ELEMENTS ***/
let deck = document.getElementById('deck');
let score = document.getElementById('score');
let finishBtn = document.getElementById('finish');
let clearBtn = document.getElementById('clear');
let addPlayerBtn = document.getElementById('add-player');
let nameInput = document.getElementById('name');


class Player{
    constructor(playerName, selectedCard){
        this.playerName = playerName;
        this.selectedCard = selectedCard;
    }

    setCardValue(value){
        this.selectedCard = value;
    }

    getCardValue(){
        return this.selectedCard;
    }
}


/** CREATE NEW PLAYER BUTTON ****************************/
addPlayerBtn.addEventListener("click", function(){
    playerName = nameInput.value;

    if(playerName != ""){        
        player = new Player(playerName); // *OBJECT
        isPlayerSelected = true;  
        nameInput.value = "";
        console.log("Player Name ==>: " + player.playerName);
        console.log("CARD VALUE ==>: " + player.selectedCard);
    }else{
        isPlayerSelected = false;
        alert("Please enter your name");
    }
        console.log("Player Selected - 1: " + isPlayerSelected);
    
    
});


/**RENDER CARDS *** */
function renderCards(){
    deck.innerHTML = "";
    cards.forEach((item, index) => {
        // addCard(deck, item, "playerName");
        addCard(deck, item);
        console.log(item + " - " + index);
    });    
}


function addCard(element, value, name){
    let cardElement = document.createElement("DIV");
    // console.log("ADD_CARD: " + element + " value: " + value + " Name: " + name);
    console.log("ADD_CARD: " + isPlayerSelected);
    

    if(name){
        cardElement.className = value ? 'card card-user card-ready' : 'card card-user';
        cardElement.innerHTML = '<div class="card_inner">' + (gameState ? value : '') 
            + (name ? '<div class="card_name">' + name + '</div>' : '') + '</div>';
    }else{
        cardElement.className = value == selectedCard ? 'card card-selected' : 'card';
        cardElement.innerHTML = '<div class="card_inner">' + value + (name ? '<div class="card_name">' 
            + name + '</div>' : '') + '</div>';
    }    

    /**CARD EVENT LISTENER ***/
    cardElement.addEventListener("click", function(){
        console.log("Card EVENT: " + value);
        console.log("cardSelected0: " + isCardSelected);

        if(!isCardSelected){
            selectCard(value);
            console.log("cardSelected1: " + isCardSelected);                       
    
        }else{

            if(name){
                cardElement.className = value ? 'card card-user card-ready' : 'card card-user';
                cardElement.innerHTML = '<div class="card_inner">' + (gameState ? value : '') 
                    + (name ? '<div class="card_name">' + name + '</div>' : '') + '</div>';
            }else{
                cardElement.className = value == selectedCard ? 'card card-unselected' : 'card';
                cardElement.innerHTML = '<div class="card_inner">' + value + (name ? '<div class="card_name">' 
                    + name + '</div>' : '') + '</div>';
            }
            console.log("cardSelected2: " + isCardSelected);
            renderScore(name);
            isCardSelected = false;
        }

    })

    element.appendChild(cardElement);
}

/**Card click */
function selectCard(card){

    console.log("isPlayerSelected-2: " + isPlayerSelected);

    if(isPlayerSelected){
        selectedCard = card;
        isCardSelected = true;
        player.setCardValue(card);
        console.log("PLAYER GET CARD: " + player.getCardValue());
        render();
    }else{
        alert("Create first a player..");
        isCardSelected = false;
    }
    
}

function render(){
    renderCards();
    // renderScore();
}


function renderScore(name){
    console.log("RENDER SCORE************");
    console.log("GAME STATE: " + gameState);
    console.log("Name: " + name);
    console.log("Player Selected: " + isPlayerSelected);
    

    if(isPlayerSelected){
        // let name = document.getElementById("name").value;
        // users.push(name);
        users.push(name);

        /**O PROBLEMA ESTA NO FOREACH *********** */

        // for (var i = 0; i < users.length; i++) {
        //     console.log("Player[" + i + "}: " + player[i].playerName);
        //     console.log("Player[" + i + "}: " + player[i].player.selectedCard);
        //     addCard(score, true, player[i].playerName);
            
        // }

        users.forEach( x => {
            addCard(score, true, player.playerName);
            console.log("TESTANDO : " + score + " Name: " + player.playerName);
            console.log("TESTANDO : " + score + " Card: " + player.selectedCard);
            });
        isPlayerSelected = false;

    }else{
        isPlayerSelected = true;
    }
}


/**FUNCTION to add user cards in Players Waiting */
function addUsersCard(element, value, name){

    let userCardElement = document.createElement("DIV");
    // console.log("ADD_CARD: " + element + " value: " + value + " Name: " + name);

    if(name){
        userCardElement.className = value ? 'card card-user card-ready' : 'card card-user';
        userCardElement.innerHTML = '<div class="card_inner">' + (gameState ? value : '') 
            + (name ? '<div class="card_name">' + name + '</div>' : '') + '</div>';
    }else{
        userCardElement.className = value == selectedCard ? 'card card-selected' : 'card';
        userCardElement.innerHTML = '<div class="card_inner">' + value + (name ? '<div class="card_name">' 
            + name + '</div>' : '') + '</div>';
    }

    userCardElement.addEventListener("click", function(){
        console.log("Value: " + value, " Name: " + name);
    })
}




/**RENDER USER CARDS *** */
function renderUserCards(){
    deck.innerHTML = "";
    cards.forEach((item, index) => {
        addCard("renderUserCards: " + deck, item, "playerName");
        // addCard(deck, item);
    });
}

/** Render UI elements */
render();