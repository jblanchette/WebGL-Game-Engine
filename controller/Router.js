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
    setFocus: function(route){

        var nRoute = this.controllers[route];
        if(nRoute !== undefined){
            G.log("Set focus to",route);
            this.current = nRoute;
        }
    },
    load: function(controllerName,setToFocus) {
        // Log Current Controller
        G.log("Loading Controller: " + controllerName);

        var setToFocus = (arguments.length === 1) ? false : setToFocus;

        if(this.controllers[controllerName] !== undefined){
            if(setToFocus){
                this.setFocus(controllerName);
                return;
            }else{
                G.log("Controller already exists," +
                       + "did you forget the second argument?");
            }

            return;
        }

        // Init Controller
        var controller = new G.controller[controllerName + 'Controller'];

        // Init controller with promises
        if(this.getCurrent() === null){
            this.loading = true;
        }
        controller.init();

        this.controllers[controllerName] = controller;

        // Setup the components
        controller.getComponents().each(function(component){
            component.buildScene(controller.getScene(), controller.getPromises());
        });

        if(setToFocus){
            this.setFocus(controllerName);
        }

        var _this = this;

        RSVP.all(controller.getPromises()).then(function(objects) {

            G.log('Controller finished loading');
            _this.loading = false;

        }).catch(function(error) {

            console.log('Could not initiate controller: ', error);

        });
    }

});