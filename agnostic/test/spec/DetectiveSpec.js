// Detective Specification
describe("Detective Specification", function() {

    beforeEach(function() {
        Detective.setName("");
    });

    afterEach(function() {
    });

    describe("Detective Name", function() {
        it("Default Name is blank", function() {
            expect(Detective.getName()).toBe("");
        });

        it("Set Name and test it", function() {
	    Detective.setName("Sherlock");
            expect(Detective.getName()).toBe("Sherlock");
            expect(Detective.getName()).not.toBe("");
        });
    });



});
