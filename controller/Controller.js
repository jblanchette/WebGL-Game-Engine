G.controller.Controller = Class.create({

    initialize: function(isDestroyable) {

        this.destroyable =
            (arguments.length === 0) ? false : isDestroyable;

        this.updateable = [];
        this.destroyable = false;
        this.components = [];
        this.promises = [];
        this.scene = new THREE.Scene();
        this.camera = new THREE.Camera();
        this.eventDispatcher = new THREE.EventDispatcher();

        var _this = this;

        this.eventDispatcher.addEventListener('mousedown',_this.handleMouseDown,false);

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

    getComponents: function() {
        return this.components;
    },

    setSubscribers: function(){
        var comp = this.getComponents();
        var ED = this.getEventDispatcher();
        var sub;
        var subList,i,x;
        // Setup the components
        G.log("setting subscribers",comp.length);
        for(i = 0; i < comp.length; i++){
            subList = comp[i].getSubscribers();
            for(x = 0; x < subList.length; x++){
                sub = subList[x];
                if(sub !== undefined && sub.length == 2){
                    G.log("Added eventType",sub[0],sub[1]);
                    ED.addEventListener(sub[0],sub[1]);
                }
            }
        }
    },

    addComponent: function(component, update) {

        component.setScene(this.scene);
        component.setCamera(this.camera);

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

    handleMouseUp: function(e){
        G.log("controller got mouse up");
    },
    handleMouseDown: function(e){

    },
    handleMouseMove: function(e){

    },
    handleKeyDown: function(e){

    },
    handleMouseUp: function(e){

    },
});