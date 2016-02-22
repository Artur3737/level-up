
//globals observer app

var View = (function () {
    function View(model) {
        console.log('View');
        var self = this;

        this.model = model;

        this.activeBtn = $('#active');
        this.input = $('.new-todo');
        this.output = $('.todo-list');
        this.filters = $($('.filters')).find('a');

        this.on('data:loaded', function (data) {
            console.log('Intercepted in view');
            self.render(data);
        });

        this.handleEvents();
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
        var defaultTemplate = '<li data-id="{{id}}" class="{{completed}} ">'
                + '<div class="view">'
                + '<input class="toggle" type="checkbox" {{checked}}>'
                + '<label class = "title">{{title}}</label>'
                + '<button class="destroy"></button>'
                + '</div>'
                + '</li>',
            template = defaultTemplate.replace('{{id}}', item.id);

        template = template.replace('{{completed}}', item.completed);
        template = template.replace('{{checked}}', item.checked);
        template = template.replace('{{title}}', item.title);

        this.view = this.view + template;
    };

    View.prototype.handleEvents = function () {
        var self = this;

        $(this.input).on( 'blur', function(){
            self.emit('view:add_item', $(this).val() );
            $(this).val('');
        })
		 $(this.output).on( 'click', function(e){
            self.emit('view:delete_item', $(e.target) );
                if (!$(e.target).hasClass('destroy')) {
                    e.preventDefault();
                    return;
                }
                target = e.target;
                id = $(target).parent().parent().attr('data-id');
                handler(id);
            })

    };

    return View;
})();
