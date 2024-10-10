const planchette = document.querySelector('.planchette');
const letters = document.querySelectorAll('span[data-letter]');
const revealedPhraseElement = document.getElementById('revealed-phrase');

// La frase secreta que queremos revelar
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

// Función para mover la planchette a una letra o espacio
function movePlanchetteToLetter(letter) {
    if (letter === ' ') {
        revealedPhraseElement.innerHTML += '&nbsp;';  
        return;
    }

    const target = document.querySelector(`span[data-letter="${letter}"]`);
    const targetPosition = target.getBoundingClientRect();
    const boardPosition = document.querySelector('.ouija-board').getBoundingClientRect();

    // Calculamos la posición de la planchette en relación al tablero
    const top = targetPosition.top - boardPosition.top;
    const left = targetPosition.left - boardPosition.left;

    planchette.style.top = `${top}px`;
    planchette.style.left = `${left}px`;

    // Mostramos la letra seleccionada en el contenedor de la frase revelada
    revealedPhraseElement.innerText += letter;
}

// Función para revelar la frase secreta letra por letra
function revealSecretPhrase() {
    let index = 0;

    const interval = setInterval(() => {
        if (index < fraseSecretaRandomizada.length) {
            movePlanchetteToLetter(fraseSecretaRandomizada[index]);
            index++;
        } else {
            clearInterval(interval);
        }
    }, 1500); // Mueve la planchette cada 1.5 segundos
}

// Iniciar el proceso de revelación de la frase secreta al cargar la página
revealSecretPhrase();

// Formulario de respuesta

document.getElementById('answer-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar recarga de la página al enviar el formulario

    const name = document.getElementById('name').value.trim();
    const answer = document.getElementById('answer').value.trim().toLowerCase();
    const feedback = document.getElementById('feedback');
    const correctList = document.getElementById('correct-list');

    // Respuesta correcta (puedes cambiarla por la que quieras)
    const correctAnswer = "los muertos se alzan";

    if (answer === correctAnswer) {
        // Si la respuesta es correcta
        feedback.textContent = "¡Correcto!";
        feedback.style.color = "green";

        // Agregar nombre a la lista de los que respondieron bien
        const listItem = document.createElement('li');
        listItem.textContent = name;
        correctList.appendChild(listItem);

        // Limpiar los campos
        document.getElementById('name').value = "";
        document.getElementById('answer').value = "";
    } else {
        // Si la respuesta es incorrecta
        feedback.textContent = "Respuesta incorrecta, inténtalo de nuevo.";
        feedback.style.color = "red";
    }
});