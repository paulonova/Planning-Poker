
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
var isFromScore = false;

/**ELEMENTS ***/
let deck = document.getElementById('deck');
let score = document.getElementById('score');
let showBtn = document.getElementById('show');
let clearBtn = document.getElementById('clear');
let addPlayerBtn = document.getElementById('add-player');
let nameInput = document.getElementById('name');

//Function to show popover..
$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();   
});


/**Function to confirm actions */
function getConfirmation(message){
    var retVal = confirm(message);
    if( retVal == true ){
       return true;
    }
    else{
       return false;
    }
 }


 /** Function typeEffect */
 function typeEffect(element, speed) {
	var text = $(element).text();
	$(element).html('');	
	var i = 0;
	var timer = setInterval(function() {
					if (i < text.length) {
						$(element).append(text.charAt(i));
						i++;
					} else {
						clearInterval(timer);
					}
				}, speed);
}


/**Animating the Text Header */
$( document ).ready(function() {
  var speed = 75;
  var delay = $('h1').text().length * speed + speed;
  typeEffect($('h1'), speed);
});

/**Animating who is playing */
$( document ).ready(function() {
    var speed = 75;
    var delay = $('h4').text().length * speed + speed;
    setTimeout(function(){
      $('.who_is_playing').css('display', 'inline-block');
      typeEffect($('.who_is_playing'), speed);
    }, delay);
  });

/**
 * Show cards
 */
showBtn.addEventListener('click', function(){
    if(playersList.length > 0 && getConfirmation("This command will show all cards! Are you shure?")){

        console.log("Show button"); 
        for (let i = 0; i < playersList.length; i++) {

            //Testing outputs..
            console.log("****************************");
            console.log("NAME: " + playersList[i].name);
            console.log("CARD: " + playersList[i].card);
            console.log("****************************");

            let score = document.getElementById("score");
            let card = score.getElementsByClassName("card")[i];
            let cardInner = card.getElementsByClassName("card_inner")[0];
            card.getElementsByClassName("card_inner")[0].innerHTML = playersList[i].card;

            let cardName = document.createElement("DIV");
            
            cardName.setAttribute("class", "card_name");
            let textName = document.createTextNode(playersList[i].name);
            cardName.appendChild(textName);
            cardInner.appendChild(cardName);        
        }

    }else{
        console.log("No users playing the game..");
    }
    
});


/**
 * Clear cards
 */
clearBtn.addEventListener('click', function(){
    console.log("Clear button");
    if(getConfirmation("This command will restart the game! Are you shure?")){
        location.reload();
    }
    
    
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


function setWhoIsPlaying(playerName, status){
    let whoIsPlaying = document.getElementById("who_is_playing");

    if(status){
        whoIsPlaying.innerHTML = playerName + " is playing..";
    }else{
        whoIsPlaying.innerHTML = "";
    }
}


/** CREATE NEW PLAYER BUTTON ****************************/
addPlayerBtn.addEventListener("click", function(){
    playerName = nameInput.value;

    if(playerName != ""){        
        player = new Player(playerName); // *OBJECT
        isPlayerSelected = true;  
        nameInput.value = "";
        setWhoIsPlaying(playerName, true);
        console.log("Player Name ==>: " + player.playerName);
        console.log("CARD VALUE ==>: " + player.selectedCard);
    }else{
        isPlayerSelected = false;
        alert("Please enter your name");
    }
        console.log("Player Selected - 1: " + isPlayerSelected); 
        
    
});

function render(){
    renderCards();
}


/**RENDER CARDS *** */
function renderCards(){
    deck.innerHTML = "";
    cards.forEach((item, index) => {
        addCard(deck, item);
    });    
}


/** Render UI elements */
render();


function addCard(element, value, name, isFromScore){
    let cardElement = document.createElement("DIV");
    let userCardElement = document.createElement("DIV");
    

    if(name){
        cardElement.className = value ? 'card card-user card-ready' : 'card card-user';
        cardElement.innerHTML = '<div class="card_inner">' + (gameState ? value : '') 
            + (name ? '<div class="card_name">' + name + '</div>' : '') + '</div>';
    }else{
        cardElement.className = value == selectedCard ? 'card card-selected' : 'card';
        cardElement.innerHTML = '<div class="card_inner">' + value + (name ? '<div class="card_name">' 
            + name + '</div>' : '') + '</div>';
    }

    userCardElement.addEventListener("click", function(){
        console.log("USER-CARD... ");
    })

    /**CARD EVENT LISTENER ***/
    cardElement.addEventListener("click", function(){
        console.log("Card EVENT: " + value);
        console.log("cardSelected0: " + isCardSelected);

    if(!isFromScore){

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
            setWhoIsPlaying("", false);
            isCardSelected = false;
        }

    }else{

        console.log("Is From renderScore");
    }

        
    });

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




function renderScore(name, gameStatus){ 

    if(isPlayerSelected){

        users.push(name);
        let singleUser = {};
        singleUser['name'] = player.playerName;
        singleUser['card'] = player.selectedCard;
        playersList.push(singleUser);
        addCard(score, true, player.playerName, true);
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

