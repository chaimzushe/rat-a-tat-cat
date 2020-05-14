import React, { useContext, useState, useDebugValue } from "react";
import { CardContext } from "../../context/cards-context";
import "./card.scss";
import { useDrop, useDrag } from "react-dnd";
import { cardTypes } from "../../data/cardTypes";

export const Card = (props) => {
  const getRef = (card) => {
    if (card.type === cardTypes[context.turnToPlay]) return drop;
    else if (
      card.type === cardTypes.discardedPile ||
      card.type === cardTypes.pickingPile ||
      card.swapable
    ) {
      return dragRef;
    }
  };

  const peak = () => {
    if (card.type === cardTypes.pickingPile) {
      return setPeaking(true);
    } else if (card.peakable) {
      setPeaking(true);
      context.removePowerProperties(card);
      console.log("passed conect thing");
      card.peakable = false;
      setTimeout((x) => setPeaking(false), 1000);
    }
  };

  const context = useContext(CardContext);

  let { card } = props;

  const [peaking, setPeaking] = useState(false);
  const [{ isDragging }, dragRef] = useDrag({
    item: {
      type: "card",
      card,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [{ hovered, highlighted }, drop] = useDrop({
    accept: "card",
    drop: (item, monitor) => {
      context.addCard(item.card, card);
    },
    hover: (item, monitor) => {},
    collect: (monitor) => {
      return {
        hovered: monitor.isOver(),
        highlighted: monitor.canDrop(),
      };
    },
  });

  let className = card.generateClasses();
  if (hovered) {
    className += " hovered";
  }

  if (highlighted) {
    className += " highlighted";
  }
  if (
    (card.type === context.turnToPlay ||
      card.type === cardTypes.discardedPile ||
      card.swapable ||
      card.type === cardTypes.pickingPile) &&
    !context.gameOver
  ) {
    className += " candrop";
  }

  const image =
    card.type === "discardedPile" || peaking || context.gameOver || card.show
      ? card.value
      : "back";
  let imageUrl = require(`../../../public/assets/images/${image}.jpg`);
  const divStyle = {
    backgroundImage: "url(" + imageUrl + ")",
    opacity: isDragging ? 0 : 1,
  };
 
  const cardStyle =
    props.topOfPile ||
    card.type === cardTypes.humanCard ||
    card.type === cardTypes.computerCard
      ? divStyle
      : {};

  return (
    <div
      ref={getRef(card)}
      style={cardStyle}
      onClick={peak}
      className={className}
    ></div>
  );
};
