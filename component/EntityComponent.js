G.component.EntityComponent = Class.create(G.component.Component, {
    initialize: function($super, options) {
        $super(options);
        this.scrollSpeed = 10;
        this.entities = [];

        this.boxStarted = false;
        this.boxCoords = [];


    },

    events: {
        'mousemove':    'handleMouseMove',
        'mousedown':    'handleMouseDown',
        'mouseup':      'handleMouseUp',
        'keypress':     'handleKeyPress',
        'keydown':      'handleModifiers',
        'keyup':        'handleModifiers'
    },

    buildScene: function() {
        // not sure what to do here.  possibly have things already assigned do some preload?
        // maybe this gets called more than once and is just a
        //  - generic iteration through everything -> add to scene
    },

    addEntity: function(entityType, sceneOptions) {

       var newEntity = new G.entity[entityType];

       newEntity.Model.

       if(this.Model === null)
            return null;

        var dispatcher = this.Model.getEventDispatcher();

       _.each(this.events, function(fn, eventName) {
            dispatcher.addEventListener(eventName, _.bind(this.events[fn], this));
       });


    },



    update: function() {
        _.each(this.entities, function(entity) {
            entity.update();
        });
    }

});
