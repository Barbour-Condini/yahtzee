// AUDIO 
const diceRollAudio = new Audio("assets/audio/diceRoll2.mp3")
const yahtzeeAchieved = new Audio("assets/audio/success1.mp3")
const scoreSuccess = new Audio("assets/audio/success2.mp3")
const scoreError = new Audio("assets/audio/error2.mp3")
const click = new Audio("assets/audio/click1.mp3")
const gameEnd = new Audio("assets/audio/end1.mp3")

// AUDIO-SPECIFIC GLOBAL VARS
// (you can access global vars from gameplay.js in this one, as it's loaded in before audio)
let mute = false;

if (localStorage.getItem('mute') !== null) {
    if (localStorage.getItem('mute') === 'true') {
        mute = true
    } else {
        mute = false
    }
    document.querySelector('#mute').textContent = localStorage.getItem('muteText')
} 

// MUTE
document.querySelector('#mute').addEventListener('click', () => {
    if (!mute) {
        mute = true;
        document.querySelector('#mute').textContent = 'Unmute';
        localStorage.setItem('mute', String(mute))
        localStorage.setItem('muteText', 'Unmute')
    } else {
        mute = false;
        document.querySelector('#mute').textContent = 'Mute';
        localStorage.setItem('mute', String(mute))
        localStorage.setItem('muteText', 'Mute')
    }
})


// YAHTZEE
// this sound will still play if player is ineligble for yahtzee points (intentional decision)
const checkYahtzeeAudio = () => {
    setTimeout(()=> {
        duplicateCounter = 0
        for (let j=0; j<4; j++) {
            if((diceObjs[j].value === diceObjs[j+1].value) 
            && document.querySelector('#roll').textContent !== 'Roll' 
            && document.querySelector('#roll').textContent !== 'Play Again') {
                duplicateCounter++;
            } 
        }
        if (duplicateCounter === 4 && !mute) {
            yahtzeeAchieved.play();
        } 
        duplicateCounter = 0;
    }, 200)
}

// BONUS - not working yet
// const checkBonusAudio = () => {
//     setTimeout(() => {
//         if (document.querySelector('#setBonus').textContent !== '0' && !mute) {
//             console.log(document.querySelector('#setBonus').textContent)
//             bonusAchieved.play()
//         }
//     }, 200)
// }

// GAME END
const checkGameEndAudio = () => {
    setTimeout(() => {
        if (roundCount === 14 && !mute) { // roundCount as a global var is already defined in the main js file; as this one is loaded in afterwards you can access those variables here
            gameEnd.play();
        }
    }, 500)
}


// ROLL
const roll = document.querySelector('#roll');
roll.addEventListener('click', function () {
    // if (roll.textContent !== 'Play Again') { // not needed as the sound won't be triggered over a page reload anyway
        checkYahtzeeAudio();
        // checkBonusAudio();
        if (!mute && rollCounter <= 3) {
            diceRollAudio.play();
        }
    // }
})


// SCORE SELECT
const scoreButtons = document.querySelectorAll('.score');
for (let i=0; i<13; i++) {
    scoreButtons[i].addEventListener('click', () => {
        if (scoreButtons[i].textContent !== '0' && !mute && roundCount !== 14) {
            scoreSuccess.play();
        } else if (!mute && roundCount !== 14) {
            if (document.querySelector('#roll').textContent !== 'Roll' && document.querySelector('#roll').textContent !== 'Play Again') {
                scoreError.play();
            }
        }
        checkYahtzeeAudio();
        checkGameEndAudio();
    })
}

// DICE HOLD
const dice = document.querySelectorAll('.dice')
for (let i=0; i<5; i++) {
    dice[i].addEventListener('click', function() {
        if (!mute) {
            if (document.querySelector('#roll').textContent !== 'Roll' && document.querySelector('#roll').textContent !== 'Play Again') {
                click.play();
        }
    }
    })
}

