
var Model = (function () {
    function Model() {
        var self = this;

        this.activeFilter='all';
        this.items = [
            {
                id: 0,
                title: "Test",
                completed: false
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
         
         this.on('controller:checked_item', function(id){
            self.checkItem(id);
             self.change();
        });

          this.on('controller:filter_item', function(filter){     
            this.activeFilter = filter;
             self.change();
        })
    }

    Model.prototype.change = function () {
        this.emit('data:loaded', this.filterItem());
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
    
    Model.prototype.checkItem = function (id) {
       
       var currentIndex = this.items.indexOf(this.items.filter(function (item) {
           return item.id === parseInt(id);
       })[0]);

       this.items[currentIndex].completed = !this.items[currentIndex].completed;
       console.log(this.items[currentIndex]);
      
   };

   Model.prototype.filterItem = function () {
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

    return Model;
})();