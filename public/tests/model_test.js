describe('Model', function () {
    var model = null;

    beforeEach(function () {
        model = new Model();
    });

    it('Should have items array', function () {
        expect(model.items).toBeDefined();
        expect(model.items instanceof Array).toBe(true);
    });

});
