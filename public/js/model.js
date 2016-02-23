
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

        this.on('controller:add_item', function(data){
            self.addItem(data);
             self.change();
        });
		 this.on('controller:delete_item', function(id){
            self.deleteItem(id);
             self.change();
        });
         
         this.on('controller:check_item', function(id){
            self.deleteItem(id);
             self.change();
        })
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
	 Model.prototype.deleteItem = function (id) {
        var currentIndex = this.items.indexOf(this.items.filter(function (item) {
            
            return item.id === parseInt(id);
            
        })[0]);

        this.items.splice(currentIndex, 1);
    };

    return Model;
})();