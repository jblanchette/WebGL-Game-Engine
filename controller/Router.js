G.controller.Router = Class.create({

    initialize: function() {
        this.loading = false;
        this.loader = new G.loader.ThreeLoader(this.loadComplete);
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

    /**
     * loadComplete is passed to the loader as a callback for
     * when the load() function has finished all of its work
     */
    loadComplete: function(){
        G.log('Controller finished loading');
        this.loading = false;
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
            var _this = this;

            // Init Controller
            controller.init();

            this.loader.load("data/entityscene/GroundScene.js");

            // Setup the components
            controller.getComponents().each(function(component){
                component.buildScene(controller.getScene(), controller.getPromises());
            });

            /*
            RSVP.all(controller.getPromises()).then(function(objects) {

                G.log('Controller finished loading');
                _this.loading = false;

            }).catch(function(error) {

                console.log('Could not initiate controller: ', error);

            });*/
        }

        return this.controllers[name];
    }
});