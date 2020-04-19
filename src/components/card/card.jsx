import React from 'react';
import "./card.scss";


export class Card extends React.Component {

    constructor(props){
        super();
        this.imageUrl = props;
    }

    render(){        
        
        return (
            <img   className="card" src={require('../../../public/assets/images/' + this.props.card + '.jpg')} />      
        );
    }
}
