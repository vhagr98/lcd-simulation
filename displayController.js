export default class DisplayController {
  constructor(displayElement, characterFactory) {
    this.display = displayElement;
    this.characterFactory = characterFactory;
    this.cursorPosition = { x: 0, y: 0 };
    this.displayContent = Array(2).fill().map(() => Array(16).fill(' '));
  }

  updateDisplay() {
    this.display.innerHTML = '';
    for (let row = 0; row < 2; row++) {
      for (let col = 0; col < 16; col++) {
        const charElement = this.characterFactory.createCharacterElement(this.displayContent[row][col]);
        if (row === this.cursorPosition.y && col === this.cursorPosition.x) {
          const cursorElement = document.createElement('div');
          cursorElement.className = 'cursor'
          charElement.appendChild(cursorElement);
        }
        this.display.appendChild(charElement);
      }
    }
  }

  moveCursor(direction) {
    switch (direction) {
      case 'up':
        this.cursorPosition.y = Math.max(0, this.cursorPosition.y - 1);
        break;
      case 'down':
        this.cursorPosition.y = Math.min(1, this.cursorPosition.y + 1);
        break;
      case 'left':
        if (this.cursorPosition.x > 0) {
          this.cursorPosition.x--;
        } else if (this.cursorPosition.y > 0) {
          this.cursorPosition.y--;
          this.cursorPosition.x = 15;
        }
        break;
      case 'right':
        if (this.cursorPosition.x < 15) {
          this.cursorPosition.x++;
        } else if (this.cursorPosition.y < 1) {
          this.cursorPosition.y++;
          this.cursorPosition.x = 0;
        }
        break;
    }
    this.updateDisplay();
  }

  setText(text) {
    let row = this.cursorPosition.y;
    let col = this.cursorPosition.x;

    for (let char of text) {
      if (row >= 2) break;
      this.displayContent[row][col] = char;
      col++;
      if (col >= 16) {
        col = 0;
        row++;
      }
    }

    this.cursorPosition = { x: col, y: row };
    this.updateDisplay();
  }

  clearDisplay() {
    this.displayContent = Array(2).fill().map(() => Array(16).fill(' '));
    this.cursorPosition = { x: 0, y: 0 };
    this.updateDisplay();
  }
}