import React, { useContext, useState } from "react";
import { CardContext } from "../board/board";
import "./card.scss";
import { useDrop, useDrag } from "react-dnd";
import { cardTypes } from "../board/board";


export const Card = (props) => {

 
  const getRef = (card) => {
    
    if (
      card.type === cardTypes.humanCard ||
      (card.type === cardTypes.discardedPile) 
    )
      return drop;
    else if(card.type === cardTypes.discardedPile || card.type === cardTypes.pickingPile){
      return dragRef;
    }
  };
  const peak = () => {
    if (!card.peakable && card.type !== cardTypes.pickingPile) {
      return;
    }
    setPeaking(true);
    if(card.type === cardTypes.pickingPile){
      if(['peak', 'draw2', 'swap'].includes(card.value) ) {
        context.handlePowerCards(card.value);
      }
      
    }
    if (!card.peakable) return;
    if(context.humanCards.filter(c => c.peakable).length > 2) {
      context.removePeakable()
    } else{
      card.peakable = false;
    }
    setTimeout((x) => setPeaking(false), 1000);
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

  let className = card.generateClasses();
  if(hovered) {
    className += ' hovered';
  }

  if(highlighted) {
    className += ' highlighted';
  }

  const image = ((card.type === "discardedPile") || peaking || context.gameOver) ? card.value : 'back';
  let imageUrl = require(`../../../public/assets/images/${image}.jpg`);
  const divStyle = {
    backgroundImage: "url(" + imageUrl + ")",
    opacity: isDragging ? 0 : 1
  };

  return (
    <div
      ref={getRef(card)}
      style={(props.topOfPile || card.type === cardTypes.humanCard || card.type === cardTypes.computerCard) ? divStyle : {}}
      onClick={peak}
      className={className}
    ></div>
  );
};
