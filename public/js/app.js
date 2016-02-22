
(function () {

    //Точка входа в приложение в этом месте инициализируются все сущности,
    ////происходит первоначальное конфигурирование приложения
    //var observer = new Observer();

    var model = new Model();
    var view = new View(model);
    var controller = new Controller(model, view);


})();