import React from "react";
import { shuffle } from "../../util/arrayShuffle";
import "./board.scss";

import { ComputerPlayer } from "../computerPlayer/player";
import { Player } from "../Player/Player";
import { Deck } from "../deck/deck";
import { Discarded } from "../Discarded/Discarded";
const CARDS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "draw2", "peak", "swap"];

export const CardContext = React.createContext({});
export default class Board extends React.Component {
  constructor() {
    super();
    this.cards = this.setupAllCards();

    this.state = {
      computerCards: this.dealcards(4),
      humanCards: this.dealcards(4),
      pileCards: this.cards.slice(0, 20),
      discardCard: this.dealcards(1),
    };
  }

  toggleFlip(show, idx, playerCards){
    let newCards = this.state[playerCards];
    newCards[idx].canPeak = false;
    newCards[idx].show = show;
    this.setState({
      [playerCards]: newCards,
    });

  }
  unpeakCard = (playerCards, idx) => {
 const pile = this.state[playerCards];
 const card = pile && pile[idx] || {};
 const canRevealCrad = card.canPeak || card.isTopOfPile;
    if(!canRevealCrad) { return;}
    this.toggleFlip(true, idx, playerCards)
    setTimeout( _ => {
      this.toggleFlip(false, idx, playerCards)
    }, 2000);
  }

  dealcards(amount) {
    let cardsToDeal = this.cards.slice(0, amount);
    this.cards = this.cards.slice(amount);
    if (amount === 4) {
      // can peak at 2 of these cards
      cardsToDeal[0].canPeak = true;
      cardsToDeal[3].canPeak = true;
    }
    return cardsToDeal;
  }

  setupAllCards() {
    const cards = [];
    let cardToAdd = [];
    CARDS.forEach((c) => {
      if (c < 8) {
        cardToAdd = [c, c, c, c];
      } else if (c === 9) {
        cardToAdd = [c, c, c, c, c, c, c, c, c];
      } else {
        // is a power card..
        cardToAdd = [c, c, c];
      }
      cards.push(...cardToAdd);
    });
    let cardsShuffled = shuffle(cards);
    return cardsShuffled.map((c) => ({ card: c, canPeak: false, show: false }));
  }

  render() {
    return (
      <CardContext.Provider  value={ {unpeakCard: this.unpeakCard}}>
        
        <div className="board">
          <ComputerPlayer cards={this.state.computerCards} />
          <div className="actions">
            <Deck cards={this.state.pileCards} />
            <Discarded cards={this.state.discardCard} />
          </div>
          <Player cards={this.state.humanCards} />
        </div>
      </CardContext.Provider >
    );
  }
}
