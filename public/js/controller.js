/**
 * Created by IlyaLitvinov on 14.01.16.
 */
var Controller = (function () {
    function Controller(model, view) {
        console.log('init Controller');
        var self = this;

        this.view = view;
        this.model = model;

        //Первоначальная отрисовка списка
        this.show();
        this.view.addChannels('addItem', function (title) {
            self.setItem(title);
        });

        this.view.addChannels('remove', function (removedId) {
            self.model.deleteItem(removedId);
            self.show();
        });

        this.view.addChannels('complete', function (completedId) {
            self.model.completedItem(completedId);
            self.show();
        });

        this.view.addChannels('removeCompleted', function () {
            self.model.clearCompleted();
            self.show();
        });

        this.view.addChannels('filter', function (filterType) {
            self.model.toFilter(filterType);
            self.show();
        });

        this.view.addChannels('toggleAll', function (completedItem) {
            self.model.toggleAll();
            self.show();
        })
    }

    Controller.prototype.show = function () {
        this.view.render(this.model.get());
    };

    Controller.prototype.setItem = function (title) {
        this.model.setItem(title);
        this.show();
    };

    return Controller;
})(); 