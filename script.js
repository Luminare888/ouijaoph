const planchette = document.querySelector('.planchette');
const letters = document.querySelectorAll('span[data-letter]');
const revealedPhraseElement = document.getElementById('revealed-phrase');
const answerForm = document.getElementById('answer-form');
const feedbackElement = document.getElementById('feedback');
const secretPhrase = "LOS MUERTOS SE ALZAN";

function randomizar(word) {
    const letters = word.split('');
    for (let i = letters.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [letters[i], letters[j]] = [letters[j], letters[i]];
    }
    return letters.join('');
}

function fraseRandomizada(phrase) {
    const palabras = phrase.split(' ');
    const fraseNueva = palabras.map(word => randomizar(word));
    return fraseNueva.join(' ');
}

const fraseSecretaRandomizada = fraseRandomizada(secretPhrase);

revealedPhraseElement.innerText = "";

function movePlanchetteToLetter(letter) {
    if (letter === ' ') {
        revealedPhraseElement.innerHTML += '&nbsp;';
        return;
    }

    const target = document.querySelector(`span[data-letter="${letter}"]`);
    const targetPosition = target.getBoundingClientRect();
    const boardPosition = document.querySelector('.ouija-board').getBoundingClientRect();

    const top = targetPosition.top - boardPosition.top;
    const left = targetPosition.left - boardPosition.left;

    planchette.style.top = `${top}px`;
    planchette.style.left = `${left}px`;

    revealedPhraseElement.innerText += letter;
}

function mostrarFraseSecreta() {
    let index = 0;

    const interval = setInterval(() => {
        if (index < fraseSecretaRandomizada.length) {
            movePlanchetteToLetter(fraseSecretaRandomizada[index]);
            index++;
        } else {
            clearInterval(interval);
            activarFormulario();
        }
    }, 1500);
}

function verificarRespuesta(e) {
    e.preventDefault();
    const userAnswer = document.getElementById('answer').value.trim();

    if (userAnswer.toUpperCase() === secretPhrase) {
        mensajeGanador();
    } else {
        feedbackElement.textContent = "Respuesta incorrecta. Intenta de nuevo.";
        document.getElementById('answer').value = "";
    }
}

function mensajeGanador() {
    const urlFormulario = "https://docs.google.com/forms/d/e/1FAIpQLSfvSLP-ZWkQjzjbgs2J2FzjeSxSbafnhlccYYeiN5kwA2YjPw/viewform?usp=sf_link";
    window.open(urlFormulario, '_blank');
}

answerForm.addEventListener('submit', verificarRespuesta);

window.onload = function() {
    mostrarFraseSecreta();
}
