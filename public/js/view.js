/**
 * Created by IlyaLitvinov on 14.01.16.
 */
//globals observer app

var View = (function () {
    function View() {
        console.log('View');
        this.activeBtn = $('#active');
        this.input = $('.new-todo');
        this.output = $('.todo-list');
        this.clearBtn = $('.clear-completed');
        this.filters = $('.filters a');
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
            template = defaultTemplate.replace('{{id}}', item.id);

        template = template.replace('{{completed}}', item.completed? 'completed': "");
        template = template.replace('{{checked}}', item.completed? 'checked': '');
        template = template.replace('{{title}}', item.title);
        debugger;
        this.view = this.view + template;
    };

    View.prototype.addChannels = function (channelName, handler) {
        var self = this;

        if (channelName === 'addItem') {
            bindCustomEvents(self.input, 'blur keypress', function (e) {
                var title = self.input.val();
                //навешевание слбытия на клавишу enter code = 13
                if((e.which === 13 || e.type === 'blur') && title) {
                    debugger;
                    handler(title);

                    self.input.val('');
                }
            });
        }

        if (channelName === 'remove') {

            this.output.on('click', function (e) {
                if($(e.target).hasClass('destroy')) {
                    var removedId = $(e.target).closest('li').attr('data-id');
                    handler(removedId);
                };
            });
        }

        if (channelName === 'complete') {
            this.output.on('click', function (e) {
                if($(e.target).hasClass('toggle')) {
                    var completedId = $(e.target).closest('li').attr('data-id');
                    handler(completedId);
                }
            })
        }

        if (channelName === 'removeCompleted') {
            this.clearBtn.on('click', function () {
                handler();
            });
        }

        if (channelName === 'filter') {
            this.filters.on('click', function () {
                handler($(this).attr('data-id'));
            })
        }

    };


    function bindCustomEvents(target, type, callback) {
        target.on(type, callback);
    }

    return View;
})();
//var View = (function () {
//    function View() {
//        this.activeBtn = $('#active');
//        this.input = $('.new-todo');
//        this.output = $('.todo-list');
//
//        this.view = '';
//    }
//
//    View.prototype.render = function (data) {
//        var self = this;
//
//        this.view = '';
//        data.forEach(function (item) {
//            self.renderOne(item);
//        });
//
//        debugger;
//        this.output.html(this.view);
//    };
//
//    View.prototype.renderOne = function (item) {
//
//        //Шаблон для отрисовки одного элемента списка
//        var defaultTemplate =  '<li data-id="{{id}}" class="{{completed}}">'
//            + '<div class="view">'
//            + '<input class="toggle" type="checkbox" {{checked}}>'
//            + '<label>{{title}}</label>'
//            + '<button class="destroy"></button>'
//            + '</div>'
//            + '</li>',
//            template = defaultTemplate.replace('{{id}}', item.id);
//
//        template = template.replace('{{completed}}', item.completed);
//        template = template.replace('{{checked}}', item.checked);
//        template = template.replace('{{title}}', item.title);
//
//        this.view = this.view + template;
//    };
//
//    View.prototype.bind = function (event, handler) {
//        var self = this;
//
//        //разделение "каналов" событий
//        if (event === 'addItem') {
//            bindCustomEvents(self.input, 'blur keypress', function (e) {
//                var title = self.input.val();
//
//                //навешевание слбытия на клавишу enter code = 13
//                if((e.which === 13 || e.type === 'blur') && title) {
//                    handler(title);
//                    self.input.val('');
//                }
//            });
//        }
//    };
//
//    //обертка для более удобного навешивания событий для работы с разными сущностями.

//
//   return View
//})();