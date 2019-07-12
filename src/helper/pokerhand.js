export function duplicateCards(valuesArray) {
    var occurrencesFound = [];
    var result = "";
    for (var i = 0; i < valuesArray.length; i++) {
        var occurrences = occurrencesOf(valuesArray[i], valuesArray);
        if (occurrences > 1 && occurrencesFound.indexOf(valuesArray[i]) === -1) {
            result += occurrences;
            occurrencesFound.push(valuesArray[i]);
        }
    }
    return result;
}
export function isStraight(valuesArray) {
    var lowest = getLowest(valuesArray);
    for (var i = 1; i < 5; i++) {
        if (occurrencesOf(lowest + i, valuesArray) !== 1) {
            return false
        }
    }
    return true;
}
export function isAceStraight(valuesArray) {
    var lowest = 9;
    for (var i = 1; i < 4; i++) {
        if (occurrencesOf(lowest + i, valuesArray) !== 1) {
            return false
        }
    }
    return occurrencesOf(1) === 0;
}
export function isFlush(suitsArray) {
    for (var i = 0; i < 4; i++) {
        if (suitsArray[i] !== suitsArray[i + 1]) {
            return false;
        }
    }
    return true;
}
export function getIndexOfCardBasedOnClass(name) {
    let returnIndex = 0;
    switch (name) {
        case 'ace':
            returnIndex = 0;
            break;
        case 'two':
            returnIndex = 1;
            break;
        case 'three':
            returnIndex = 2;
            break;
        case 'four':
            returnIndex = 3;
            break;
        case 'five':
            returnIndex = 4;
            break;
        case 'six':
            returnIndex = 5;
            break;
        case 'seven':
            returnIndex = 6;
            break;
        case 'eight':
            returnIndex = 7;
            break;
        case 'nine':
            returnIndex = 8;
            break;
        case 'ten':
            returnIndex = 9;
            break;
        case 'jack':
            returnIndex = 10;
            break;
        case 'queen':
            returnIndex = 10;
            break;
        case 'king':
            returnIndex = 12;
            break;
         default:
             break;
    }
    return returnIndex;
}
function getLowest(valuesArray) {
    var min = 12;
    for (var i = 0; i < valuesArray.length; i++) {
        min = Math.min(min, valuesArray[i]);
    }
    return min;
}
function occurrencesOf(n, valuesArray) {
    var count = 0;
    var index = 0;
    do {
        index = valuesArray.indexOf(n, index) + 1;
        if (index === 0) {
            break;
        }
        else {
            count++;
        }
    } while (index < valuesArray.length);
    return count;
} 