import React from "react";

import "./deck.scss";

import { Card } from "../card/card";

export const Deck = (props) => {
  return (
    <ul className="deck">
      {props.cards.map((c, i) => {
        return <Card key={i} topOfPile={i === props.cards.length -1 || i === props.cards.length -2} className="card-wrap" card={c} />;
      })}
    </ul>
  );
};
