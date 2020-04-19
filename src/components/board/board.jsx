import React from 'react';
import {shuffle} from "../../util/arrayShuffle";
import "./board.scss";

import {ComputerPlayer} from "../computerPlayer/player";
import {Player} from "..//Player/Player";
const CARDS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'draw2', 'peak', 'swap'];
export default class Board extends React.Component {

  
    constructor(){
       super();
       this.cards = this.setupAllCards();
       console.log(this.cards);
       
       this.state = {
           computerCards: this.cards.slice(0,4),
           humanCards: this.cards.slice(4, 8)
       }   
       
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
        return shuffle(cards);
    }



    render(){
        return <div className="board">
            <ComputerPlayer cards={this.state.computerCards}/>
            <Player cards={this.state.humanCards}/>

        </div>

    }

}