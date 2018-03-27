


let cards = ["0", "1/2", "1","2","3","5","8","13","20","40", "?", "&#x2615;"];

let users = [];

let playerName;

let selectedCard = null;

let gameState = false;

let playerSelected = false;

let deck = document.getElementById('deck');

let score = document.getElementById('score');

let finishBtn = document.getElementById('finish');

let clearBtn = document.getElementById('clear');

let nameInput = document.getElementById('name');


/**
 * Show cards
 * The preventDefault() method cancels the event if it is cancelable, 
 * meaning that the default action that belongs to the event will not occur.
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
        console.log("SelectedCard: " + selectedCard);
        console.log("SelectedCard2: " + card);
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
    console.log("element: " + element + " Value: " + value + " Name: " + name);
    
    if(name){
        cardElement.className = value ? 'card card-user card-ready' : 'card card-user';
        cardElement.innerHTML = '<div class="card_inner">' + (gameState ? value : '') 
            + (name ? '<div class="card_name">' + name + '</div>' : '') + '</div>';
    }else{
        cardElement.className = value == selectedCard ? 'card card-selected' : 'card';
        cardElement.innerHTML = '<div class="card_inner">' + value + (name ? '<div class="card_name">' 
            + name + '</div>' : '') + '</div>';
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


// Create user cards when click in the card
function createUserCards(name){
    let userSection = document.getElementById("user-section");
    let cardElement = document.createElement('div');
    console.log("Test Name: " + name);

    cardElement.className = value ? 'card card-user card-ready' : 'card card-user';
        cardElement.innerHTML = '<div class="card_inner">' + (gameState ? value : '') 
            + (name ? '<div class="card_name">' + name + '</div>' : '') + '</div>';
            userSection.appendChild(cardElement);

    // if(name){
        
    // }else{
    //     cardElement.className = value == selectedCard ? 'card card-selected' : 'card';
    //     cardElement.innerHTML = '<div class="card_inner">' + value + (name ? '<div class="card_name">' 
    //         + name + '</div>' : '') + '</div>';
    //         userSection.appendChild(cardElement);
    // }

    

}


/**
 * Render UI elements
 */
function render(){
    renderCards();
    renderScore();
}

function renderScore(){
    score.innerHTML = '<br><div class="score_title">Players Waiting</div>';
    console.log("GAME STATE: " + gameState);
    if(gameState){
        score.classList.add('score-visible');
    }else{
        score.classList.remove('score-visible')
    }

    if(!playerSelected){
        let name = document.getElementById("name").value;
        users.push(name);
        users.forEach( x => {
            addCard(score, x.selected, x.name);
            console.log("TESTANDO x: " + score + " selected: " + x.selected + " name:" + x.name);
    })
    }else{
        playerSelected = true;
    }

    console.log("TESTANDO SCORE: " + playerSelected);
    
}



function renderCards(){
    deck.innerHTML = '';
    
    cards.forEach((item, index) => {
        addCard(deck, item);
    });
}

render();