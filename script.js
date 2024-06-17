document.addEventListener('DOMContentLoaded', () => {
    const output = document.getElementById('output');
    const input = document.getElementById('input');
    let gameState = 'start';

    function display(text) {
        output.innerHTML += text + '\n';
        output.scrollTop = output.scrollHeight;
    }

    function clearInput() {
        input.value = '';
    }

    function handleInput(command) {
        switch (gameState) {
            case 'start':
                if (command.toLowerCase() === 'a' || command.toLowerCase() === 'b') {
                    gameState = command.toLowerCase() === 'a' ? 'left_path' : 'right_path';
                    display(`You chose: ${command.toUpperCase()}`);
                    nextStep();
                } else {
                    display('Invalid choice. Please enter A or B.');
                }
                break;
            case 'left_path':
                if (command.toLowerCase() === 'a' || command.toLowerCase() === 'b') {
                    gameState = command.toLowerCase() === 'a' ? 'climb_tree' : 'continue_walking';
                    display(`You chose: ${command.toUpperCase()}`);
                    nextStep();
                } else {
                    display('Invalid choice. Please enter A or B.');
                }
                break;
            case 'right_path':
                if (command.toLowerCase() === 'a' || command.toLowerCase() === 'b') {
                    gameState = command.toLowerCase() === 'a' ? 'cross_river' : 'build_raft';
                    display(`You chose: ${command.toUpperCase()}`);
                    nextStep();
                } else {
                    display('Invalid choice. Please enter A or B.');
                }
                break;
            case 'play_again':
                if (command.toLowerCase() === 'y' || command.toLowerCase() === 'n') {
                    if (command.toLowerCase() === 'y') {
                        gameState = 'start';
                        startGame();
                    } else {
                        display('Goodbye!');
                    }
                } else {
                    display('Invalid choice. Please enter Y or N.');
                }
                break;
            default:
                display('Unexpected state.');
                break;
        }
    }

    function nextStep() {
        switch (gameState) {
            case 'start':
                display('\nYou arrive at a fork in the road.\nDo you:\nA: Take the left path\nB: Take the right path');
                break;
            case 'left_path':
                display('\nYou take the left path and walk for hours.\nYou come across a tall tree with a good vantage point.\nDo you:\nA: Climb the tree\nB: Continue walking');
                break;
            case 'right_path':
                display('\nYou take the right path and soon find a river blocking your way.\nDo you:\nA: Cross the river\nB: Build a raft');
                break;
            case 'climb_tree':
                display('\nYou climb the tree and see the lost temple in the distance.\nCongratulations! You\'ve found the treasure!');
                endGame('Treasure Found');
                break;
            case 'continue_walking':
                display('\nYou continue walking but soon realize you\'re lost.\nYou wander aimlessly until you run out of supplies.');
                endGame('Lost Forever');
                break;
            case 'cross_river':
                display('\nYou attempt to cross the river, but the current is too strong.\nYou are swept away and never seen again.');
                endGame('Lost Forever');
                break;
            case 'build_raft':
                display('\nYou build a raft and safely cross the river.\nOn the other side, you are captured by hostile tribes.');
                endGame('Captured');
                break;
            default:
                display('Unexpected state.');
                break;
        }
    }

    function endGame(outcome) {
        display(`\nOutcome: ${outcome}`);
        display('Thank you for playing The Lost Expedition.\nWould you like to play again? (Y/N)');
        gameState = 'play_again';
    }

    function startGame() {
        output.innerHTML = '';
        display('Welcome to The Lost Expedition!\nYou are an explorer searching for a lost treasure deep in a jungle.\nYour choices will determine your fate. Good luck!');
        gameState = 'start';
        nextStep();
    }

    input.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            const command = input.value.trim();
            handleInput(command);
            clearInput();
        }
    });

    startGame();
});