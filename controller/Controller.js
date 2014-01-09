G.controller.Controller = Class.create({

    initialize: function() {
        this.updateable = [];
        this.components = [];
        this.scene = new THREE.Scene();
        this.camera = new THREE.Camera();
    },

    getUpdateable: function() {
        return this.updateable;
    },

    addUpdate: function(updateable) {
        this.updateable.push(updateable);
    },

    getComponents: function() {
        return this.components;
    },

    addComponent: function(component, update) {
        this.components.push(component);

        if (update === true) {
            this.addUpdate(component);
        }
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
        return G.eventDispatcher;
    }
});