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
      let cardClass = `cell ${item.rank} ${item.suite}`;
      if (index === 5 || sevenIndex === 7) { 
        sevenIndex = 0;
        sevenIndex = sevenIndex + 1;
        return (
          <>
            <br />
            <div key={item._id} className="cell">
              <div className={cardClass} />
            </div>
          </>
        );
      }
      if(sevenIndex > 0) {
        sevenIndex = sevenIndex + 1;
      }
      return (
        <div key={item._id} className="cell">
          <div className={cardClass} />
        </div>
      );
    });
  };
  render() {
    return (
      <div className="pokercard">
        {this.renderCard()}
      </div>
    );
  }
}
