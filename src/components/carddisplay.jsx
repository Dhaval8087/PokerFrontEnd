import './carddisplay.scss';

import React, { Component } from 'react';

export default class CardDisplay extends Component {
  constructor() {
    super()
    this.state = {
      cards: [],
    }
  }
  renderCard = () => {
    const cards = this.props.cards;
    let sevenIndex = 0;
    if (!cards) return [];
    return cards.map((item, index) => {
      let cardClass
      if (item.selected) {
        cardClass = `cell selected ${item.rank} ${item.suite}`;
      } else {
        cardClass = `cell ${item.rank} ${item.suite}`;
      }
      if (index === 5 || sevenIndex === 7) { 
        sevenIndex = 0;
        sevenIndex = sevenIndex + 1;
        return (
          <>
            <br />
            <div key={item._id} className="cell" id={item.index} data-classid={item._id} onClick={this.props.onCardSelect}>
              <div className={cardClass} />
            </div>
          </>
        );
      }
      if(sevenIndex > 0) {
        sevenIndex = sevenIndex + 1;
      }
      return (
        <div key={item._id} className="cell" id={item.index} data-classid={item._id} onClick={this.props.onCardSelect}>
          <div className={cardClass} />
        </div>
      );
    });
  };
  render() {
    return (
      <div className="card">
        {this.renderCard()}
      </div>
    );
  }
}
