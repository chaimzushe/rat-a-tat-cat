import React from 'react';

import {Deck} from "../deck/deck"

export const Discarded = props => {
    props.cards.forEach( c => c.show = true);
    return <Deck cards={props.cards}/>
}