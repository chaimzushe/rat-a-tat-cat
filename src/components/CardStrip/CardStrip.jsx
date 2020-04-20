import React from "react";
import {Card} from "../card/card";
import "./CardStrip.scss"

export const CardStrip = (props) => {
  return (
    <div className="card-row">
      <ul className="cards">
        {props.cards.map((c,i) => <Card player={props.player} index={i} key={i} card={c} />)}
      </ul>
    </div>
  );
};
