G.controller.Router = Class.create({

    initialize: function() {
        var _this = this;
        this.loading = true;
        this.loader = new G.loader.ThreeLoader(_this.loadComplete.bind(this));
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
        if(controller === null){
            G.error("Controller " + controllerName + " not found.");
            return;
        }

        controller.setLoaderCache(this.loader.getCache());
        controller.init();

        // TODO: For now, we will go into a blocking 'preload' if swap is true.
        if(swap){
            G.log("Swap true");
            // Load Resources
            G.log("Controller.loadResources",name + "Controller");
            this.loading = true;
            this.current = controller;
            controller.loadResources(this.loader);
            // the controller.init() call happens when the load triggers the
            // loadComplete() callback to the router.
        }



    },

    get: function(name) {
        if (!this.controllers[name]) {
            var controller = this.controllers[name] = new G.controller[name + 'Controller'];
            return this.controllers[name];
        }

        return null;
    }
});