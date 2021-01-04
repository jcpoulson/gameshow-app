// Global variables
const startButton = document.querySelector('#btn__reset');
const overlay = document.querySelector('#overlay');
const keyboard = document.querySelector('#qwerty');

/* 
    When the start button is called a new Game object is created and given an array of phrases, along with the overlay being taken away.
    then two event listeners are written, one for the on screen keyboard and another for the users physical keyboard.
*/
startButton.addEventListener('click', () => {
    let game = new Game(0, ["Playstation Four", "Chocolate Milk", "Team Treehouse", "Avengers Assemble", "Matcha Soda"], null);
    game.startGame();
    game.dynamicStyling();
    overlay.style.display = 'none';

    // event listener for on screen keyboard
    keyboard.addEventListener('click', (event) => {
        if (event.target.className == "key") {
            game.handleInteraction(event.target);
        }
    })
    // event listener for physical keyboard
    document.addEventListener('keydown', (event) => {
        game.handleKeyboard(event.key);
    })
});


