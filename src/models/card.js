export default class Card {

    constructor(id, value, type, reveal, peakable){
        this.id = id;
        this.value = value;
        this.type = type;
        this.reveal = reveal;
        this.peakable = peakable;
    }

    generateClasses(){
        let className = "card";
        if (this.peakable) {
            className += " card--flipable";
        }
        return  className;
    }


}