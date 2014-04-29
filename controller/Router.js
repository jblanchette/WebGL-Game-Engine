G.controller.Router = Class.create({

    initialize: function() {
        this.loading = false;
        this.loader = new G.loader.ThreeLoader();
        this.resourceList = [];
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

    loadComplete: function(){
        G.log('Router.loadComplete');
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

            // Init Controller
            controller.init();

            // Load Resources
            G.log("Controller.loadResources",name + "Controller");
            this.loading = true;

            controller.loadResources(this.loader);
        }

        return this.controllers[name];
    }
});