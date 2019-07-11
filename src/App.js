import './App.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';

import { addScore, getCards, getScore, resetSelectedCard, selectedCard } from './actions/cardaction';
import Analytics from './components/analytics';
import CardDisaply from './components/carddisplay';
import { duplicateCards, isFlush, isStraight } from './helper/pokerhand';
import scoreConfig from './score.config';

class App extends Component {
  constructor() {
    super();
    this.state = {
      selectedCardCount: 0,
      ishand1: true,
      hand: [],
      valuesArray: [],
      suitsArray: []
    }
  }
  componentDidMount() {
    this.props.getCards();
    this.props.getScore();
  }
  onCardSelect = (e) => {
    if (this.state.selectedCardCount < 5) {
      const id = e.currentTarget.attributes.getNamedItem('data-classid').value;
      const selectedCardCount = this.state.selectedCardCount + 1;
      this.state.hand.push(e.currentTarget.id);
      this.setState({ selectedCardCount });
      this.props.selectedCard(id);
      if(this.state.selectedCardCount === 4) {
        this.convertHand();
        let score = 0;
        switch (duplicateCards(this.state.valuesArray)) {
          case "2":
            // resultString = "1 Pair";
            break;
          case "22":
            score = score + scoreConfig.two_pairs;
  
            break;
          case "3":
            score = score + scoreConfig.three_of_a_kind;
            break;
          case "23":
          case "32":
            score = score + scoreConfig.full_house;
            break;
          case "4":
            score = score + scoreConfig.four_of_a_kind;
            break;
          case "5":
            // resultString = "5 of a Kind";
            break;
          default:
            if (isStraight(this.state.valuesArray)) {
              score = score + scoreConfig.straight;
            }
            break;
        }
        if (isFlush(this.state.suitsArray) && score === 0) {
          score = score + scoreConfig.flush;
        }
        const data ={
          score,
          iteration:1
        }
        this.props.addScore(data);
        this.setState({ selectedCardCount: 0 });
        this.props.resetSelectedCard();
        toastr.success('completed !');
     
      }
    } 
  }
  convertHand() {
    const valuesArray = [];
    const suitsArray = [];
    for (var i = 0; i < 5; i++) {
      valuesArray[i] = this.state.hand[i] % 13;
      suitsArray[i] = Math.floor(this.state.hand[i] / 13);
    }
    this.setState({ valuesArray, suitsArray });
  }
  render() {
    return (
      <div className="App">
        <h2>Poker App</h2>
        <div className="app_container">
          <div className="analytics">
            <Analytics scores={this.props.scores}/>
          </div>
          <div className="carddispaly">
            <CardDisaply cards={this.props.cards} onCardSelect={this.onCardSelect} />
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    cards: state.cardReducer.cards,
    scores: state.cardReducer.scores
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getCards: bindActionCreators(getCards, dispatch),
    selectedCard: bindActionCreators(selectedCard, dispatch),
    resetSelectedCard: bindActionCreators(resetSelectedCard, dispatch),
    addScore: bindActionCreators(addScore, dispatch),
    getScore: bindActionCreators(getScore, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

