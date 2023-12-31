// ANIMATE DICE ROLL
const diceRollAnimation = (i) => {
    const result = Math.ceil(Math.random() * 6)
    document.getElementById(`${Number(i) + 1}`).innerHTML = `<img src="assets/images/2d/${result}.png" alt="${result}" width="40px"/>`;
}

roll.addEventListener('click', () => {
    for (let i = 0; i < 5; i++) {
        if (!diceObjs[i].hold && roll.textContent !== 'Roll 3') {
            const animateDiceRoll = setInterval(diceRollAnimation, randomNumber(50, 200), i);
            setTimeout(() => {
                clearInterval(animateDiceRoll);
                document.getElementById(`${Number(i) + 1}`).innerHTML = `<img src="assets/images/2d/${diceObjs[i].value}.png" alt="${diceObjs[i].value}" width="40px"/>`;
            }, randomNumber(100, 1000))
        }
    }
})


// const scoreButtons = document.querySelectorAll('.score');
// (scoreButtons commented out as already initialised in audio.js)

for (let i=0; i<13; i++) {
    scoreButtons[i].addEventListener('click', () => {
        if(roundCount !==13
            && document.querySelector('#roll').textContent !== 'Roll' 
            && document.querySelector('#roll').textContent !== 'Play Again') {
            for (let i = 0; i < 5; i++) {
            const animateDiceRoll = setInterval(diceRollAnimation, randomNumber(50, 200), i);
            setTimeout(() => {
                clearInterval(animateDiceRoll);
                document.getElementById(`${i+1}`).innerHTML = `<img src="assets/images/2d/${diceObjs[i].value}.png" alt="${diceObjs[i].value}" width="40px"/>`;
            }, randomNumber(100, 1000))
        }
        }
    })
}
