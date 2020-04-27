import React from "react";
import Backend from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { CardContext } from "../../context/cards-context";
import { Player } from "../Player/Player";
import { Deck } from "../deck/deck";
import dealedCards from "../../data/cards";
import { ScoreBoard } from "../ScoreBoard/ScoreBoard";
import { cardTypes } from "../../data/cardTypes";
import { calculateSum } from "../../util/arrayUtil";

import "./board.scss";

export default class Board extends React.Component {
  constructor() {
    super();
    this.state = {
      ...dealedCards,
      gameOver: false,
      turnToPlay: "humanCard",
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
      turnToPlay: this.state.turnToPlay,
    };
  };

  handlePowerCards = (value) => {
    if (value === "peak") {
      const cards = this.state[this.state.turnToPlay + "s"];
      cards.forEach((c) => (c.peakable = true));
      this.setState({ [this.state.turnToPlay + "s"]: cards });
    } else if (value === "draw2") {
      this.setState({ turnCounter: 1 });
    } else {
      //alert("swap");
    }
  };

  removePeakable = () => {
    const cards = this.state[this.state.turnToPlay + "s"];
    cards.forEach((c) => (c.peakable = false));
    this.setState({ [this.state.turnToPlay + "s"]: cards });
  };

  startGame() {
    const state = {
      ...dealedCards,
      gameOver: false,
      turnToPlay: "humanCard",
      turnCounter: null,
    };
    this.setState(state);
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

  addCard = (cardToAdd, cardToDiscard) => {
    let playerCards = [...this.state[this.state.turnToPlay + "s"]];
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
      console.log(this.state.turnCounter);
      if (this.state.turnCounter && this.state.turnCounter <= 2) {
        newCount = this.state.turnCounter + 1;
      } else {
        turnToPlay = turnToPlay === "humanCard" ? "computerCard" : "humanCard";
      }
      return this.setState({
        [playerCards]: playerCards,
        discardCard: disgardPile,
        pileCards: pickPile,
        turnToPlay,
        turnCounter: newCount,
      });
    } else {
      disgardPile.push(cardToDiscard);
      cardToDiscard.type = cardTypes.discardedPile;
    }
    playerCards[insertcardAtIndex] = cardToAdd;
    cardToAdd.type = cardTypes[this.state.turnToPlay];

    const turnToPlay =
      this.state.turnToPlay === "humanCard" ? "computerCard" : "humanCard";
    this.setState({
      [this.state.turnToPlay + "s"]: playerCards,
      discardCard: disgardPile,
      pileCards: pickPile,
      turnToPlay,
    });
  };

  getCenterOfBoard = (_) => {
    return this.state.gameOver ? (
      <ScoreBoard
        human={calculateSum(this.state.humanCards)}
        computer={calculateSum(this.state.computerCards)}
      />
    ) : (
      <div className="piles">
        <Deck cards={this.state.pileCards} />
        <Deck cards={this.state.discardCard} />
      </div>
    );
  };

  render() {
    const centerBoard = this.getCenterOfBoard();
    const btnTxet = this.state.gameOver ? "New Game" : "Rat-Tat-Cat";
    return (
      <DndProvider backend={Backend}>
        <CardContext.Provider value={this.getContextValue()}>
          <div className="board">
            <Player cards={this.state.computerCards} />
            <div className="actions">
            {centerBoard}
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
