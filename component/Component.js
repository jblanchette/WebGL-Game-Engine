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

    setResource : function(event) {

        // don't listen to load events if we aren't flagged as loading.
        if (this.loading) {
            var resultUrl = event.url;
            var _this = this;
            var hit = false;
            _.each(this.resources, function(url, name) {
                if (url === resultUrl) {
                    G.log("Setting Resource", name, url);
                    _this._loaded[name] = event.result;
                    hit = true;
                }
            });

            if(hit){
                G.log("Got hit, checking size",_.size(this._loaded),this.resourceCount);
                if (_.size(this._loaded) >= this.resourceCount) {
                        G.log("Component finished loading");
                        this.loading = false;
                }
            }
        }
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