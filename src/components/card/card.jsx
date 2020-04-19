import React from 'react';
import "./card.scss";
export default class Card extends React.Component {

    constructor({imageUrl}){
        super();
        this.imageUrl = imageUrl;
    }

    render(){
        return <div style={{background: "red"}} className="card">
           
        </div>

    }
}
