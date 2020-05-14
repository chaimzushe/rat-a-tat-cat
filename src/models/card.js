export default class Card {
  constructor(id, value, type, peakable) {
    this.id = id;
    this.value = value;
    this.type = type;
    this.peakable = peakable;
  }

  generateClasses() {
    let className = "card";
    if (this.peakable) {
      className += " card--flipable";
    }
    if(this.swapable){
      className += " card--swappable";
    }
    if(this.animate){
      className += " card--animate";
    }
    return className;
  }
}
