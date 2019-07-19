import React, { Component } from 'react'
import './dashboard.scss';
import { duplicateCards, getIndexOfCardBasedOnClass, isStraight } from '../../utils/pokerhand';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addScore, getCards, getScore, resetSelectedCard, selectedCard } from '../../actions/cardaction';
import scoreConfig from '../../score.config';
import Analytics from '../analytics/analytics';
import CardDisaply from '../carddisplay/carddisaply';
class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            selectedCardCount: 0,
            ishand1: true,
            hand: [],
            valuesArray: [],
            suitsArray: [],
            scoreArray: []
        }
    }
    componentDidMount() {
        this.props.getCards();
        this.props.getScore();
    }

    onCalculate = () => {
        const cards = this.props.cards;
        let firstRowScore = [];
        for (let i = 0; i < cards.length; i++) {
            if (i !== 0 && i % 5 === 0) {
                this.onPushScoreOnArry(firstRowScore);
                firstRowScore = [];

            }
            firstRowScore.push(getIndexOfCardBasedOnClass(cards[i].rank));
        }

        const data = {
            details: this.state.scoreArray,
            iteration: 1
        }
        this.props.addScore(data);
        this.setState({ scoreArray: [], valuesArray: [] });
    }
    onPushScoreOnArry = (rowScore) => {
        const score = this.calculateScore(rowScore);
        if (score.score > 0) {
            this.state.scoreArray.push(score);
        }
    }

    calculateScore = (valuesArray) => {
        let resultstring = '';
        let score = 0;
        switch (duplicateCards(valuesArray)) {
            case "2":
                resultstring = "One Pair";
                score = score + scoreConfig.one_pair;
                break;
            case "22":
                resultstring = "Two Pair";
                score = score + scoreConfig.two_pairs;
                break;
            case "3":
                resultstring = "Three of a kind";
                score = score + scoreConfig.three_of_a_kind;
                break;
            case "23":
            case "32":
                resultstring = "Full House";
                score = score + scoreConfig.full_house;
                break;
            case "4":
                resultstring = "Four of a kind";
                score = score + scoreConfig.four_of_a_kind;
                break;
            case "5":
                resultstring = "Royal Flush";
                score = score + scoreConfig.royal_flush;
                break;
            default:
                if (isStraight(valuesArray)) {
                    resultstring = "Straight";
                    score = score + scoreConfig.straight;
                }
                break;
        }
        return {
            resultstring,
            score
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
    onNextRound = () => {
        this.onCalculate();
        this.props.getCards();
    }
    render() {
        return (
            <div>
                <h2>Poker App</h2>
                <div className="dashboard_container">
                    <div className="analytics">
                        <button className="btn btn-primary mb-2" onClick={this.onNextRound}>Shuffle</button>
                        <Analytics  scores={this.props.scores}/>
                    </div>
                    <div className="carddispaly">
                        <CardDisaply cards={this.props.cards} />
                    </div>
                </div>
            </div>
        )
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
  )(Dashboard);
