G.component.Component = Class.create({
    initialize: function(options) {
        this.options = options || {};
        this.scene  = null;
        this.camera = null;

        this.loading = false;
        this.resourceCount = _.size(this.resources);
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

    setLoaderCache: function(cache){
        G.log("Component set loader cache",cache);
        this.cache = cache;
    },

    getResource: function(name){
        if(this.cache === null){
            G.error("No cache set for component, getting: " + name,this);
            return null;
        }
        if(this.resources[name] === undefined){
            G.error("No resource in component with name: " + name,this);
        }

        return this.cache.get(this.resources[name]);

    },

    getResourceByURL: function(url){
        if(this.cache === null){
            G.error("No cache set for component, getting: " + name,this);
            return null;
        }

        return this.cache.get(url);
    },

    buildScene: function(scene) {

    },

    getEventDispatcher: function() {
        return this.eventDispatcher;
    },

    setEventDispatcher: function(dispatcher) {
        this.eventDispatcher = dispatcher;
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