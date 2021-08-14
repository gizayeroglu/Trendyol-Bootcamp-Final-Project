import React from 'react';
import { checkSetOfCards, isAnyCardHolderWithoutCards, updateCardDraggable, isValidDrop, getCardHoldersWithCards} from '../../utils/GameUtils';

describe('Game Utils Tests', () => {
    
    describe('checkSetOfCards function tests', () => {

        it('should function return cards without search for a set (A2345678910JQK) if the cards length less than the 13', () => {
            const cards = [
                {symbol: '4', isOpen: false, isDraggable: false, value: 4},
                {symbol: 'A', isOpen: false, isDraggable: false, value: 1},
                {symbol: 'J', isOpen: false, isDraggable: false, value: 11},
                {symbol: '6', isOpen: false, isDraggable: false, value: 6},
                {symbol: '5', isOpen: false, isDraggable: false, value: 5},
                {symbol: 'K', isOpen: true, isDraggable: false, value: 5}
            ];

            const setOfTheCards = checkSetOfCards(cards);
            expect(setOfTheCards).toEqual( {isScore: false, cards: cards});
        })

        it('should function return cards without search for the set if the cards last element is not K', () => {
             const cards = [
                {symbol: '4', isOpen: true, isDraggable: true, value: 4},
                {symbol: 'A', isOpen: true, isDraggable: true, value: 1},
                {symbol: 'J', isOpen: true, isDraggable: true, value: 11},
                {symbol: '6', isOpen: true, isDraggable: true, value: 6},
                {symbol: '5', isOpen: true, isDraggable: true, value: 5},
                {symbol: '4', isOpen: true, isDraggable: true, value: 4},
                {symbol: 'A', isOpen: true, isDraggable: true, value: 1},
                {symbol: 'J', isOpen: true, isDraggable: true, value: 11},
                {symbol: '6', isOpen: true, isDraggable: true, value: 6},
                {symbol: 'A', isOpen: true, isDraggable: true, value: 1},
                {symbol: 'J', isOpen: true, isDraggable: true, value: 11},
                {symbol: '6', isOpen: true, isDraggable: true, value: 6},
                {symbol: '5', isOpen: true, isDraggable: true, value: 5},
                {symbol: 'A', isOpen: true, isDraggable: true, value: 5}
            ];

            const setOfTheCards = checkSetOfCards(cards);
            expect(setOfTheCards).toEqual( {isScore: false, cards: cards});
        })  
        
        it('should function return data without any change if the data has not required set of symbols (A2345678910JQK) ', () => {
            const cards = [
                {symbol: '4', isOpen: true, isDraggable: true, value: 4},
                {symbol: 'A', isOpen: true, isDraggable: true, value: 1},
                {symbol: 'J', isOpen: true, isDraggable: true, value: 11},
                {symbol: '6', isOpen: true, isDraggable: true, value: 6},
                {symbol: '5', isOpen: true, isDraggable: true, value: 5},
                {symbol: '4', isOpen: true, isDraggable: true, value: 4},
                {symbol: 'A', isOpen: true, isDraggable: true, value: 1},
                {symbol: 'J', isOpen: true, isDraggable: true, value: 11},
                {symbol: '6', isOpen: true, isDraggable: true, value: 6},
                {symbol: 'A', isOpen: true, isDraggable: true, value: 1},
                {symbol: 'J', isOpen: true, isDraggable: true, value: 11},
                {symbol: '6', isOpen: true, isDraggable: true, value: 6},
                {symbol: '5', isOpen: true, isDraggable: true, value: 5},
                {symbol: 'K', isOpen: true, isDraggable: true, value: 13}
            ];

            const setOfTheCards = checkSetOfCards(cards);
            expect(setOfTheCards).toEqual( {isScore: false, cards: cards});
        })

        it('should function splice required set (A2345678910JQK) from data if it includes', () => {
            const cards = [
                {symbol: 'A', isOpen: true, isDraggable: true, value: 1},
                {symbol: '2', isOpen: true, isDraggable: true, value: 2},
                {symbol: '3', isOpen: true, isDraggable: true, value: 3},
                {symbol: '4', isOpen: true, isDraggable: true, value: 4},
                {symbol: '5', isOpen: true, isDraggable: true, value: 5},
                {symbol: '6', isOpen: true, isDraggable: true, value: 6},
                {symbol: '7', isOpen: true, isDraggable: true, value: 7},
                {symbol: '8', isOpen: true, isDraggable: true, value: 8},
                {symbol: '9', isOpen: true, isDraggable: true, value: 9},
                {symbol: '10', isOpen: true, isDraggable: true, value: 10},
                {symbol: 'J', isOpen: true, isDraggable: true, value: 11},
                {symbol: 'Q', isOpen: true, isDraggable: true, value: 12},
                {symbol: 'K', isOpen: true, isDraggable: true, value: 13}
            ];

            const setOfTheCards = checkSetOfCards(cards);
            expect(setOfTheCards).toEqual({isScore: true, cards: []});
        })

        it('should set the last cards as open and draggable after splice', () => {
            const cards = [
                {symbol: '5', isOpen: false, isDraggable: false, value: 5},
                {symbol: '4', isOpen: false, isDraggable: false, value: 4},
                {symbol: 'A', isOpen: true, isDraggable: true, value: 1},
                {symbol: '2', isOpen: true, isDraggable: true, value: 2},
                {symbol: '3', isOpen: true, isDraggable: true, value: 3},
                {symbol: '4', isOpen: true, isDraggable: true, value: 4},
                {symbol: '5', isOpen: true, isDraggable: true, value: 5},
                {symbol: '6', isOpen: true, isDraggable: true, value: 6},
                {symbol: '7', isOpen: true, isDraggable: true, value: 7},
                {symbol: '8', isOpen: true, isDraggable: true, value: 8},
                {symbol: '9', isOpen: true, isDraggable: true, value: 9},
                {symbol: '10', isOpen: true, isDraggable: true, value: 10},
                {symbol: 'J', isOpen: true, isDraggable: true, value: 11},
                {symbol: 'Q', isOpen: true, isDraggable: true, value: 12},
                {symbol: 'K', isOpen: true, isDraggable: true, value: 13}
            ];

            const setOfTheCards = checkSetOfCards(cards);
            expect(setOfTheCards).toEqual( {isScore: true, 
                cards: [
                    {symbol: '5', isOpen: false, isDraggable: false, value: 5},
                    {symbol: '4', isOpen: true, isDraggable: true, value: 4}
                ]});
        })
    })

    describe('isAnyCardHolderWithoutCards function tests', () => {

        it('should return true if one of the card holder is empty', () => {
            const deckData = [
                {name: 'cardholder0', cards: []},
                {name: 'cardholder1', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9}]},
                {name: 'cardholder2', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9}]},
                {name: 'cardholder3', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9}]},
                {name: 'cardholder4', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9}]},
                {name: 'cardholder5', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9}]},
                {name: 'cardholder6', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9}]},
                {name: 'cardholder7', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9}]},
                {name: 'cardholder8', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9}]},
                {name: 'cardholder9', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9}]}
            ]

            const isCardHolderEmpty = isAnyCardHolderWithoutCards(deckData);
            expect(isCardHolderEmpty).toEqual(true);
        })

        it('should return false if all card holders have cards inside of it', () => {
            const deckData = [
                {name: 'cardholder0', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9}]},
                {name: 'cardholder1', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9}]},
                {name: 'cardholder2', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9}]},
                {name: 'cardholder3', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9}]},
                {name: 'cardholder4', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9}]},
                {name: 'cardholder5', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9}]},
                {name: 'cardholder6', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9}]},
                {name: 'cardholder7', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9}]},
                {name: 'cardholder8', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9}]},
                {name: 'cardholder9', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9}]}
            ]

            const isCardHolderEmpty = isAnyCardHolderWithoutCards(deckData);
            expect(isCardHolderEmpty).toEqual(false);
        })
    })

    describe('updateCardDraggable function tests', () => {

        it('should make the card draggable if card value plus one is equal to the next sibling card value', () => {
            const deckData = [
                {name: 'cardholder0', cards: [{symbol: 'A', isOpen: false, isDraggable: false, value: 1}]},
                {name: 'cardholder1',
                 cards: [
                    {symbol: 'A', isOpen: true, isDraggable: false, value: 1},
                    {symbol: '2', isOpen: true, isDraggable: false, value: 2},
                    {symbol: '3', isOpen: true, isDraggable: false, value: 3},
                    {symbol: '4', isOpen: true, isDraggable: false, value: 4},
                    {symbol: '5', isOpen: true, isDraggable: false, value: 5},
                    {symbol: '6', isOpen: true, isDraggable: false, value: 6},
                    {symbol: '7', isOpen: true, isDraggable: false, value: 7},
                    {symbol: '2', isOpen: true, isDraggable: false, value: 2},
                    {symbol: 'A', isOpen: true, isDraggable: false, value: 1},
                    {symbol: '2', isOpen: true, isDraggable: true, value: 2}
                ]},
                {name: 'cardholder2', cards: [
                    {symbol: 'A', isOpen: false, isDraggable: false, value: 1},
                    {symbol: 'A', isOpen: true, isDraggable: true, value: 1}
                ]},
            ]

            const settingCardDraggability = updateCardDraggable(deckData);
            expect(settingCardDraggability[1].cards[8].isDraggable).toEqual(true);
        })

        it('should make the card undraggable if one of the next sibling of the card is not draggable', () => {
            const deckData = [
                {name: 'cardholder0', cards: [{symbol: 'A', isOpen: true, isDraggable: true, value: 9}]},
                {name: 'cardholder1',
                 cards: [
                    {symbol: 'A', isOpen: true, isDraggable: true, value: 1},
                    {symbol: '2', isOpen: true, isDraggable: true, value: 2},
                    {symbol: '3', isOpen: true, isDraggable: true, value: 3},
                    {symbol: '4', isOpen: true, isDraggable: true, value: 4},
                    {symbol: '5', isOpen: true, isDraggable: true, value: 5},
                    {symbol: '6', isOpen: true, isDraggable: true, value: 6},
                    {symbol: '7', isOpen: true, isDraggable: true, value: 7},
                    {symbol: '2', isOpen: true, isDraggable: true, value: 2}, //breaks the draggable situation
                    {symbol: 'A', isOpen: true, isDraggable: true, value: 1},
                    {symbol: '2', isOpen: true, isDraggable: true, value: 2},
                ]},
            ]

            const settingCardDraggability = updateCardDraggable(deckData);
            expect(settingCardDraggability[1].cards[1].isDraggable).toEqual(false);
        })

        it('should make the card draggable if the card is the last card in its holder', () => {
            const deckData = [
                {name: 'cardholder0', cards: []},
                {name: 'cardholder1', cards: [{symbol: '7', isOpen: false, isDraggable: false, value: 7}]},
            ]

            const settingCardDraggability = updateCardDraggable(deckData);
            expect(settingCardDraggability[1].cards[0].isDraggable).toEqual(true);
        })
        
    })

    describe('isValidDrop function tests', () => {

        const droppedCardHolderIndex = 0;
        const draggedCardHolderIndex = 1;
        const draggedCardIndex = 1;

        it('should cards be draggable if the target card holder is empty', () => {
            const deckData = [
                {name: 'cardholder0', cards: [] }, //target
                {name: 'cardholder1', cards: [
                    {symbol: '4', isOpen: true, isDraggable: true, value: 4},
                    {symbol: '5', isOpen: true, isDraggable: true, value: 5}]}, //dragged 
                {name: 'cardholder2', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9}]},
                {name: 'cardholder3', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9}]},
                {name: 'cardholder4', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9}]},
                {name: 'cardholder5', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9}]},
                {name: 'cardholder6', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9}]},
                {name: 'cardholder7', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9}]},
                {name: 'cardholder8', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9}]},
                {name: 'cardholder9', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9}]}
            ]

            let validDrop = isValidDrop(deckData, droppedCardHolderIndex, draggedCardHolderIndex, draggedCardIndex);
            expect(validDrop).toEqual(true);
        })

        it('should return false if the card which is dragging value minus one is not equal to the card which is the last card in the target holder', () => {
            const deckData = [
                {name: 'cardholder0', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9}]}, //target
                {name: 'cardholder1', cards: [
                    {symbol: '4', isOpen: true, isDraggable: true, value: 4},
                    {symbol: '5', isOpen: true, isDraggable: true, value: 5}]}, //dragged 
                {name: 'cardholder2', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9}]},
                {name: 'cardholder3', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9}]},
                {name: 'cardholder4', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9}]},
                {name: 'cardholder5', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9}]},
                {name: 'cardholder6', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9}]},
                {name: 'cardholder7', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9}]},
                {name: 'cardholder8', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9}]},
                {name: 'cardholder9', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9}]}
            ]

            let validDrop = isValidDrop(deckData, droppedCardHolderIndex, draggedCardHolderIndex, draggedCardIndex);
            expect(validDrop).toEqual(false);
        })

        it('should return true if the card which is dragging value minus one is equal to card which is the last card in the target holder', () => {
            const deckData = [
                {name: 'cardholder0', cards: [{symbol: '4', isOpen: true, isDraggable: true, value: 4}]}, //target
                {name: 'cardholder1', cards: [
                    {symbol: '4', isOpen: true, isDraggable: true, value: 4},
                    {symbol: '5', isOpen: true, isDraggable: true, value: 5}]}, //dragged 
                {name: 'cardholder2', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9}]},
                {name: 'cardholder3', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9}]},
                {name: 'cardholder4', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9}]},
                {name: 'cardholder5', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9}]},
                {name: 'cardholder6', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9}]},
                {name: 'cardholder7', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9}]},
                {name: 'cardholder8', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9}]},
                {name: 'cardholder9', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9}]}
            ]

            let validDrop = isValidDrop(deckData, droppedCardHolderIndex, draggedCardHolderIndex, draggedCardIndex);
            expect(validDrop).toEqual(true);
        })
    })
})