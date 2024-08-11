document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const statusDisplay = document.getElementById('status');
    const resetButton = document.getElementById('reset');
    let currentPlayer = 'X';
    let gameActive = true;
    const boardState = ['', '', '', '', '', '', '', '', ''];

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    const updateStatusMessage = () => {
        statusDisplay.textContent = gameActive 
        ? `Player ${currentPlayer}'s Turn`
        : `Player ${currentPlayer} has won!`;
    };

    const handleCellClick = (e) => {
        const clickedCell = e.target;
        const clickedCellIndex = Array.from(cells).indexOf(clickedCell);

        if (boardState[clickedCellIndex] !== '' || !gameActive) {
            return;
        }

        boardState[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;

        checkForWinner();
        if (gameActive) {
            switchPlayer();
            updateStatusMessage();
        }
    };

    const switchPlayer = () => {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    };

    const checkForWinner = () => {
        let roundWon = false;
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            gameActive = false;
            updateStatusMessage();
        } else if (!boardState.includes('')) {
            gameActive = false;
            statusDisplay.textContent = "It's a draw!";
        }
    };

    const resetGame = () => {
        boardState.fill('');
        cells.forEach(cell => (cell.textContent = ''));
        gameActive = true;
        currentPlayer = 'X';
        statusDisplay.textContent = "Player X's Turn";
    };

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', resetGame);
});
