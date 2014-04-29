G.loader.Loader = Class.create({
    initialize: function() {
        this.cache = new G.loader.LoaderCache();
        this.eventDispatcher = new THREE.EventDispatcher();
    },

    getEventDispatcher: function() {
        return this.eventDispatcher;
    },

    setEventDispatcher: function(dispatcher) {
        this.eventDispatcher = dispatcher;
    },

    load: function( url ){

    },

    hasBeenLoaded: function( url ){

    },

    start: function(){

    },

    itemEnd: function(){

    },

    progress: function(){

    },

    finish: function(){

    },

    error: function(){

    }
});