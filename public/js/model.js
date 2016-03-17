/**
 * Created by IlyaLitvinov on 14.01.16.
 */
var Model = (function () {
    function Model() {
        this.items = [{
                id: 0,
                title: "Test",
                completed: true
            },
            {
                id: 1,
                title: 'test2',
                completed: false
            }
        ];
        this.activeFilter = 'all';
    }

    Model.prototype.toFilter = function (filterType) {
        this.activeFilter = filterType; 
    };

    Model.prototype.get = function () {
        var self = this;

        var filters = {
            'completed': function () {
                return self.items.filter(function (item) {
                    return item.completed
                });
            },
            'all': function () {
                return self.items;
            },
            'active': function () {
                return self.items.filter(function (item) {
                    return !item.completed
                });
            }
        }
        return filters[this.activeFilter]();
    };

    function generateId() {
        return Math.floor((1 + Math.random()) * 0x10000);
    }

    Model.prototype.setItem = function (itemTitle) {
        var model = {
            id: generateId(),
            title: itemTitle,
            completed: false,
            checked: ''
        };

        this.items.push(model);
    };

    Model.prototype.deleteItem = function (removedId) {
       var t =  this.items.filter (function (item) {
            return item.id === parseInt(removedId);
        });
       var index = this.items.indexOf(t[0]);
       this.items.splice(index, 1);
    };

    Model.prototype.completedItem = function (completedItem) {
        var t =  this.items.filter (function (item) {
            return item.id === parseInt(completedItem);
        }); 
        var index = this.items.indexOf(t[0]);
        this.items[index].completed = !this.items[index].completed;
    };

    Model.prototype.clearCompleted = function () {      
        this.items = this.items.filter (function (item) {
            return !item.completed;
        });        
    };

    Model.prototype.toggleAll = function () {
        this.items.forEach (function(item) {           
            item.completed = !item.completed;
        });
    }
    
    return Model;
})(); 