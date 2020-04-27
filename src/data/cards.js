import Card from "../models/card";
import { cardTypes } from "./cardTypes";
import {shuffleValues} from "../util/arrayUtil";
const values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "draw2", "peak", "swap"];
let CARDS = [];





const getCardType = (id) => {
  if (id <= 4) {
    return cardTypes.humanCard;
  } else if (id <= 8) {
    return cardTypes.computerCard;
  } else if (id === 9) {
    return cardTypes.discardedPile;
  } else {
    return cardTypes.pickingPile;
  }
};

const generateCard = (value) => {
  const id = CARDS.length + 1;
  const cardType = getCardType(id);
  const canPeak = id === 1 || id === 4;
  return new Card(id, value, cardType, canPeak);
};

const createCard = (value) => {
  let amountOfCardsToAdd = 4;
  if (value === 9) {
    amountOfCardsToAdd = 9;
  } else if (isNaN(value)) {
    // is a power card..
    amountOfCardsToAdd = 3;
  }
  Array.from({ length: amountOfCardsToAdd }, (_) => {
    const card = generateCard(value);
    CARDS.push(card);
  });
};

values.forEach(createCard);
CARDS =  shuffleValues(CARDS);
const dealedCards = {
  computerCards: CARDS.filter((c) => c.type === cardTypes.computerCard),
  humanCards: CARDS.filter((c) => c.type === cardTypes.humanCard),
  pileCards: CARDS.filter((c) => c.type === cardTypes.pickingPile),
  discardCard: CARDS.filter((c) => c.type === cardTypes.discardedPile),
};
export default dealedCards;
