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
        
        this.on('view:add_item', function(data){
            self.emit('controller:add_item', data);
        })
    }

    Controller.prototype.show = function (data) {
        this.emit('render', data);
    };


    return Controller;
})();