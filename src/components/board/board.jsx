import React from "react";
import { shuffle } from "../../util/arrayShuffle";
import "./board.scss";
import { Player } from "../Player/Player";
import { Deck } from "../deck/deck";
import { DndProvider } from "react-dnd";
import { CARDS } from "../../data/cards";
import Card from "../../models/card";
import Backend from "react-dnd-html5-backend";
import { ScoreBoard } from "../ScoreBoard/ScoreBoard";
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
    this.state = {
      gameOver: false,
      turnToPlay: 'humanCard',
      ...this.getSeparatedCards(),
      turnCounter: null,
    };
  }

  getContextValue = () => {
    return {
      addCard: this.addCard,
      gameOver: this.state.gameOver,
      handlePowerCards: this.handlePowerCards,
      humanCards: this.state.humanCards,
      computerCards: this.state.computerCards,
      removePeakable: this.removePeakable,
      turnCounter: this.state.turnCounter,
      turnToPlay: this.state.turnToPlay
    };
  };

  handlePowerCards = (value) => {
    if (value === "peak") {
      const cards = this.state[this.state.turnToPlay + 's'];
      cards.forEach((c) => (c.peakable = true));
      this.setState({ [this.state.turnToPlay + 's']: cards });
    } else if (value === "draw2") {
      this.setState({ turnCounter: 1 });
    } else {
      //alert("swap");
    }
  };

  removePeakable = () => {
    const cards = this.state[this.state.turnToPlay + 's'];
      cards.forEach((c) => (c.peakable = false));
      this.setState({ [this.state.turnToPlay + 's']: cards });
  };

  getScore(player) {
    return this.state[player].reduce((i, c) => {
      const value = c.value <= 9 ? c.value : 9;
      return i + value;
    }, 0);
  }
  startGame() {
    this.cards = this.setupAllCards();
    this.setState({
      gameOver: false,
      ...this.getSeparatedCards(),
    });
  }

  handleBtnClick = () => {
    if (this.state.gameOver) {
      return this.startGame();
    }
    var audio = document.getElementById("audio");
    audio.play();

    setTimeout(() => {
      const humanCards = [...this.state.humanCards];
      humanCards.forEach((c) => (c.peakable = false));
      this.setState({ gameOver: true, humanCards });
    }, 3000);
  };

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
    let playerCards = [...this.state[this.state.turnToPlay + 's']];
    const disgardPile = [...this.state.discardCard];
    const pickPile = [...this.state.pileCards];

    playerCards.forEach((c) => (c.peakable = false));

    const insertcardAtIndex = playerCards.findIndex(
      (c) => c.id === cardToDiscard.id
    );

    if (cardToAdd.type === cardTypes.pickingPile) {
      // Picked from picking pile
      pickPile.pop();
    } else if (cardToAdd.type === cardTypes.discardedPile) {
      // took from disgard pile
      disgardPile.pop();
    }

    if (
      cardToAdd.type === cardTypes.pickingPile &&
      cardToDiscard.type !== cardTypes[this.state.turnToPlay]
    ) {
      cardToAdd.type = cardTypes.discardedPile;
      disgardPile.push(cardToAdd);
      let turnToPlay = this.state.turnToPlay;
      let newCount = null;
      console.log(this.state.turnCounter)
      if(this.state.turnCounter && this.state.turnCounter <= 2 ){
        newCount =  this.state.turnCounter + 1
      } else {
        turnToPlay = turnToPlay === 'humanCard' ? 'computerCard' : 'humanCard'
      }
      return this.setState({
        [playerCards]: playerCards,
        discardCard: disgardPile,
        pileCards: pickPile,
        turnToPlay,
        turnCounter: newCount
      });
    } else {
      disgardPile.push(cardToDiscard);
      cardToDiscard.type = cardTypes.discardedPile;
    }
    playerCards[insertcardAtIndex] = cardToAdd;
    cardToAdd.type = cardTypes[this.state.turnToPlay];
    
    const turnToPlay = this.state.turnToPlay === 'humanCard' ? 'computerCard' : 'humanCard'
    this.setState({
      [this.state.turnToPlay + 's']: playerCards,
      discardCard: disgardPile,
      pileCards: pickPile,
      turnToPlay
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
    const btnTxet = this.state.gameOver ? "New Game" : "Rat-Tat-Cat";
    return (
      <DndProvider backend={Backend}>
        <CardContext.Provider value={this.getContextValue()}>
          <div className="board">
            <Player cards={this.state.computerCards} />
            <div className="actions">
              {this.state.gameOver ? (
                <ScoreBoard
                  human={this.getScore("humanCards")}
                  computer={this.getScore("computerCards")}
                />
              ) : (
                <div className="piles">
                  <Deck cards={this.state.pileCards} />
                  <Deck cards={this.state.discardCard} />
                </div>
              )}
              <button onClick={this.handleBtnClick} className="end-game">
                <audio
                  id="audio"
                  src={require("../../audio/rat-a.mp3")}
                ></audio>
                {btnTxet}
              </button>
            </div>
            <Player cards={this.state.humanCards} />
          </div>
        </CardContext.Provider>
      </DndProvider>
    );
  }
}
