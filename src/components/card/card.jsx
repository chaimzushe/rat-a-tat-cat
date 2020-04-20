import React from 'react';
import "./card.scss";


export class Card extends React.Component {

    constructor(props){
        super();
    }

    render(){      
 
        const url = this.props.card.show ? this.props.card.card:  "back";
        return (
            <img   className="card" src={require('../../../public/assets/images/' + url + '.jpg')} />      
        );
    }
}
