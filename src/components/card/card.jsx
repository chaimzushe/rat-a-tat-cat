import React, { useContext } from "react";
import { CardContext } from "../board/board";
import "./card.scss";

export const Card = (props) => {
  const context = useContext(CardContext);
  let { card } = props;

  let className = "card";
  if (card.canPeak) {
    className += " card--flipable";
  }
  if(card.isTopOfPile) {
    className += " card--top-pile";
  }

  const image = card.show ? card.card : "back";
  let imageUrl = require(`../../../public/assets/images/${image}.jpg`);
  const divStyle = {
    backgroundImage: "url(" + imageUrl + ")",
  };

  return (
    <div style={divStyle} onClick={x => context.unpeakCard(props.player, props.index)} className={className}></div>
  );
};
