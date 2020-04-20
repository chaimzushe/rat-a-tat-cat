import React from "react";
import {CardStrip} from "../CardStrip/CardStrip";

export const ComputerPlayer = (props) => {

   return <CardStrip player="computerCards" cards={props.cards} />;
};
