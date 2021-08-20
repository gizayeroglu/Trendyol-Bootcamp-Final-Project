import { checkSetOfCards, isAnyCardHolderWithoutCards, updateCardDraggable, isValidDrop, getCardHoldersWithCards, getHintedData} from '../../utils/GameUtils';

describe('Game Utils Tests', () => {

	describe('checkSetOfCards function tests', () => {

		it('should return isScore as false and return cards without search for a set (A2345678910JQK) if the cards length less than the 13', () => {
			const cards = [
				{symbol: '4', isOpen: false, isDraggable: false, value: 4, isHighlighted: false},
				{symbol: 'A', isOpen: false, isDraggable: false, value: 1, isHighlighted: false},
				{symbol: 'J', isOpen: false, isDraggable: false, value: 11, isHighlighted: false},
				{symbol: '6', isOpen: false, isDraggable: false, value: 6, isHighlighted: false},
				{symbol: '5', isOpen: false, isDraggable: false, value: 5, isHighlighted: false},
				{symbol: 'K', isOpen: true, isDraggable: false, value: 5, isHighlighted: false}
			];

			const setOfTheCards = checkSetOfCards(cards);
			expect(setOfTheCards).toEqual({isScore: false, cards: cards});
		});

		it('should return isScore as false and return cards without search for the set if the cards last element is not K', () => {
			const cards = [
				{symbol: '4', isOpen: true, isDraggable: true, value: 4, isHighlighted: false},
				{symbol: 'A', isOpen: true, isDraggable: true, value: 1, isHighlighted: false},
				{symbol: 'J', isOpen: true, isDraggable: true, value: 11, isHighlighted: false},
				{symbol: '6', isOpen: true, isDraggable: true, value: 6, isHighlighted: false},
				{symbol: '5', isOpen: true, isDraggable: true, value: 5, isHighlighted: false},
				{symbol: '4', isOpen: true, isDraggable: true, value: 4, isHighlighted: false},
				{symbol: 'A', isOpen: true, isDraggable: true, value: 1, isHighlighted: false},
				{symbol: 'J', isOpen: true, isDraggable: true, value: 11, isHighlighted: false},
				{symbol: '6', isOpen: true, isDraggable: true, value: 6, isHighlighted: false},
				{symbol: 'A', isOpen: true, isDraggable: true, value: 1, isHighlighted: false},
				{symbol: 'J', isOpen: true, isDraggable: true, value: 11, isHighlighted: false},
				{symbol: '6', isOpen: true, isDraggable: true, value: 6, isHighlighted: false},
				{symbol: '5', isOpen: true, isDraggable: true, value: 5, isHighlighted: false},
				{symbol: 'A', isOpen: true, isDraggable: true, value: 5, isHighlighted: false}
			];

			const setOfTheCards = checkSetOfCards(cards);
			expect(setOfTheCards).toEqual({isScore: false, cards: cards});
		});

		it('should return isScore false and return cards without any change if the data has not required set of symbols (A2345678910JQK) ', () => {
			const cards = [
				{symbol: '4', isOpen: true, isDraggable: true, value: 4, isHighlighted: false},
				{symbol: 'A', isOpen: true, isDraggable: true, value: 1, isHighlighted: false},
				{symbol: 'J', isOpen: true, isDraggable: true, value: 11, isHighlighted: false},
				{symbol: '6', isOpen: true, isDraggable: true, value: 6, isHighlighted: false},
				{symbol: '5', isOpen: true, isDraggable: true, value: 5, isHighlighted: false},
				{symbol: '4', isOpen: true, isDraggable: true, value: 4, isHighlighted: false},
				{symbol: 'A', isOpen: true, isDraggable: true, value: 1, isHighlighted: false},
				{symbol: 'J', isOpen: true, isDraggable: true, value: 11, isHighlighted: false},
				{symbol: '6', isOpen: true, isDraggable: true, value: 6, isHighlighted: false},
				{symbol: 'A', isOpen: true, isDraggable: true, value: 1, isHighlighted: false},
				{symbol: 'J', isOpen: true, isDraggable: true, value: 11, isHighlighted: false},
				{symbol: '6', isOpen: true, isDraggable: true, value: 6, isHighlighted: false},
				{symbol: '5', isOpen: true, isDraggable: true, value: 5, isHighlighted: false},
				{symbol: 'K', isOpen: true, isDraggable: true, value: 13, isHighlighted: false}
			];

			const setOfTheCards = checkSetOfCards(cards);
			expect(setOfTheCards).toEqual({isScore: false, cards: cards});
		});

		it('should splice required set (A2345678910JQK) from data if it includes and should return isScore as true', () => {
			const cards = [
				{symbol: 'A', isOpen: true, isDraggable: true, value: 1, isHighlighted: false},
				{symbol: '2', isOpen: true, isDraggable: true, value: 2, isHighlighted: false},
				{symbol: '3', isOpen: true, isDraggable: true, value: 3, isHighlighted: false},
				{symbol: '4', isOpen: true, isDraggable: true, value: 4, isHighlighted: false},
				{symbol: '5', isOpen: true, isDraggable: true, value: 5, isHighlighted: false},
				{symbol: '6', isOpen: true, isDraggable: true, value: 6, isHighlighted: false},
				{symbol: '7', isOpen: true, isDraggable: true, value: 7, isHighlighted: false},
				{symbol: '8', isOpen: true, isDraggable: true, value: 8, isHighlighted: false},
				{symbol: '9', isOpen: true, isDraggable: true, value: 9, isHighlighted: false},
				{symbol: '10', isOpen: true, isDraggable: true, value: 10, isHighlighted: false},
				{symbol: 'J', isOpen: true, isDraggable: true, value: 11, isHighlighted: false},
				{symbol: 'Q', isOpen: true, isDraggable: true, value: 12, isHighlighted: false},
				{symbol: 'K', isOpen: true, isDraggable: true, value: 13, isHighlighted: false}
			];

			const setOfTheCards = checkSetOfCards(cards);
			expect(setOfTheCards).toEqual({isScore: true, cards: []});
		});

		it('should set the last cards as open and draggable after splice', () => {
			const cards = [
				{symbol: '5', isOpen: false, isDraggable: false, value: 5, isHighlighted: false},
				{symbol: '4', isOpen: false, isDraggable: false, value: 4, isHighlighted: false},
				{symbol: 'A', isOpen: true, isDraggable: true, value: 1, isHighlighted: false},
				{symbol: '2', isOpen: true, isDraggable: true, value: 2, isHighlighted: false},
				{symbol: '3', isOpen: true, isDraggable: true, value: 3, isHighlighted: false},
				{symbol: '4', isOpen: true, isDraggable: true, value: 4, isHighlighted: false},
				{symbol: '5', isOpen: true, isDraggable: true, value: 5, isHighlighted: false},
				{symbol: '6', isOpen: true, isDraggable: true, value: 6, isHighlighted: false},
				{symbol: '7', isOpen: true, isDraggable: true, value: 7, isHighlighted: false},
				{symbol: '8', isOpen: true, isDraggable: true, value: 8, isHighlighted: false},
				{symbol: '9', isOpen: true, isDraggable: true, value: 9, isHighlighted: false},
				{symbol: '10', isOpen: true, isDraggable: true, value: 10, isHighlighted: false},
				{symbol: 'J', isOpen: true, isDraggable: true, value: 11, isHighlighted: false},
				{symbol: 'Q', isOpen: true, isDraggable: true, value: 12, isHighlighted: false},
				{symbol: 'K', isOpen: true, isDraggable: true, value: 13, isHighlighted: false}
			];

			const setOfTheCards = checkSetOfCards(cards);
			expect(setOfTheCards).toEqual( {isScore: true, 
				cards: [
						{symbol: '5', isOpen: false, isDraggable: false, value: 5, isHighlighted: false},
						{symbol: '4', isOpen: true, isDraggable: true, value: 4, isHighlighted: false}
				]});
		});
	});

	describe('isAnyCardHolderWithoutCards function tests', () => {

		it('should return true if one of the card holder is empty', () => {
			const deckData = [
				{name: 'cardholder0', cards: []},
				{name: 'cardholder1', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9, isHighlighted: false}]},
				{name: 'cardholder2', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9, isHighlighted: false}]},
				{name: 'cardholder3', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9, isHighlighted: false}]},
				{name: 'cardholder4', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9, isHighlighted: false}]},
				{name: 'cardholder5', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9, isHighlighted: false}]},
				{name: 'cardholder6', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9, isHighlighted: false}]},
				{name: 'cardholder7', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9, isHighlighted: false}]},
				{name: 'cardholder8', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9, isHighlighted: false}]},
				{name: 'cardholder9', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9, isHighlighted: false}]}
			];

			const isCardHolderEmpty = isAnyCardHolderWithoutCards(deckData);
			expect(isCardHolderEmpty).toEqual(true);
		});

		it('should return false if all card holders have cards inside of it', () => {
			const deckData = [
				{name: 'cardholder0', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9, isHighlighted: false}]},
				{name: 'cardholder1', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9, isHighlighted: false}]},
				{name: 'cardholder2', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9, isHighlighted: false}]},
				{name: 'cardholder3', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9, isHighlighted: false}]},
				{name: 'cardholder4', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9, isHighlighted: false}]},
				{name: 'cardholder5', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9, isHighlighted: false}]},
				{name: 'cardholder6', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9, isHighlighted: false}]},
				{name: 'cardholder7', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9, isHighlighted: false}]},
				{name: 'cardholder8', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9, isHighlighted: false}]},
				{name: 'cardholder9', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9, isHighlighted: false}]}
			];

			const isCardHolderEmpty = isAnyCardHolderWithoutCards(deckData);
			expect(isCardHolderEmpty).toEqual(false);
		});
	});

	describe('updateCardDraggable function tests', () => {

		it('should make the card draggable if card value plus one is equal to the next sibling card value', () => {
			const deckData = [
				{name: 'cardholder0', cards: [{symbol: 'A', isOpen: false, isDraggable: false, value: 1}]},
				{name: 'cardholder1',
						cards: [
							{symbol: 'A', isOpen: true, isDraggable: false, value: 1, isHighlighted: false},
							{symbol: '2', isOpen: true, isDraggable: false, value: 2, isHighlighted: false},
							{symbol: '3', isOpen: true, isDraggable: false, value: 3, isHighlighted: false},
							{symbol: '4', isOpen: true, isDraggable: false, value: 4, isHighlighted: false},
							{symbol: '5', isOpen: true, isDraggable: false, value: 5, isHighlighted: false},
							{symbol: '6', isOpen: true, isDraggable: false, value: 6, isHighlighted: false},
							{symbol: '7', isOpen: true, isDraggable: false, value: 7, isHighlighted: false},
							{symbol: '2', isOpen: true, isDraggable: false, value: 2, isHighlighted: false},
							{symbol: 'A', isOpen: true, isDraggable: false, value: 1, isHighlighted: false},
							{symbol: '2', isOpen: true, isDraggable: true, value: 2, isHighlighted: false}]},
				{name: 'cardholder2', cards: [
							{symbol: 'A', isOpen: false, isDraggable: false, value: 1},
							{symbol: 'A', isOpen: true, isDraggable: true, value: 1}]},
			];

			const settingCardDraggability = updateCardDraggable(deckData);
			expect(settingCardDraggability[1].cards[8].isDraggable).toEqual(true);
		});

		it('should make the card undraggable if one of the next sibling of the card is not draggable', () => {
			const deckData = [
				{name: 'cardholder0', cards: [{symbol: 'A', isOpen: true, isDraggable: true, value: 9}]},
				{name: 'cardholder1',
					cards: [
						{symbol: 'A', isOpen: true, isDraggable: true, value: 1, isHighlighted: false},
						{symbol: '2', isOpen: true, isDraggable: true, value: 2, isHighlighted: false},
						{symbol: '3', isOpen: true, isDraggable: true, value: 3, isHighlighted: false},
						{symbol: '4', isOpen: true, isDraggable: true, value: 4, isHighlighted: false},
						{symbol: '5', isOpen: true, isDraggable: true, value: 5, isHighlighted: false},
						{symbol: '6', isOpen: true, isDraggable: true, value: 6, isHighlighted: false},
						{symbol: '7', isOpen: true, isDraggable: true, value: 7, isHighlighted: false},
						{symbol: '2', isOpen: true, isDraggable: true, value: 2, isHighlighted: false}, //breaks the draggable situation
						{symbol: 'A', isOpen: true, isDraggable: true, value: 1, isHighlighted: false},
						{symbol: '2', isOpen: true, isDraggable: true, value: 2, isHighlighted: false},
					]},
			];

			const settingCardDraggability = updateCardDraggable(deckData);
			expect(settingCardDraggability[1].cards[1].isDraggable).toEqual(false);
		});

		it('should make the card draggable if the card is the last card in its holder', () => {
			const deckData = [
					{name: 'cardholder0', cards: []},
					{name: 'cardholder1', cards: [{symbol: '7', isOpen: false, isDraggable: false, value: 7}]},
			];

			const settingCardDraggability = updateCardDraggable(deckData);
			expect(settingCardDraggability[1].cards[0].isDraggable).toEqual(true);
		});

	});

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
				{name: 'cardholder2', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9, isHighlighted: false}]},
				{name: 'cardholder3', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9, isHighlighted: false}]},
				{name: 'cardholder4', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9, isHighlighted: false}]},
				{name: 'cardholder5', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9, isHighlighted: false}]},
				{name: 'cardholder6', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9, isHighlighted: false}]},
				{name: 'cardholder7', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9, isHighlighted: false}]},
				{name: 'cardholder8', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9, isHighlighted: false}]},
				{name: 'cardholder9', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9, isHighlighted: false}]}
			];

			let validDrop = isValidDrop(deckData, droppedCardHolderIndex, draggedCardHolderIndex, draggedCardIndex);
			expect(validDrop).toEqual(true);
		});

		it('should return false if the card which is dragging value minus one is not equal to the card which is the last card in the target holder', () => {
			const deckData = [
				{name: 'cardholder0', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9}]}, //target
				{name: 'cardholder1', cards: [
						{symbol: '4', isOpen: true, isDraggable: true, value: 4},
						{symbol: '5', isOpen: true, isDraggable: true, value: 5}]}, //dragged 
				{name: 'cardholder2', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9, isHighlighted: false}]},
				{name: 'cardholder3', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9, isHighlighted: false}]},
				{name: 'cardholder4', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9, isHighlighted: false}]},
				{name: 'cardholder5', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9, isHighlighted: false}]},
				{name: 'cardholder6', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9, isHighlighted: false}]},
				{name: 'cardholder7', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9, isHighlighted: false}]},
				{name: 'cardholder8', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9, isHighlighted: false}]},
				{name: 'cardholder9', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9, isHighlighted: false}]}
			];

			let validDrop = isValidDrop(deckData, droppedCardHolderIndex, draggedCardHolderIndex, draggedCardIndex);
			expect(validDrop).toEqual(false);
		});

		it('should return true if the card which is dragging value minus one is equal to card which is the last card in the target holder', () => {
			const deckData = [
				{name: 'cardholder0', cards: [{symbol: '4', isOpen: true, isDraggable: true, value: 4}]}, //target
				{name: 'cardholder1', cards: [
						{symbol: '4', isOpen: true, isDraggable: true, value: 4},
						{symbol: '5', isOpen: true, isDraggable: true, value: 5}]}, //dragged 
				{name: 'cardholder2', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9, isHighlighted: false}]},
				{name: 'cardholder3', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9, isHighlighted: false}]},
				{name: 'cardholder4', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9, isHighlighted: false}]},
				{name: 'cardholder5', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9, isHighlighted: false}]},
				{name: 'cardholder6', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9, isHighlighted: false}]},
				{name: 'cardholder7', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9, isHighlighted: false}]},
				{name: 'cardholder8', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9, isHighlighted: false}]},
				{name: 'cardholder9', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9, isHighlighted: false}]}
			];

			let validDrop = isValidDrop(deckData, droppedCardHolderIndex, draggedCardHolderIndex, draggedCardIndex);
			expect(validDrop).toEqual(true);
		});

	});

	describe('getHintedData function tests', () => {

		it('should return data with the two highlighted cards which have consecutive values', () => {
			const deckData = [
				{name: 'cardholder0', cards: [{symbol: '7', isOpen: true, isDraggable: true, value: 7, isHighlighted: false}]},
				{name: 'cardholder1', cards: [{symbol: '6', isOpen: true, isDraggable: true, value: 6, isHighlighted: false}]},
				{name: 'cardholder2', cards: [{symbol: '6', isOpen: true, isDraggable: true, value: 6, isHighlighted: false}]},
				{name: 'cardholder3', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9, isHighlighted: false}]},
				{name: 'cardholder4', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9, isHighlighted: false}]},
				{name: 'cardholder5', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9, isHighlighted: false}]},
				{name: 'cardholder6', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9, isHighlighted: false}]},
				{name: 'cardholder7', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9, isHighlighted: false}]},
				{name: 'cardholder8', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9, isHighlighted: false}]},
				{name: 'cardholder9', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9, isHighlighted: false}]}
			];

			const hintedCards = getHintedData(deckData);
			expect(hintedCards).toEqual([
				{name: 'cardholder0', cards: [{symbol: '7', isOpen: true, isDraggable: true, value: 7, isHighlighted: true}]},
				{name: 'cardholder1', cards: [{symbol: '6', isOpen: true, isDraggable: true, value: 6, isHighlighted: true}]},
				{name: 'cardholder2', cards: [{symbol: '6', isOpen: true, isDraggable: true, value: 6, isHighlighted: false}]},
				{name: 'cardholder3', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9, isHighlighted: false}]},
				{name: 'cardholder4', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9, isHighlighted: false}]},
				{name: 'cardholder5', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9, isHighlighted: false}]},
				{name: 'cardholder6', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9, isHighlighted: false}]},
				{name: 'cardholder7', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9, isHighlighted: false}]},
				{name: 'cardholder8', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9, isHighlighted: false}]},
				{name: 'cardholder9', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9, isHighlighted: false}]}
			]);
	  });

		it('should handle the situation of empty cardholder', () => {
			const deckData = [
				{name: 'cardholder0', cards: []},
				{name: 'cardholder1', cards: [{symbol: '6', isOpen: true, isDraggable: true, value: 6, isHighlighted: false}]},
				{name: 'cardholder2', cards: [{symbol: '7', isOpen: true, isDraggable: true, value: 7, isHighlighted: false}]},
				{name: 'cardholder3', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9, isHighlighted: false}]},
				{name: 'cardholder4', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9, isHighlighted: false}]},
				{name: 'cardholder5', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9, isHighlighted: false}]},
				{name: 'cardholder6', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9, isHighlighted: false}]},
				{name: 'cardholder7', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9, isHighlighted: false}]},
				{name: 'cardholder8', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9, isHighlighted: false}]},
				{name: 'cardholder9', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9, isHighlighted: false}]}
			];

			const hintedCards = getHintedData(deckData);
			expect(hintedCards).toEqual([
				{name: 'cardholder0', cards: []},
				{name: 'cardholder1', cards: [{symbol: '6', isOpen: true, isDraggable: true, value: 6, isHighlighted: true}]},
				{name: 'cardholder2', cards: [{symbol: '7', isOpen: true, isDraggable: true, value: 7, isHighlighted: true}]},
				{name: 'cardholder3', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9, isHighlighted: false}]},
				{name: 'cardholder4', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9, isHighlighted: false}]},
				{name: 'cardholder5', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9, isHighlighted: false}]},
				{name: 'cardholder6', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9, isHighlighted: false}]},
				{name: 'cardholder7', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9, isHighlighted: false}]},
				{name: 'cardholder8', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9, isHighlighted: false}]},
				{name: 'cardholder9', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9, isHighlighted: false}]}
			]);
		});

		it('should return null if there is no card that has consecutive values', () => {
			const deckData = [
				{name: 'cardholder0', cards: []},
				{name: 'cardholder1', cards: [{symbol: 'A', isOpen: true, isDraggable: true, value: 1, isHighlighted: false}]},
				{name: 'cardholder2', cards: [{symbol: '3', isOpen: true, isDraggable: true, value: 3, isHighlighted: false}]},
				{name: 'cardholder3', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9, isHighlighted: false}]},
				{name: 'cardholder4', cards: [{symbol: '6', isOpen: true, isDraggable: true, value: 6, isHighlighted: false}]},
				{name: 'cardholder5', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9, isHighlighted: false}]},
				{name: 'cardholder6', cards: [{symbol: 'K', isOpen: true, isDraggable: true, value: 13, isHighlighted: false}]},
				{name: 'cardholder7', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9, isHighlighted: false}]},
				{name: 'cardholder8', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9, isHighlighted: false}]},
				{name: 'cardholder9', cards: [{symbol: '9', isOpen: true, isDraggable: true, value: 9, isHighlighted: false}]}
			];

			const hintedCards = getHintedData(deckData);
			expect(hintedCards).toBeFalsy();
		});
	});

});