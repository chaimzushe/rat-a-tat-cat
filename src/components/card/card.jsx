import React from 'react';
import "./card.scss";


export class Card extends React.Component {

    constructor(props){
        super();
        this.state = {
            card: props.card
        }
    }

    flipCard = () => {
        if(!this.props.card.canPeak) return;
        this.setState({
           card: {...this.state.card, show: true}
        });
        setTimeout( x => {
            this.setState({
                card: {...this.state.card, show: false}
             });
        }, 1000)
    }
    render(){   
        let {card} = this.state;   
        
        let className = "card"
        if(card.canPeak) {
            className += " card--flipable"
        }
        
        const url = card.show ? card.card:  "back";
        let baseUrl = require(`../../../public/assets/images/${url}.jpg`)
        const divStyle = {
            backgroundImage: 'url(' + baseUrl + ')'
        }

        return (
            <div style={divStyle} onClick={this.flipCard} className={className}>
            </div>
            
        );
    }
}
