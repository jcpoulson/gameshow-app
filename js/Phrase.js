class Phrase {
    
    constructor(phrase) {
        this.phrase = phrase.toLowerCase();
    }


    addPhraseToDisplay() {
        const phraseDisplay = document.querySelector('#phrase').firstElementChild;
        for (let i = 0; i < this.phrase.length; i++) {
            if (this.phrase[i] == " ") {
                let letter = document.createElement("LI");
                phraseDisplay.appendChild(letter);
                letter.innerHTML = `<li class="space"> </li>`;
            } else {
                let letter = document.createElement("LI");
                phraseDisplay.appendChild(letter);
                letter.innerHTML = `<li class="hide letter ${this.phrase[i]}">${this.phrase[i]}</li>`
            }
        }
    }


    checkLetter(letter) {
        if ( this.phrase.includes(letter) == true ) {
            return true;
        } else {
            return false;
        }
    }


    showMatchedLetter(letter) {
        const letters = document.querySelectorAll('.letter');
        const keys = document.querySelectorAll('.key');

        // loops through the letters 
        for (let i = 0; i< letters.length; i++) {
            if (letters[i].textContent == letter) {
                letters[i].className = 'show letter';
            }
        }

        // updates the on screen keyboard if the user guesses correctly
        for (let i = 0; i < keys.length; i++) {
            if (keys[i].textContent == letter) {
                keys[i].className = "key chosen";
            }
        }
    }

}