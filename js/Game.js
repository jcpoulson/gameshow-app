class Game {

    constructor(missed, phrases, activePhrase) {
        this.missed = 0;
        this.phrases = phrases;
        this.activePhrase = null;
    }

    getRandomPhrase() {
        let randomPhrase = this.phrases[Math.floor(Math.random() * this.phrases.length)];
        return randomPhrase;
    }


    startGame() {
        document.querySelector('#overlay').getElementsByClassName.display = 'none';
        this.activePhrase = this.getRandomPhrase();
        let phrase = new Phrase(this.activePhrase);
        phrase.addPhraseToDisplay();
    }


    removeLife() {
        const hearts = document.querySelector('#scoreboard').firstElementChild;
        hearts.children[this.missed].firstElementChild.src = "images/lostHeart.png";
        this.missed += 1;
    }


    /* 
        This function loops through the phrase letters and finds out how many have been guessed correctly, if it is as many
        as the phrase itself, then the user wins the game
    */
    checkForWin() {
        const letters = document.querySelectorAll('.letter');
        let correctlyGuessedLetters = 0;
        for (let i = 0; i < letters.length; i++) {
            if (letters[i].className == "show letter") {
                correctlyGuessedLetters += 1
            }
        }

        if (correctlyGuessedLetters == letters.length) {
            return true;
        } else {
            return false;
        }
    }

    /*
        This function depending on the result of the checkForWin function dynamically changes the screen of the user to either a win or loss screen
        and allows the user to try again
    */
    gameOver(outcome) {
        const overlay = document.querySelector('#overlay');
        const resetButton = document.querySelector('#btn__reset');
        const gameOverMessage = document.querySelector('#game-over-message');

        if (outcome == "win") {
            overlay.style.display = 'flex';
            overlay.className = 'win';
            gameOverMessage.innerHTML = `<h1>Congratulations, You just won the game. Press the button below if you would like to play again</h1>`
            resetButton.addEventListener('click', () => {
                location.reload();
            })
        } else if (outcome == "lose"){
            overlay.style.display = 'flex';
            overlay.className = 'lose';
            gameOverMessage.innerHTML = `<h1>Sorry, You ran out of tries. Press the button below if you would like to try again</h1>`
            resetButton.addEventListener('click', () => {
                location.reload();
            })
        }
    }

    /* 
        This function recieves an event parameter which in this case is the key that the user selects from the onscreen keyboard
        the checkLetter function is then called on that value and if it returns true the showMatchedLetter function is called, if false the removeLife
        function is called.Then finally the checkforWin function is called.
    */
    handleInteraction(event) {
        let phrase = new Phrase(this.activePhrase);
        if ( phrase.checkLetter(event.textContent) ) {
            phrase.showMatchedLetter(event.textContent);
        } else {
            event.className = "key wrong";
            this.removeLife()
        }
        
        if (this.checkForWin() == true) {
            this.gameOver("win");
        } else if (this.missed == 5){
            this.gameOver("lose")
        }
    }

    /*
        This function is for the physical keyboard, this function is the same as the handle interaction
        function except for the parameter, the parameter is simply a string which the user types from the keyboard
    */
    handleKeyboard(key) {
        let phrase = new Phrase(this.activePhrase);
        if ( phrase.checkLetter(key) ) {
            phrase.showMatchedLetter(key);
        } else {
            const keys = document.querySelectorAll('.key');
            this.removeLife()
            // this for loop adds the wrong class to a wrong guess on the keyboard
            for (let i = 0; i < keys.length; i++) {
                if (keys[i].textContent == key) {
                    keys[i].className = "key wrong";
                }
            }
        }
        
        if (this.checkForWin() == true) {
            this.gameOver("win");
        } else if (this.missed == 5){
            this.gameOver("lose")
        }
    }

    /* 
        This function loops through every key on the keyboard and assigns a random rgb color to the border
    */
    dynamicStyling() {
        const keyboard = document.querySelectorAll('.key');
        let colors = ["#e47211", "#19d019", "blue", "#11e011", "skyblue", "#e40f0f"]

        for (let i = 0; i < keyboard.length; i++) {
            keyboard[i].style.border = `solid 5px ${colors[Math.floor(Math.random() * colors.length)]}`
        }
    }



}