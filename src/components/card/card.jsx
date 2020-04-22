import React, { useContext, useState } from "react";
import { CardContext } from "../board/board";
import "./card.scss";
import { useDrop, useDrag } from "react-dnd";
import { cardTypes } from "../board/board";

export const Card = (props) => {
  const getRef = (card) => {
    if (
      card.type === cardTypes.humanCard ||
      (card.type === cardTypes.discardedPile && isDragging) 
    )
      return drop;
    else {
      return dragRef;
    }
  };
  const peak = () => {
    if (!card.peakable && card.type !== "pickingPile") {
      return;
    }
    setPeaking(true);
    if (!card.peakable) return;
    card.peakable = false;
    setTimeout((x) => setPeaking(false), 2000);
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
      if (
        card.type !== cardTypes.discardedPile &&
        card.type !== cardTypes.humanCard
      )
        return alert("Only drop in to your pile");
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

  const className = card.generateClasses();

  const image = card.type === "discardedPile" || peaking ? card.value : "back";
  let imageUrl = require(`../../../public/assets/images/${image}.jpg`);
  const divStyle = {
    backgroundImage: "url(" + imageUrl + ")",
  };

  return (
    <div
      ref={getRef(card)}
      style={divStyle}
      onClick={peak}
      className={className}
    ></div>
  );
};
