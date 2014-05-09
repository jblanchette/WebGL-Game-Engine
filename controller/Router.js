G.controller.Router = Class.create({

    initialize: function() {
        var _this = this;
        this.loading = true;
        this.loader =
            new G.loader.ThreeLoader(_this.itemComplete.bind(this),
                                     _this.loadComplete.bind(this));

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

    itemComplete: function(url,result){
        G.log("Router.itemComplete " + url);
        G.log("Resource Count: " + G.resourceBank.count(), G.resourceBank.list);
    },

    loadComplete: function(){
        G.log('Router.loadComplete');
        this.loading = false;
        this.current.buildScene();
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

        controller.init();

        // TODO: For now, we will go into a blocking 'preload' if swap is true.
        if(swap){
            G.log("Controller preload: " + name + "Controller");
            this.loading = true;
            this.current = controller;
            controller.runPreload(this.loader);
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