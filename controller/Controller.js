G.controller.Controller = Class.create({

    initialize: function(isDestroyable) {
        this.destroyable = isDestroyable || false;
        this.updateable = [];
        this.destroyable = false;
        this.components = [];
        this.promises = [];
        this.scene = new THREE.Scene();
        this.camera = new THREE.Camera();
        this.eventDispatcher = new THREE.EventDispatcher();
        this.resourceSet = null;
    },

    resources: [

    ],

    getResource: function(url){

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

    /**
     * getResources - Returns a list of the resources needed to be loaded
     *                from the Router loader instance.
     * @returns {Array} List of resource url's
     */
    getResources: function() {
        var result = this.resources;

        // The Array.prototype.concat() function will join two
        // array's and it will also take out duplicate entries from the list.
        _.each(this.components, function(component) {
            // pluck out the 1 index in each resource sub-array
            // the Array contains [ resourceName, resourceURL]
            // so we simply take out the 1 position in the Array.

            var resources = omponent.resources;
            var names = _.pluck(resources,0);
            var urls  = _.pluck(recources,1);
            
            if(result.length == 0){
                result = urls;
            }else{
                // concat didn't play nice with an empty starting array
                result.concat(urls);
            }
            G.log("after concat",result);
        });

        G.log("getResources",result);
        return result;
    },

    getComponents: function() {
        return this.components;
    },

    addComponent: function(component, update) {
        //G.log("adding component",component);
        var dispatcher = this.getEventDispatcher();

        component.setScene(this.scene);
        component.setCamera(this.camera);
        component.setEventDispatcher(dispatcher);

        //G.log("binding component events",component.events);
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

    addPromise: function(callback) {
        this.promises.push(new RSVP.Promise(callback));

        return this;
    },

    setPromises: function(promises) {
        this.promises = promises;

        return this;
    },

    getPromises: function() {
        return this.promises;
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