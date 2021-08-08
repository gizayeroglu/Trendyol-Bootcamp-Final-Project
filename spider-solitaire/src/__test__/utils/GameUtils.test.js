import React from 'react';
import { getDeckData } from '../../utils/GameUtils';

describe('Game Utils tests', () => {
    it('should getDeckData return cards into card holder and first 4 card holder should keep 6 card at the beginning of the game', () => {
        const cardHolder = getDeckData();
        expect(cardHolder[0].cards.length).toEqual(6);
        expect(cardHolder[1].cards.length).toEqual(6);
        expect(cardHolder[2].cards.length).toEqual(6);
        expect(cardHolder[3].cards.length).toEqual(6);
    })

    it('should getDeckData return cards into card holder and last 6 card holder should keep 5 card at the beginning of the game', () => {
        const cardHolder = getDeckData();
        expect(cardHolder[4].cards.length).toEqual(5);
        expect(cardHolder[5].cards.length).toEqual(5);
        expect(cardHolder[6].cards.length).toEqual(5);
        expect(cardHolder[7].cards.length).toEqual(5);
        expect(cardHolder[8].cards.length).toEqual(5);
        expect(cardHolder[9].cards.length).toEqual(5);
    })

    it('should getDeckData push the card symbols into the cards', () => {
        const cardHolder = getDeckData();
        expect(cardHolder[4].cards[0]).toHaveLength(1);
    })
})