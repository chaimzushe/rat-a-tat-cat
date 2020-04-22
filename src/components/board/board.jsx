import React from "react";
import { shuffle } from "../../util/arrayShuffle";
import "./board.scss";
import { Player } from "../Player/Player";
import { Deck } from "../deck/deck";
import { DndProvider } from "react-dnd";
import { CARDS } from "../../data/cards";
import Card from "../../models/card";
import Backend from "react-dnd-html5-backend";

export const cardTypes = {
  humanCard: "humanCard",
  discardedPile: "discardedPile",
  computerCard: "computerCard",
  pickingPile: "pickingPile",
};

export const CardContext = React.createContext({});
export default class Board extends React.Component {
  constructor() {
    super();
    this.cards = this.setupAllCards();
    this.state = this.getSeparatedCards();
  }

  getSeparatedCards() {
    return {
      computerCards: this.cards.filter(
        (c) => c.type === cardTypes.computerCard
      ),
      humanCards: this.cards.filter((c) => c.type === cardTypes.humanCard),
      pileCards: this.cards.filter((c) => c.type === cardTypes.pickingPile),
      discardCard: this.cards.filter((c) => c.type === cardTypes.discardedPile),
    };
  }

  getCardType(idx) {
    if (idx <= 3) {
      return cardTypes.humanCard;
    } else if (idx <= 7) {
      return cardTypes.computerCard;
    } else if (idx === 8) {
      return cardTypes.discardedPile;
    } else {
      return cardTypes.pickingPile;
    }
  }

  addCard = (cardToAdd, cardToDiscard) => {
    
    debugger
    let humanCards = [...this.state.humanCards];
    const disgardPile = [...this.state.discardCard];
    const pickPile = [...this.state.pileCards.slice(0, 20)];

    humanCards.forEach((c) => (c.peakable = false));


    const insertHumanCardAtIndex = humanCards.findIndex(c => c.id === cardToDiscard.id);
    
 
    if (cardToAdd.type === cardTypes.pickingPile) {  // Picked from picking pile    
        pickPile.pop();
    } else if (cardToAdd.type === cardTypes.discardedPile) {  // took from disgard pile
      disgardPile.pop();
    }
    
    
    if (cardToAdd.type === cardTypes.pickingPile && cardToDiscard.type !==  cardTypes.humanCard) {
      cardToAdd.type = cardTypes.discardedPile
      disgardPile.push(cardToAdd)
      return this.setState({
        humanCards: humanCards,
        discardCard: disgardPile,
        pileCards: pickPile
      });
    } else {
        disgardPile.push(cardToDiscard);
        cardToDiscard.type = cardTypes.discardedPile
    }
    humanCards[insertHumanCardAtIndex] = cardToAdd;
    cardToAdd.type = cardTypes.humanCard;

    this.setState({
      humanCards: humanCards,
      discardCard: disgardPile,
      pileCards: pickPile
    });
  };

  setupAllCards() {
    const cards = [];
    let cardToAdd = [];
    CARDS.forEach((c) => {
      // Cards 0 - 8
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
    return cardsShuffled.map((value, idx) => {
      const cardType = this.getCardType(idx);
      const id = idx + 1;
      const show = true;
      const canPeak = idx === 0 || idx === 3;
      return new Card(id, value, cardType, show, canPeak);
    });
  }

  render() {
    return (
      <DndProvider backend={Backend}>
        <CardContext.Provider value={{ addCard: this.addCard }}>
          <div className="board">
            <Player cards={this.state.computerCards} />
            <div className="actions">
              <Deck cards={this.state.pileCards} />
              <Deck cards={this.state.discardCard} />
            </div>
            <Player cards={this.state.humanCards} />
          </div>
        </CardContext.Provider>
      </DndProvider>
    );
  }
}
