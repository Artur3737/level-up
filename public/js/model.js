/**
 * Created by IlyaLitvinov on 14.01.16.
 */
var Model = (function () {
    function Model() {
        var self = this;

        this.items = [
            {
                id: 0,
                title: "Test",
                completed: true
            },
            {
                id: 1,
                title: 'test2',
                completed: false
            },
            {
                id: 2,
                title: 'test2',
                completed: false
            }
        ];

        this.on('controller:start', function () {
            self.change()
        });
    }

    Model.prototype.getItems = function () {
        return this.items;

    };

    Model.prototype.change = function () {
        this.emit('data:loaded', this.getItems());
    };

    function generateId() {
        return Math.floor((1 + Math.random()) * 0x10000);
    }

    Model.prototype.addItem = function (title) {
        var newItem =  {
            id: generateId(),
            title: title,
            completed: false
        };

        this.items.push(newItem);
    };

    return Model;
})();