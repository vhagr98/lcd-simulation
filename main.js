import CharacterFactory from './characterFactory.js';
import DisplayController from './displayController.js';

async function initializeApp() {
  const response = await fetch('charPatterns.json');
  const charPatterns = await response.json();

  const characterFactory = new CharacterFactory(charPatterns);
  const displayElement = document.getElementById('lcd-display');
  const displayController = new DisplayController(displayElement, characterFactory);

  const textInput = document.getElementById('text-input');

  document.getElementById('update-button').addEventListener('click', () => {
    displayController.setText(textInput.value);
    textInput.value = ''; //clear input field after updating lcd
  });

  document.getElementById('up-button').addEventListener('click', () => displayController.moveCursor('up'));
  document.getElementById('down-button').addEventListener('click', () => displayController.moveCursor('down'));
  document.getElementById('left-button').addEventListener('click', () => displayController.moveCursor('left'));
  document.getElementById('right-button').addEventListener('click', () => displayController.moveCursor('right'));

  // clear button
  document.getElementById('clear-button').addEventListener('click', () => {
    displayController.clearDisplay();
    textInput.value = '';
  })

  // Initialize display
  displayController.updateDisplay();
}

initializeApp();