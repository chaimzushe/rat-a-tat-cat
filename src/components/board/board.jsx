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
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import "./board.scss";

export default class Board extends React.Component {
  get discardedPile() {
    return [...this.state.discardCard];
  }

  get pickingPile() {
    return [...this.state.pileCards];
  }

  get humanCard() {
    return [...this.state.humanCards];
  }

  get computerCard() {
    return [...this.state.computerCards];
  }

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
      turnToPlay: this.state.turnToPlay,
      removePowerProperties: this.removePowerProperties,
    };
  };

  removePowerProperties = (card) => {
    const cards =
      card.type === cardTypes.humanCard ? this.humanCard : this.computerCard;
    const name = `${this.state.turnToPlay}s`;
    const playersCards = { name, cards };
    console.log(playersCards);
    if (playersCards.cards.every((c) => c.peakable)) {
      this.setPowerCards(playersCards.cards, ["peakable"], false);
    }
    this.setState({[card.type]: playersCards.cards});
  };

  handlePeek(playersCards) {
    // all cards are now peakable
    playersCards.forEach((c) => (c.peakable = true));
  }

  handleSwap(playersCards) {
    playersCards.forEach((c) => (c.swapable = true));
  }

  getTurnToPlay(counter) {
    const nextTurn =
      this.state.turnToPlay === "humanCard" ? "computerCard" : "humanCard";
    if (!counter.times || counter.times >= 3) {
      counter.times = null;
      return nextTurn;
    } else {
      counter.times += 1;
      return this.state.turnToPlay;
    }
  }

  handlePowerCards = (value, playersCards, oppenentsCards, counter) => {
    switch (value) {
      case "peak":
        return this.handlePeek(playersCards.cards);
      case "swap":
        return this.handleSwap(oppenentsCards.cards);
      case "draw2":
        return (counter.times = 1);
    }
  };

  isPoewerCard(value) {
    return isNaN(value);
  }

  disgardCard = (draggedCard, droppedOn, playersCards, otherPlayersCards) => {
    const turnCounter = { times: this.state.turnCounter };

    if (this.isPoewerCard(draggedCard.value)) {
      this.handlePowerCards(
        draggedCard.value,
        playersCards,
        otherPlayersCards,
        turnCounter
      );
    }

    draggedCard.type = cardTypes.discardedPile;
    const discardedPile = this.discardedPile;
    const pickingPile = this.pickingPile.filter((c) => c.id !== draggedCard.id);
    discardedPile.push(draggedCard);
    const turnToPlay = this.getTurnToPlay(turnCounter);

    this.setState({
      discardCard: discardedPile,
      pileCards: pickingPile,
      [playersCards.name]: playersCards.cards,
      [otherPlayersCards.name]: otherPlayersCards.cards,
      turnCounter: turnCounter.times,
      turnToPlay,
    });
  };

  startGame() {
    window.location.reload();
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

  addCardToPlayersCards = (
    draggedCard,
    droppedOn,
    playersCards,
    otherPlayersCards
  ) => {
    if (this.isPoewerCard(draggedCard.value)) {
      return alert("can't add power cards to deck");
    }
    const nextTurn =
      this.state.turnToPlay === "humanCard" ? "computerCard" : "humanCard";
    droppedOn.type = cardTypes.discardedPile;
    const discardedPile = this.discardedPile;
    const pickingPile = this.pickingPile.filter((c) => c.id !== draggedCard.id);
    discardedPile.push(droppedOn);
    const insertcardAtIndex = playersCards.cards.findIndex(
      (c) => c.id === droppedOn.id
    );
    playersCards.cards[insertcardAtIndex] = draggedCard;
    draggedCard.type = playersCards.name.slice(0, -1);

    this.setState({
      discardCard: discardedPile,
      pileCards: pickingPile,
      [playersCards.name]: playersCards.cards,
      [otherPlayersCards.name]: otherPlayersCards.cards,
      turnCounter: null,
      turnToPlay: nextTurn,
    });
  };

  setPowerCards = (cards, properties, value, card = null) => {
    cards.forEach((c) => {
      for (let property of properties) c[property] = value;
    });
  };

  addCard = (draggedCard, droppedOn) => {
    const { discardedPile, pickingPile, humanCard, computerCard } = cardTypes;
    if (draggedCard.type === droppedOn.type) return;
    const playersCards = {
      name: `${this.state.turnToPlay}s`,
      cards: this[this.state.turnToPlay],
    };
    const opponentTurn =
      this.state.turnToPlay === "humanCard" ? "computerCard" : "humanCard";
    const otherPlayersCards = {
      name: `${opponentTurn}s`,
      cards: this[opponentTurn],
    };
    const AllPlayerCards = [...playersCards.cards, ...otherPlayersCards.cards];
    const disgardingCard =
      draggedCard.type === pickingPile && droppedOn.type === discardedPile;

    const replacingCardFromPickPile =
      draggedCard.type === pickingPile &&
      [humanCard, computerCard].includes(droppedOn.type);

    const takingFromDiscardedPile =
      draggedCard.type === discardedPile &&
      [humanCard, computerCard].includes(droppedOn.type);

    this.setPowerCards(AllPlayerCards, ["peakable", "swapable"], false);

    if (disgardingCard) {
      // if player took card from picking and placed it in disgard pile or if player took card from disgard pile and placed it in his deck
      this.disgardCard(draggedCard, droppedOn, playersCards, otherPlayersCards);
    } else if (replacingCardFromPickPile || takingFromDiscardedPile) {
      this.addCardToPlayersCards(
        draggedCard,
        droppedOn,
        playersCards,
        otherPlayersCards
      );
    } else if (true) {
      // player swapped card from other strip via swap power card
    }
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
