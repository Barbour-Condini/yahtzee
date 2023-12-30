// GLOBAL VARIABLES

// this tracks roll numbers per round
let rollCounter = 0;

// count total rounds (up to 13 inclusive) 
let roundCount = 1

// this array of objects tracks dice values and hold states
let diceObjs = [
    {value: 0, hold: false},
    {value: 0, hold: false},
    {value: 0, hold: false},
    {value: 0, hold: false},
    {value: 0, hold: false}
]

// this array tracks the number of dice that are of the same value
let diceDuplicates = [0, 0, 0, 0, 0, 0]


// this array of objects tracks score selections
let scoreObjs = [
    {category: '1', value: 0, selected: false},
    {category: '2', value: 0, selected: false},
    {category: '3', value: 0, selected: false},
    {category: '4', value: 0, selected: false},
    {category: '5', value: 0, selected: false},
    {category: '6', value: 0, selected: false},
    {category: 'threeKind', value: 0, selected: false},
    {category: 'fourssKind', value: 0, selected: false},
    {category: 'fullHouse', value: 0, selected: false},
    {category: 'smallStraight', value: 0, selected: false},
    {category: 'largeStraight', value: 0, selected: false},
    {category: 'yahtzee', value: 0, selected: false, joker: false},
    {category: 'chance', value: 0, selected: false},
]

// gameNumber - this tracks how many games have been played locally
let i = 1
while (localStorage.getItem(`grandTotal${i}`) !== null) {
    i ++;
} 
const gameNumber = i

// COLOUR SCHEME LOCAL STORAGE:
if (localStorage.getItem('backgroundColor') !== null) {
    const background = localStorage.getItem('backgroundColor');
    const text = localStorage.getItem('textColor');
    document.body.style.backgroundColor = localStorage.getItem('backgroundColor');
    document.body.style.color = localStorage.getItem('textColor');
    if (background !== 'peru') {
        changeTableColors(background, text);
    } else {
        changeTableColors('bisque', text);
    }
}  

// HIGH SCORE LIST LOCAL STORAGE:
const updateHighScores = () => {
    // read scores in local storage and put into an array
    let i = 1
    const highScores = []
    while (localStorage.getItem(`grandTotal${i}`) !== null) {
        highScores.push(Number(localStorage.getItem(`grandTotal${i}`)))
        i++;
    }
    highScores.sort(function(a, b) {return a-b});
    highScores.reverse();

    // add the top 10 items to the html list
    // remove the old elements then add them back in
    const container = document.querySelector(`#highscoresEntries`)
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

            for (let i = 0; i < 10; i++) {
                if (i < highScores.length) {
                    const node = document.createElement("p");
                    const textnode = document.createTextNode(`${i+1}. ${highScores[i]}`);
                    node.appendChild(textnode);
                    container.appendChild(node);
                }
            }
        }

updateHighScores();

// DICE ROLLS

const diceRoll = () => {
    // rolls all non-held dice once (or should do!)
    for (let i = 0; i<5; i++) {
        if (!diceObjs[i].hold) {
            const result = Math.ceil(Math.random()*6);
            diceObjs[i].value = result;
            document.getElementById(`${i+1}`).innerHTML = `<img src="assets/images/2d/${result}.png" alt="${result}" width="40px"/>`;
        }
    }
}

const rollRequest = () => {
    // listens for a player request to roll dice
    // rolls dice if rollTracker() function allows it
    const roll = document.querySelector("#roll");
    roll.addEventListener("click", rollTracker)
}

const rollTracker = () => {
        // rolls dice if player is still eligible to roll
        const rollCount = document.querySelector('#roll');
        if (rollCounter < 4 && rollCount.textContent !== 'Play Again') {
            if (rollCounter < 2) {
                rollCount.textContent = `Roll ${rollCounter + 1}`;
                rollCount.className = 'nes-btn';
                diceRoll();
                upperScores();
                lowerScores();
            } else if (rollCounter === 2) {
                rollCount.textContent = `Roll 3`;
                diceRoll();
                upperScores();
                lowerScores();
                rollCount.className = 'nes-btn is-disabled';
            } else if (rollCounter === 3) {
                ;
            }
        rollCounter++;
    }
}

const holdRequest = () => {
    // gives user option to freeze or unfreeze individual die btwn rolls
    for (let i=1; i<6; i++) {
        const die = document.getElementById(`${i}`);
        const diceButtons = document.querySelectorAll('.dice')
        die.addEventListener('click', function() {
            if (document.querySelector('#roll').textContent !== 'Roll' && document.querySelector('#roll').textContent !== 'Play Again') {
            // when a die is clicked, if the die's hold value is true, change to false
            if (diceObjs[this.id - 1].hold) {
                diceObjs[this.id - 1].hold = false;
            } else {
                diceObjs[this.id - 1].hold  = true;
            }
            // change button colour to reflect hold status
            changeColor(diceButtons, this.id - 1)
        }
        });
    }
}

const changeColor = (diceButtons, index) => {
    if (diceObjs[index].hold) {
        diceButtons[index].className = 'nes-btn is-primary dice';
    } else {
        diceButtons[index].className = 'nes-btn dice';
    }
}

// SCORE TRACKERS

const upperScores = () => {
    // tracks score counts after each roll
    for (let scoreButton = 1; scoreButton < 7; scoreButton++) {
        let score = 0;
        const scoreDisplay = document.querySelector(`#s${scoreButton}`);
        if (scoreObjs[scoreButton - 1].selected === false) {
            for (let diceButton = 0; diceButton<5; diceButton++) {
                if (diceObjs[diceButton].value === scoreButton) {
                    score += diceObjs[diceButton].value;
                }
            scoreDisplay.textContent = score;
            }
        } 
    }
}

const lowerScores = () => {
    const diceDuplicates = trackDuplicates();
    // 3 of a kind
    if ((diceDuplicates.includes(3) || diceDuplicates.includes(4) || diceDuplicates.includes(5))
    && !scoreObjs[6].selected) {
        const scoreDisplay = document.querySelector(`#threeKind`);
        scoreDisplay.textContent = diceSum();
    } else {
        if (!scoreObjs[6].selected) {
        const scoreDisplay = document.querySelector(`#threeKind`);
        scoreDisplay.textContent = 0;
        }
    }
    // 4 of a kind
    if ((diceDuplicates.includes(4) || diceDuplicates.includes(5))
    && !scoreObjs[7].selected) {
        const scoreDisplay = document.querySelector(`#fourKind`);
        scoreDisplay.textContent = diceSum();
    } else {
        if (!scoreObjs[7].selected) {
        const scoreDisplay = document.querySelector(`#fourKind`);
        scoreDisplay.textContent = 0;
        }
    }
    // full house
    if ((diceDuplicates.includes(2) && diceDuplicates.includes(3))
    && !scoreObjs[8].selected) {
        const scoreDisplay = document.querySelector(`#fullHouse`);
        scoreDisplay.textContent = 25;
    } else {
        if (!scoreObjs[8].selected) {
        const scoreDisplay = document.querySelector(`#fullHouse`);
        scoreDisplay.textContent = 0;
        }
    }
    // straights
    const count = straights(); 
    if (count >= 3 && !scoreObjs[9].selected) {
        const scoreDisplay = document.querySelector(`#smallStraight`);
        scoreDisplay.textContent = 30;
    } else if (!scoreObjs[9].selected) {
        const scoreDisplay = document.querySelector(`#smallStraight`);
        scoreDisplay.textContent = 0;
    } 

    if (count === 4 && !scoreObjs[10].selected) {
        const scoreDisplay = document.querySelector(`#largeStraight`);
        scoreDisplay.textContent = 40;
    } else if (!scoreObjs[10].selected) {
        const scoreDisplay = document.querySelector(`#largeStraight`);
        scoreDisplay.textContent = 0;
    }

    // yahtzee
    if (diceDuplicates.includes(5) && !scoreObjs[11].selected) {
        const scoreDisplay = document.querySelector(`#yahtzee`);
        scoreDisplay.textContent = 50;
    } else if (diceDuplicates.includes(5) && scoreObjs[11].selected && scoreObjs[11].joker){
        const scoreDisplay = document.querySelector(`#setYahtzee`);
        scoreDisplay.textContent = Number(scoreDisplay.textContent) + 100;
        scoreObjs[11].value = scoreDisplay.textContent
    } else { 
        if (!scoreObjs[11].selected) {
        const scoreDisplay = document.querySelector(`#yahtzee`);
        scoreDisplay.textContent = 0;
        }
    }

    // change
    if (!scoreObjs[12].selected) {
        const scoreDisplay = document.querySelector(`#chance`);
        scoreDisplay.textContent = diceSum();
    }
}

const straights = () => {
    let diceValues = []
    for (let i=0; i<5; i++) {
        diceValues.push(diceObjs[i].value)
    }
    diceValues.sort();
    let count = 0;
    for (let i=0; i<4; i++) {
        if (diceValues[i] === diceValues[i+1] - 1) {
            count++
        } else if (diceValues[i] !== diceValues[i+1] && count < 3) {
            count = 0
        }
    }
    return count;
}

const trackDuplicates = () => {
    diceDuplicates = [0, 0, 0, 0, 0, 0]
    for (let i=1; i<7; i++) {
        for (let j=0; j<5; j++)
        if (diceObjs[j].value === i) {
            diceDuplicates[i - 1]++;
        }
    }
    return diceDuplicates;
}

const diceSum = () => {
    let sum = 0;
    for (let i =0; i<5; i++) {
        sum += diceObjs[i].value;
    }
    return sum;
}

// SCORING

const scoreSelect = () => {
    // this lets the user select a valid score at any time
    // once that score is selected, the user won't be able to select the same score again
    // when the user selects a score, dice reset to a new round (first roll is automatic)
    
    // add event listener for all elements in score class
    const scoreButtons = document.querySelectorAll('.score');
        for (let i=0; i < 13; i++) {
            scoreButtons[i].addEventListener('click', () => {
                if (document.querySelector('#roll').textContent !== 'Roll' && document.querySelector('#roll').textContent !== 'Play Again') {
                const finalScore = scoreButtons[i].textContent;
                scoreObjs[i].value = finalScore;
                scoreObjs[i].selected = true;
                scoreButtons[i].parentElement.textContent = finalScore;
    
                roundReset();
                checkBonus();
    
                roundCount++;
                if (roundCount === 14) {
                    finalScores();
                }
            }
            })
        }

    // allows for joker to be added in the future if player gets a Yahtzee
    // player will need to get a second Yahtzee to actually get the joker points
    // this function makes them eligible for those points
    const yahtzeeButton = document.querySelector(`#yahtzee`)
    yahtzeeButton.addEventListener('click', () => {
        if (scoreObjs[11].value !== '0') {
            scoreObjs[11].joker = true;
        }
    })
}

const finalScores = () => {
    let upperSectionTotal = 0
    for (let i= 0; i<6; i++) {
        upperSectionTotal += Number(scoreObjs[i].value);
    }
    if (document.querySelector('#setBonus').textContent !== '0') {
        upperSectionTotal += 35;
    }
    document.querySelector('#upperTotal').textContent = upperSectionTotal;

    let lowerSectionTotal = 0;
    for (let i= 6; i<13; i++) {
        lowerSectionTotal += Number(scoreObjs[i].value);
    }
    document.querySelector('#lowerTotal').textContent = lowerSectionTotal;

    const grandTotal = upperSectionTotal + lowerSectionTotal;
    document.querySelector('#grandTotal').textContent = grandTotal;

    endOfGame(String(grandTotal));
}

const checkBonus = () => {
    upperTotal = 0;
    for (let i=0; i<6; i++) {
        upperTotal += Number(scoreObjs[i].value);
    }
    if (upperTotal >= 63) {
        document.querySelector('#setBonus').textContent = 35;
    }
}

// RESETS

const roundReset = () => {
    rollCounter = 0;
    diceDuplicates = [0, 0, 0, 0, 0, 0];
    const diceButtons = document.querySelectorAll('.dice')
    for (let i=0; i<5; i++) {
        diceObjs[i].hold = false;
        changeColor(diceButtons, i)
    }
    rollTracker();
}

const endOfGame = (grandTotal) => {
    // Display final score on dice buttons
    if (Number(grandTotal) < 10) {
        grandTotal = `-${grandTotal}-`
    } else if (Number(grandTotal) < 100) {
        grandTotal = `0${grandTotal}`
    }
    const displayScore = `-${grandTotal}-`;
    
    // save the score in local storage
    localStorage.setItem(`grandTotal${gameNumber}`, grandTotal)

    // update High Scores
    updateHighScores();

    const diceButtons = document.querySelectorAll('.dice');
    for (let i=0; i<5; i++) {
        diceButtons[i].textContent = displayScore[i];
        diceButtons[i].className = 'nes-btn dice';
    }
    const replayGame = document.querySelector('#roll');
    replayGame.textContent = 'Play Again'
    replayGame.addEventListener("click", () => {
        gameReset();
    })
}

const gameReset = () => {
    // save user's chosen colour scheme in localStorage
    localStorage.setItem('backgroundColor', document.body.style.backgroundColor);
    localStorage.setItem('textColor', document.body.style.color);
    // then reload with the user's chosen colour scheme
    location.reload(); 
}

// EVENT LISTENER FUNCTION CALLS

rollRequest();
holdRequest();
scoreSelect();
changeColorScheme();