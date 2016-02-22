
var Controller = (function () {
    function Controller(model, view) {
        console.log('init Controller');
        var self = this;

        this.view = view;
        this.model = model;


        this.emit('controller:start');
        
        this.on('view:add_item', function(data){
            self.emit('controller:add_item', data);
        })
		this.on('view:delete_item', function(data){
            self.emit('controller:delete_item', data);
        })
    }

    Controller.prototype.show = function (data) {
        this.emit('render', data);
    };


    return Controller;
})();