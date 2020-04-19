import React from 'react';
import "./board.scss";
const CARDS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'draw2', 'peak', 'swap'];
export default class Board extends React.Component {

  
    constructor(){
       super();
       this.cards = this.setupAllCards();   
       console.log(this.cards);  
    }

    componentDidMount(){
        
    }

    setupAllCards(){
        const cards = [];
        let cardToAdd = [];
        CARDS.forEach( c => {
           if(c < 8 ) {
               cardToAdd = [c,c,c,c];
           } else if(c === 9) { 
            cardToAdd = [c,c,c,c,c,c,c,c,c];
           } else { // is a power card..
            cardToAdd = [c,c,c];
           }
           cards.push(...cardToAdd);
        });
        return cards;
    }



    render(){
        return <div className="board">
           
        </div>

    }

}