import React from 'react';

import './deck.scss';

import {Card} from "../card/card"

export const Deck = props => {
  props.cards[props.cards.length -1].isTopOfPile = true;
    return (<ul className="deck">
        {props.cards.map( (c,i) => {
          return  <Card player="pileCards" index={i} key={i} card={c}/>
        })}
    </ul>)
}