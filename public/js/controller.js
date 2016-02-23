/**
 * Created by IlyaLitvinov on 14.01.16.
 */
var Controller = (function () {
    function Controller(model, view) {
        console.log('init Controller');
        var self = this;

        this.view = view;
        this.model = model;


        this.emit('controller:start');

        this.on('view:add_Item', function (data) {
            self.emit('controller:add_Item', data);
        });

        this.on('view:delete_item', function (id) {
            self.emit('controller:delete_item', id)
        });

        this.on('view:completed', function (id) {
            self.emit('controller:completed', id)
        });

        this.on('view:toFilter', function (typeOfFilter) {
            self.emit('controller:toFilter', typeOfFilter)
        });
    }

    Controller.prototype.show = function (data) {
        this.emit('render', data);
    };

    // Controller.prototype.deleteItem = function (id) {
    //     this.emit('render', id);
    // };

    // Controller.prototype.getCompleted = function (id) {
    //     this.emit('render', id);
    // };


    return Controller;
})();