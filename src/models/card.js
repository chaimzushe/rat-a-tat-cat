export default class Card {
  constructor(id, value, type, peakable) {
    this.id = id;
    this.value = value;
    this.type = type;

    this.peakable = peakable;
    this.reveal = true;
  }

  generateClasses() {
    let className = "card";
    if (this.peakable) {
      className += " card--flipable";
    }
    return className;
  }
}
