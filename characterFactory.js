export default class CharacterFactory {
    constructor(patterns) {
      this.patterns = patterns;
    }
  
    getCharPattern(char) {
      return this.patterns[char] || this.patterns[' '];
    }
  
    createCharacterElement(char) {
      const charElement = document.createElement('div');
      charElement.className = 'character';
      const pattern = this.getCharPattern(char);
      for (let row of pattern) {
        for (let pixel of row) {
          const pixelElement = document.createElement('div');
          pixelElement.className = pixel ? 'pixel on' : 'pixel';
          charElement.appendChild(pixelElement);
        }
      }
      return charElement;
    }
  }