// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';


// let playerCards = [...this.state[this.state.turnToPlay + "s"]];
//     const disgardPile = [...this.state.discardCard];
//     const pickPile = [...this.state.pileCards];

//     playerCards.forEach((c) => (c.peakable = false));

//     const insertcardAtIndex = playerCards.findIndex(
//       (c) => c.id === cardToDiscard.id
//     );

//     if (cardToAdd.type === cardTypes.pickingPile) {
//       // Picked from picking pile
//       pickPile.pop();
//     } else if (cardToAdd.type === cardTypes.discardedPile) {
//       // took from disgard pile
//       disgardPile.pop();
//     }

//     if (
//       cardToAdd.type === cardTypes.pickingPile &&
//       cardToDiscard.type !== cardTypes[this.state.turnToPlay]
//     ) {
//       cardToAdd.type = cardTypes.discardedPile;
//       disgardPile.push(cardToAdd);
//       let turnToPlay = this.state.turnToPlay;
//       let newCount = null;
//       console.log(this.state.turnCounter);
//       if (this.state.turnCounter && this.state.turnCounter <= 2) {
//         newCount = this.state.turnCounter + 1;
//       } else {
//         turnToPlay = turnToPlay === "humanCard" ? "computerCard" : "humanCard";
//       }
//       return this.setState({
//         [playerCards]: playerCards,
//         discardCard: disgardPile,
//         pileCards: pickPile,
//         turnToPlay,
//         turnCounter: newCount,
//       });
//     } else {
//       disgardPile.push(cardToDiscard);
//       cardToDiscard.type = cardTypes.discardedPile;
//     }
//     playerCards[insertcardAtIndex] = cardToAdd;
//     cardToAdd.type = cardTypes[this.state.turnToPlay];

//     const turnToPlay =
//       this.state.turnToPlay === "humanCard" ? "computerCard" : "humanCard";
//     this.setState({
//       [this.state.turnToPlay + "s"]: playerCards,
//       discardCard: disgardPile,
//       pileCards: pickPile,
//       turnToPlay,
//     });