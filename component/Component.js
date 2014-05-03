G.component.Component = Class.create({
    initialize: function(options) {
        this.options = options || {};
        this.scene  = null;
        this.camera = null;

        this.loading = false;
        this.resourceBank = null;
        this._loaded = {};

        var _this = this;
        G.globalDispatcher.addEventListener("LOADER.Finish",function(e){
            _this.setResource(e);
        });
    },

    events: {

    },

    resources: {

    },

    getResource : function(name) {
        var localName = this.resources[name];
        if (localName === undefined) {
            G.error("No resource in component with name: " + name, this);
        }

        return this.ResourceBank.get(localName);
    },

    getResourceByURL : function(url) {
        return this.resourceBank.get(url);
    },

    buildScene: function(scene) {

    },

    getEventDispatcher: function() {
        return this.eventDispatcher;
    },

    setEventDispatcher: function(dispatcher) {
        this.eventDispatcher = dispatcher;
    },

    setResourceBank: function(bank){
        this.resourceBank = bank;
    },

    getResourceBank: function(){
        return this.resourceBank;
    },

    setScene: function(scene) {
        this.scene = scene;
    },

    setCamera: function(camera){
        this.camera = camera;
    },

    getScene: function(){
         return this.scene;
    },

    getCamera: function(){
        return this.camera;
    },

    /**
     * @TODO: I wanna move this stuff to a global service and inject it from the
     * controller that way it's shared and not repeated in every component
     */
    handleModifiers: function(event) {
        G.mAlt = event.altKey;
        G.mCtrl = event.ctrlKey;
        G.mShift = event.shiftKey;
    }
});