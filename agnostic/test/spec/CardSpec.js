// Card Specification
describe("Card Specification", function() {
    var card;

    // Create a Two of Hearts Card
    beforeEach(function() {
        card = new Card("H", 2);
        card.show();
    });

    afterEach(function() {
        card.hide();
    });

    describe("Card Visibility", function() {
        it("Two of Hearts visible", function() {
            expect(card.toString()).toBe("[2H]");
        });

        it("Two of Hearts hidden", function() {
            card.hide();
            expect(card.toString()).toBe("[XYZ]");
            expect(card.toString()).not.toBe("[2H]");
        });
    });

    describe("Card isEqual and toString comparisons ", function() {
        it("Card toString ", function() {
            var card2 = new Card('H', 2);
            var card3 = new Card('S', 4);
            card.show();
            card2.show();
            expect(card.toString()).toBe(card2.toString());
            card.hide();
            card2.hide();
            expect(card.toString()).toBe(card2.toString());

            expect(card.isEqual(card2)).toBe(true); // These cards should be the same
            expect(card.isEqual(card3)).toBe(false); // These should be different
        });

        it("Jokers are not equal to one another.", function() {
            var card2 = new Card('J', 0);
            var card3 = new Card('J', 14);

            expect(card.isEqual(card2)).toBe(false); // These cards are not the same
            expect(card2.isEqual(card3)).toBe(false); // These should be different too
        });
    });

    describe("Return image paths", function() {
        it("Get image.", function() {
            expect(card.getImage()).toBe("img/2H.png"); // These cards are not the same
        });
        it("Get image of hidden.", function() {
            card.hide();
            expect(card.getImage()).toBe("img/b1fv.png"); // These cards are not the same
        });
    });

});
