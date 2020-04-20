import React from 'react';

import './deck.scss';

import {Card} from "../card/card"

export const Deck = props => {
    return (<ul className="deck">
        {props.cards.map( (c,i) => {
          return  <Card index={i} key={i} card={c}/>
        })}
    </ul>)
}