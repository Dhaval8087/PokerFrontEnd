import axios from 'axios';

import config from '../config';
import { CARD_SELECT, GET_CARDS, GET_SCORES, RESET_SELECTED_CARD } from '../constants/action-types';

export const getCardsList = cards => ({
    type: GET_CARDS,
    cards
});
export const setSelectdCard = id => ({
    type: CARD_SELECT,
    id
});
export const getScoreList = scores =>({
    type: GET_SCORES,
    scores
})

export const getCards = () => {
    return (dispatch) => {
        const url = `${config.API_URL}/cards`;
        axios.get(url)
            .then((response) => {
                if (response.data) {
                    dispatch(getCardsList(response.data))
                }
                else {
                    dispatch(getCardsList([]));
                }
            }).catch(error => {
                console.error(error);
            });
    }
}
export const selectedCard = (id) => {
    return (dispatch) => {
        dispatch(setSelectdCard(id));
    }
}
export const resetSelectedCard = () => {
    return (dispatch) => {
        dispatch(({ type: RESET_SELECTED_CARD }))
    }
}
export const addScore = (data) => {
    return (dispatch) => {
        const url = `${config.API_URL}/cards/score/add`;
        axios.post(url, data)
            .then((response) => {
                dispatch(getScore());
                dispatch(getCards());
            }).catch(error => {
                console.error(error);
            });
    }
}
export const getScore =() =>{
    return (dispatch) =>{
        const url = `${config.API_URL}/cards/score/get`;
        axios.get(url)
            .then((response) => {
                dispatch(getScoreList(response.data));
            }).catch(error => {
                console.error(error);
            });
    }
}