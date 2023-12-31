// ANIMATE DICE ROLL
const animateDiceRoll = () => {
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

    const scoreButtons = document.querySelectorAll('.score');
    for (let i = 0; i < 13; i++) {
        scoreButtons[i].addEventListener('click', () => {
            if (roundCount !== 13
                && document.querySelector('#roll').textContent !== 'Roll'
                && document.querySelector('#roll').textContent !== 'Play Again') {
                for (let i = 0; i < 5; i++) {
                    const animateDiceRoll = setInterval(diceRollAnimation, randomNumber(50, 200), i);
                    setTimeout(() => {
                        clearInterval(animateDiceRoll);
                        document.getElementById(`${i + 1}`).innerHTML = `<img src="assets/images/2d/${diceObjs[i].value}.png" alt="${diceObjs[i].value}" width="40px"/>`;
                    }, randomNumber(100, 1000))
                }
            }
        })
    }
}
animateDiceRoll();

// 3D DICE BACKGROUND (RANDOMISED)
const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
}


const place3dDice = () => {
    for (let i = 0; i < 11; i++) {
        setTimeout(() => {
            const dice = document.createElement('img');
            dice.src = `assets/images/3d/${i}.png`;
            dice.id = `img${i}`;
            dice.class = '3dImg'
            document.body.appendChild(dice);

            const fadeTime = randomNumber(1, 5);
            dice.style.animation = `fadeIn ${fadeTime}s`;

            dice.style.position = 'fixed';

            const positions = [
                { top: [25, 95], left: [0, 15] },
                { top: [85, 95], left: [25, 75] },
                { top: [25, 95], left: [80, 95] },
            ]
            const index = randomNumber(0, 3)

            const top1 = positions[index].top[0];
            const top2 = positions[index].top[1];
            dice.style.top = `${randomNumber(top1, top2)}%`;

            const left1 = positions[index].left[0];
            const left2 = positions[index].left[1];
            dice.style.left = `${randomNumber(left1, left2)}%`;
            // dice.style.top = `${randomNumber(30, 98)}%`;
            // dice.style.left = `${randomNumber(0, 98)}%`;

            dice.style.transform = `rotate(${randomNumber(0, 360)}deg)`;
            dice.style.width = `${randomNumber(50, 300)}px`;
            dice.style.zIndex = '-1';
        }, (randomNumber(0, 2000)));
    }
}

place3dDice();
