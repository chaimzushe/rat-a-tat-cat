import React from "react";
import {CardStrip} from "../CardStrip/CardStrip";

export const Player = (props) => {
   return <CardStrip player="humanCards" cards={props.cards} />;
};