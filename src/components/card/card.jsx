import React from 'react';
import "./card.scss";


export class Card extends React.Component {

    constructor(props){
        super();
        this.imageUrl = props;
    }

    render(){        
        const url = this.props.show ? this.props.card:  "back";
        return (
            <img   className="card" src={require('../../../public/assets/images/' + url + '.jpg')} />      
        );
    }
}
