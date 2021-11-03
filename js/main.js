//INTERAZIONE BOTTONI
const playBtn = document.getElementById('play');
const levels = document.getElementById('levels');
const wrapGrid = document.querySelector('.wrap-grid')

playBtn.addEventListener('click', () => {

    wrapGrid.innerHTML = '';

    let cellsNumber;
    let cellsPerSide;

    switch (levels.value) {

        case '1':
            cellsNumber = 100;
            cellsPerSide = 10;
            break;
        case '2':
            cellsNumber = 81;
            cellsPerSide = 9;
            break; 
        case '3':
            cellsNumber = 49;
            cellsPerSide = 7; 
    }

    //console.log(cellsNumber);
    //console.log(cellsPerSide);

    const bomblist = generateBombs(cellsNumber, 16);
    //console.log('bombe generate', bomblist);

    const attempts = [];
    const maxAttempts = cellsNumber - bomblist.length;
    //console.log('Tentativi possibili', maxAttempts);

    const grid = document.createElement('div');
    grid.classList.add('grid');

    for(let i = 1; i <= cellsNumber; i++) {
        const square = createGridSquare(i, cellsPerSide)

        square.addEventListener('click', () => {
            handleSquareClick(square, bomblist, attempts, maxAttempts);
        })
        grid.append(square);
    }

    wrapGrid.append(grid);
});


/**/ 
function handleSquareClick(square, bomblist, attempts, maxAttempts) {

    const number = parseInt(square.innerHTML);
    console.log(number);

    if(bomblist.includes(number)) {
        //console.log('bomba colpita');
        endGame(bomblist, attempts, maxAttempts);
    } else if (!attempts.includes(number)) {
        square.classList.add('safe');

        attempts.push(number);
        //console.log('tentativi riusciti', attempts);

        if(attempts.length === maxAttempts) {
            //console.log('Hai vinto');
            endGame(bomblist, attempts, maxAttempts);
        }
    }
}

function endGame (bomblist, attempts, maxAttempts) {
    const squares = document.querySelectorAll('.square');
    //console.log(squares);

    for (let i = 0; i < squares.length; i++) {
        const square = squares[i];
        const squareValue = parseInt(square.innerHTML);

        if(bomblist.includes(squareValue)) {
            square.classList.add('bomb');
        }
    }


    /**/ 
    let message = `Complimenti campione! Hai azzeccato i ${maxAttempts} tentativi validi. Play again`;

    if(attempts.length < maxAttempts) {
        message = `Peccato perdente! Solamente ${attempts.length} tentativi indovinati. Play again`;
    }

    const messageEl = document.createElement('div');
    messageEl.classList.add('message', 'text-center');
    messageEl.append(message);
    document.querySelector('.wrap-grid').append(messageEl);

    document.querySelector('.grid').classList.add('end-game');
}


    /**/ 
function generateBombs(totCells, totBombs) {
    const bombs = [];

    while(bombs.length < totBombs) {

        const bomb = getRandNumber(1, totCells);

        if(!bombs.includes(bomb)) {
            bombs.push(bomb);
        }
    }
    return bombs;
}

/**/ 

function getRandNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}
    
/**/ 
    
function createGridSquare(num, cells) {
    const nodo = document.createElement('div');

    nodo.classList.add('square');
    nodo.style.width = `calc(100% / ${cells})`;
    nodo.style.height = `calc(100% / ${cells})`;

    nodo.append(num);

    return nodo;
}