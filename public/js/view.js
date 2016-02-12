var View = (function () {
    function View () {
        console.log('View');

        this.activeBtn = $('#active');
        this.input = $('.new-todo');
        this.output = $('.todo-list');
        this.filters = $('.filters a');
        this.clearCompleted = $('.clear-completed');
    }

    View.prototype.render = function (todos) {
        var self = this;

        this.view = '';
        todos.forEach(function (item) {
            self.renderOne(item);
        });

       this.output.html(this.view);
   };

    View.prototype.renderOne = function (item) {
        //Шаблон для отрисовки одного элемента списка
        var defaultTemplate = '<li data-id="{{id}}" class="{{completed}}">'
            + '<div class="view">'
            + '<input class="toggle" type="checkbox" {{checked}}>'
            + '<label>{{title}}</label>'
            + '<button class="destroy"></button>'
            + '</div>'
            + '</li>',
            templ = defaultTemplate.replace('{{id}}', item.id);

       templ = templ.replace('{{completed}}', item.completed);
       templ = templ.replace('{{checked}}', item.completed ? 'checked' : '');
       templ = templ.replace('{{title}}', item.title);

       this.view = this.view + templ;

    };

    // function bindCustomEvent (target, type, callback) {
    //     target.on(type, callback);
    // }

    View.prototype.addChanals = function (chanalName, handler) {
        var self = this;

        if (chanalName === 'addItem') {
            this.input.on('keypress', function (e) {
                if (e.which === 13) {
                    handler($(this).val());
                }
            });
        } else if (chanalName === 'completeItem') {
            this.output.on('click', function (e) {
                var id = null;

                if (!$(e.target).hasClass('toggle')) {
                    e.stopPropagation();
                    return;
                }

                id = $(e.target).closest('li').attr('data-id');
                handler(id);
            });
        } else if (chanalName === 'deleteItem') {
            //переделать без bindCustomEvent
            this.output.on('click', function (e) {
                var id = null;

                if (!$(e.target).hasClass('destroy')) {
                    e.stopPropagation();
                    return;
                }

                id = $(e.target).closest('li').attr('data-id');
                handler(id);
            });
        } else if (chanalName === 'filterBtn') {
            this.filters.on('click', function (e) {
                if ($(e.target).hasClass('selected')) {
                    e.stopPropagation();
                    return;
                }

                $(self.filters).removeClass('selected');
                $(e.target).addClass('selected');

                handler($(e.target).attr('id'));
            });
        } else if (chanalName === 'clearCompleted') {
            this.clearCompleted.on('click', function () {
                    handler();
            });
        }
    };

    View.prototype.leftItems = function (count) {
        $('.todo-count')
            .html('<strong>'
                + count
                + '</strong>'
                + ' '
                + 'items left');
    };

    return View;
})();
