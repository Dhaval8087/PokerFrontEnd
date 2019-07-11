import { CARD_SELECT, GET_CARDS, GET_SCORES, RESET_SELECTED_CARD } from '../constants/action-types';

const getInitialState = () => ({
    cards: []
});
const cardReducer = (state = getInitialState(), action) => {
    switch (action.type) {
        case GET_CARDS:
            return { ...state, cards: action.cards };
        case CARD_SELECT:
            let selectedCards = [...state.cards];
            selectedCards.forEach(item => {
                if (item._id === action.id)
                    item.selected = true;
            });
            return { ...state, cards: selectedCards };
        case RESET_SELECTED_CARD:
            let cards = [...state.cards];
            cards.forEach(item => {
                item.selected = '';
            });
            return { ...state, cards: cards };
        case GET_SCORES:
            return { ...state, scores: action.scores };
        default:
            return state;
    }
}
export default cardReducer;