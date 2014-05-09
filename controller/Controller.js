G.controller.Controller = Class.create({

    initialize: function(isDestroyable) {
        this.destroyable = isDestroyable || false;
        this.updateable = [];
        this.destroyable = false;
        this.components = [];
        this.scene = new THREE.Scene();
        this.camera = new THREE.Camera();
        this.eventDispatcher = new THREE.EventDispatcher();

        G.log("**** RAN CONTROLLER INITIALIZE");

    },

    preload: {
        resources: {

        }
    },


    setDestroyable: function(isDestroyable){
        this.destroyable = isDestroyable;
    },

    isDestroyable: function(){
        return this.destroyable;
    },

    getUpdateable: function() {
        return this.updateable;
    },

    addUpdate: function(updateable) {
        this.updateable.push(updateable);
    },

    runPreload: function(loader) {
        // Start with the Controllers resources
        G.log("preload", this.preload, this.preload.resources);
        var result = _.pairs(this.preload.resources);
        // union the pairs from each fcomponent to the result list
        _.each(this.components, function(component) {
            result = _.union(result, _.pairs(component.preload.resources));
        });

        if (result.length > 0) {
            // get the unique list of pairs by comparing against the
            // localname (the first item in the pair) using the
            // underscore unique method's iterator argument
            result = _.uniq(result, false, function(o) {
                return o[0];
            });

            G.log("Resource Load pairs:", result);
            // Pass each pair [ LocalName,URL ] to the loader
            // The name gets added to the resource bank, url is
            // used by the cache
            _.each(result, function(pair) {
                loader.load(pair[0], pair[1]);
            });
        }


    },

    getComponents: function() {
        return this.components;
    },

    addComponent: function(component, update) {
        var dispatcher = this.getEventDispatcher();

        // Inject Scene, Camera, and EventDispatcher for controller to component
        component.setScene(this.scene);
        component.setCamera(this.camera);
        component.setEventDispatcher(dispatcher);

        // Bind component events
        _.each(component.events, function(fn, eventName) {
            dispatcher.addEventListener(eventName, _.bind(component[fn], component));
        });

        this.components.push(component);

        if (update === true) {
            this.addUpdate(component);
        }
    },

    loadTexture: function(url, callback) {
        this.addPromise(function(resolve, reject) {
            THREE.ImageUtils.loadTexture(url, undefined, function(texture) {
                callback(texture);
                resolve(texture);
            }, function(error) {
                reject(error);
            })
        });
    },

    buildScene: function(){
        G.log("*** CALLING Controller.buildScene()");
        _.each(this.components,function(component){
            component.buildScene();
        });
    },

    getScene: function() {
        return this.scene;
    },

    setScene: function(scene) {
        this.scene = scene;

        return this;
    },

    getCamera: function() {
        return this.camera;
    },

    setCamera: function(camera) {
        this.camera = camera;

        return this;
    },

    getEventDispatcher: function() {
        return this.eventDispatcher;
    },
});