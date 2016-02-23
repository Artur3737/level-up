/**
 * Created by IlyaLitvinov on 14.01.16.
 */
var Model = (function () {
    function Model() {
        var self = this;    

        this.activeFilter = 'all';

        this.items = [
            {
                id: 0,
                title: "Test",
                completed: true
            },
            {
                id: 1,
                title: 'Test1',
                completed: false
            },
            {
                id: 2,
                title: 'Test2',
                completed: false
            }
        ];

        this.on('controller:start', function () {
            self.change()
        });

        this.on('controller:add_Item', function (data) {
            self.addItem(data);
            self.change()
        });

        this.on('controller:delete_item', function (id) {
            self.deleteItem(id);
            self.change()
        });

        this.on('controller:completed', function (id) {
            self.getCompleted(id);
            self.change()
        });

        this.on('controller:toFilter', function (typeOfFilter) {
            self.activeFilter = typeOfFilter;
            self.change()
        })
    }

    Model.prototype.getItems = function () {
        var self = this,
            filters = {
                'all': function () {
                    return self.items;
                },
                'completed': function () {
                   return self.items.filter(function (item) {
                        return item.completed === true;
                    })
                },
                'active': function () {
                    return self.items.filter(function (item) {
                        return item.completed === false;
                    })
                }

            };

        return filters[this.activeFilter]();
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

    Model.prototype.deleteItem = function (id) {
        var currentIndex = this.items.indexOf(this.items.filter(function (item) {
            return item.id === parseInt(id);
        })[0]);

        this.items.splice(currentIndex, 1);
    };

    Model.prototype.getCompleted = function (id) {
        console.log(id);
        
        var currentIndex = this.items.indexOf(this.items.filter(function (item) {
            return item.id === parseInt(id);
        })[0]);

        this.items[currentIndex].completed = !this.items[currentIndex].completed;
    };

    return Model;
})();