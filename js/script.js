
/**VARIABLES ***/
var cards = ["0", "1/2", "1","2","3","5","8","13","20","40", "?", "&#x2615;"];
var isCardSelected = false;
var users = [];
var playersList = [];
var playerName;
var player;
var selectedCard = null;
var gameState = false;  // to show or not show cards!
var isPlayerSelected = false;  


/**ELEMENTS ***/
let deck = document.getElementById('deck');
let score = document.getElementById('score');
let showBtn = document.getElementById('show');
let clearBtn = document.getElementById('clear');
let addPlayerBtn = document.getElementById('add-player');
let nameInput = document.getElementById('name');


/**
 * Show cards
 * The preventDefault() method cancels the event if it is cancelable, 
 * meaning that the default action that belongs to the event will not occur.
 */
showBtn.addEventListener('click', function(e){
    console.log("Show button");
    e.preventDefault();
    
});


/**
 * Clear cards
 */
clearBtn.addEventListener('click', function(e){
    console.log("Clear button");
    e.preventDefault();
    
});


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

        users.push(name);
        let singleUser = {};
        singleUser['name'] = player.playerName;
        singleUser['card'] = player.selectedCard;
        playersList.push(singleUser);
        addCard(score, true, player.playerName);

        console.log("TESTANDO : " + score + " Name: " + player.playerName);
        console.log("TESTANDO : " + score + " Card: " + player.selectedCard);
        console.log("Users-Length : " + users.length);
        console.log("singleUser : " + singleUser.name + " Card: " + singleUser.card);

        isPlayerSelected = false;

        //Testing outputs..
        for (let i = 0; i < playersList.length; i++) {
            console.log("Player List: " + playersList[i].name);
            console.log("Player List: " + playersList[i].card);            
        }

    }else{
        isPlayerSelected = true;
    }
}


/** Render UI elements */
render();