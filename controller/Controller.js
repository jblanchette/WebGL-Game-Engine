G.controller.Controller = Class.create({

    initialize: function(isDestroyable) {
        this.destroyable = isDestroyable || false;
        this.updateable = [];
        this.destroyable = false;
        this.components = [];
        this.scene = new THREE.Scene();
        this.camera = new THREE.Camera();
        this.cache = null;

        this.loading = false;
        this.resourceCount = _.size(this.resources);
        this._loaded = {};

        this.eventDispatcher = new THREE.EventDispatcher();

        var _this = this;
        G.globalDispatcher.addEventListener("LOADER.Finish",function(e){
            _this.setResource(e);
        });

    },

    resources: {

    },

    setLoaderCache: function(cache){
        this.cache = cache;
    },

    getResource: function(name){
        if(this.cache === null){
            G.error("No cache set for controller, getting: " + name,this);
            return null;
        }
        if(this.resources[name] === undefined){
            G.error("No resource in controller with name: " + name,this);
        }

        return this.cache.get(this.resources[name]);

    },

    getResourceByURL: function(url){
        if(this.cache === null){
            G.error("No cache set for controller, getting: " + name,this);
            return null;
        }

        return this.cache.get(url);
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

    loadResources: function(loader) {

        var resultList = _.uniq(_.values(this.resources).sort(),true);
        var uniqueComponentList;

        this.loading = true;

        _.each(this.components, function(component) {

            component.loading = true;

            // Get the unique list of URL values from the component resources.
            // Underscore provides an optimized algorithm for sorted lists.
            uniqueComponentList =
                _.uniq(_.values(component.resources).sort(),true);

            // Concat() doesn't play nice with an empty array, it seems.
            if(resultList.length === 0){
                resultList = uniqueComponentList;
            }else{
                // Array.concat will also take out duplicate entries
                resultList.concat(uniqueComponentList);
            }

        });

        G.log("Loading List:",resultList);
        _.each(resultList, function(url){
            loader.load(url);
        });

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
        component.setLoaderCache(this.cache);
        
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