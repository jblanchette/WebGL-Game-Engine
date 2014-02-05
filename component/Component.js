G.component.Component = Class.create({
    initialize: function(options) {
        this.options = options || [];
        this.scene  = null;
        this.camera = null;
        this.subscribeList = [];
    },

    buildScene: function() {

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
    }

});