G.model.Router = Class.create({
    initialize: function() {
        this.entries = [];
    },
    add: function(route){
        this.entries.push(route);
    },
    remove: function(route){

    },
    destroy: function(route){

    },

    /**
 * Load a Controller
 */
    loadController: function(controllerName) {

        // Log Current Controller
        G.log("Loading Controller: " + controllerName);

        var old = G.cModule;

        // Init Controller
        var controller = new G.controller[controllerName + 'Controller'];

        // Init controller with promises
        G.loading = true;

        G.eventDispatcher._listeners = [];

        controller.init();

        // Set current Module
        G.cModule = controller;

        // Setup the components
        G.cModule.getComponents().each(function(component){
        component.buildScene(G.cModule.getScene(), controller.getPromises());
        });

        RSVP.all(controller.getPromises()).then(function(objects) {

            G.log('Controller finished loading');
            G.loading = false;

        }).catch(function(error) {

            console.log('Could not initiate controller: ', error);

        });
    }

});