import React, { useContext } from "react";
import { CardContext } from "../../context/cards-context";
import "./deck.scss";

import { Card } from "../card/card";
import { useDrop, useDrag } from "react-dnd";

export const Deck = (props) => {
  const [{ hovered }, drop] = useDrop({
    accept: "card",
    drop: (item, monitor) => {
      context.addCard(item.card, props.cards[props.cards.length - 1]);
    },
    hover: (item, monitor) => {},
    collect: (monitor) => {
      return {
        hovered: monitor.isOver(),
        highlighted: monitor.canDrop(),
      };
    },
  });
  let className = "deck";
  if (hovered) className += " highlite";
  const context = useContext(CardContext);
  return (
    <ul ref={drop} className={className}>
      {props.cards.map((c, i) => {
        return (
          <Card
            key={i}
            topOfPile={
              i === props.cards.length - 1 || i === props.cards.length - 2
            }
            className="card-wrap"
            card={c}
          />
        );
      })}
    </ul>
  );
};
