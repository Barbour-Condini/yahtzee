// CHANGE COLOUR SCHEME
const changeColorScheme = () => {
    document.querySelector('#default_select').addEventListener("change", function () {
        if (this.value === "0") {
            document.body.style.backgroundColor = 'peru';
            document.body.style.color = 'black';
            changeTableColors('bisque', 'black');
        } else if (this.value === "1") {
            document.body.style.backgroundColor = 'white';
            document.body.style.color = 'black';
            changeTableColors('white', 'black');
        } else if (this.value === "2") {
            document.body.style.backgroundColor = 'black';
            document.body.style.color = 'white';
            changeTableColors('black', 'white');
        }
        localStorage.setItem('backgroundColor', document.body.style.backgroundColor);
        localStorage.setItem('textColor', document.body.style.color);
    });
}

const changeTableColors = (background, text) => {
    let th = document.querySelectorAll('th')
    for (let i = 0; i < 20; i++) {
        th[i].style.backgroundColor = background;
        th[i].style.color = text;
    }
    let td = document.querySelectorAll('td')
    for (let i = 0; i < 16; i++) {
        td[i].style.backgroundColor = background;
        td[i].style.color = text;
    }
}


// INSTRUCTION VIDEO
const stopVideo = () => {
    const video = document.querySelector('iframe');
    document.querySelector('#instructionExit').addEventListener('click', () => {
        video.src = "https://www.youtube.com/embed/gz7WzSRRgpQ" // hacky but it stops playback bc it has to reload the url. video.pause() isn't working, not sure it works with iframe?
    });
}
stopVideo()

// 3D DICE BACKGROUND (RANDOMISED)
const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
}

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
        dice.style.top = `${randomNumber(30, 98)}%`;
        dice.style.left = `${randomNumber(0, 98)}%`;
        dice.style.transform = `rotate(${randomNumber(0, 360)}deg)`;
        dice.style.width = `${randomNumber(50, 300)}px`;
        dice.style.zIndex = '-1';
    }, (randomNumber(0, 2000)));
}

// ANIMATE DICE
const diceRollAnimation = (i) => {
    const result = Math.ceil(Math.random() * 6)
    document.getElementById(`${Number(i) + 1}`).innerHTML = `<img src="assets/images/2d/${result}.png" alt="${result}" width="40px"/>`;
}

roll.addEventListener('click', function () {
    for (let i = 0; i < 5; i++) {
        if (!diceObjs[i].hold && roll.textContent !== 'Roll 3') {
            const animateDiceRoll = setInterval(diceRollAnimation, 50, i);
            setTimeout(() => {
                clearInterval(animateDiceRoll);
                document.getElementById(`${Number(i) + 1}`).innerHTML = `<img src="assets/images/2d/${diceObjs[i].value}.png" alt="${diceObjs[i].value}" width="40px"/>`;
            }, randomNumber(100, 1000))
        }
    }
})


const scoreButtons = document.querySelectorAll('.score');

for (let i=0; i<13; i++) {
    scoreButtons[i].addEventListener('click', () => {
        if(roundCount !==13
            && document.querySelector('#roll').textContent !== 'Roll' 
            && document.querySelector('#roll').textContent !== 'Play Again') {
            for (let i = 0; i < 5; i++) {
            const animateDiceRoll = setInterval(diceRollAnimation, 50, i);
            setTimeout(() => {
                clearInterval(animateDiceRoll);
                document.getElementById(`${i+1}`).innerHTML = `<img src="assets/images/2d/${diceObjs[i].value}.png" alt="${diceObjs[i].value}" width="40px"/>`;
            }, randomNumber(100, 1000))
        }
        }
    })
}
