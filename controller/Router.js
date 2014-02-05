G.controller.Router = Class.create({

    initialize: function() {
        this.loading = false;
        this.controllers = new Array();
        this.current = null;
    },

    destroy: function(route){
        if(this.controllers[route] !== undefined){
            delete this.controllers[route];
        }
    },

    getCurrent: function(){
        return this.current;
    },

    load: function(controllerName, swap) {
        // Log Current Controller
        G.log("Loading Controller: " + controllerName);

        var swap = swap || false;

        // Init Controller
        var controller = this.get(controllerName);
        this.current = controller;
    },

    get: function(name) {
        if (!this.controllers[name]) {
            var controller = this.controllers[name] = new G.controller[name + 'Controller'];

            // Init Controller
            controller.init();

            // Setup the components
            controller.getComponents().each(function(component){
                component.buildScene(controller.getScene(), controller.getPromises());
            });

            var _this = this;

            RSVP.all(controller.getPromises()).then(function(objects) {

                G.log('Controller finished loading');
                _this.loading = false;

            }).catch(function(error) {

                console.log('Could not initiate controller: ', error);

            });
        }

        return this.controllers[name];
    }
});