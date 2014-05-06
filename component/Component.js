G.component.Component = Class.create({
    initialize: function(options) {
        this.options = options || {};
        this.scene  = null;
        this.camera = null;
    },

    events: {

    },

    resources: {

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