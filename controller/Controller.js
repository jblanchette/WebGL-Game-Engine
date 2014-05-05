G.controller.Controller = Class.create({

    initialize: function(isDestroyable) {
        this.destroyable = isDestroyable || false;
        this.updateable = [];
        this.destroyable = false;
        this.components = [];
        this.scene = new THREE.Scene();
        this.camera = new THREE.Camera();
        this.resourceBank = null;

        this.loading = false;
        this._loaded = {};

        this.eventDispatcher = new THREE.EventDispatcher();

        var _this = this;
        G.globalDispatcher.addEventListener("LOADER.Finish",function(e){
            _this.setResource(e);
        });

    },

    resources: {

    },

    getResource: function(name){
        var localName = this.resources[name];
        if(localName === undefined){
            G.error("No resource in controller with name: " + name,this);
        }

        return this.ResourceBank.get(localName);
    },

    getResourceByURL: function(url){
        return this.resourceBank.get(url);
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
        // Start with the Controllers resources
        var result = _.pairs(this.resources);
        // Flag the controller as loading
        this.loading = true;

        _.each(this.components, function(component) {
            component.loading = true;
            result = _.union(result,_.pairs(component.resources));
        });

        G.log("****************************");
        G.log("Result before",result);

        result = _.uniq(result,false,function(o){
            return o[0];
        });

        G.log("Result after",result);
        G.log("****************************");
        return;

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
        component.setResourceBank(this.resourceBank);
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