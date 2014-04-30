G.component.EntityComponent = Class.create(G.component.Component, {
    initialize : function($super, options) {
        $super(options);
        this.entities = [];
        this.EntityFactory = new G.factory.EntityFactory();

    },

    events: {
        'mousemove':     'handleMouseMove',
        'mousedown':     'handleMouseDown',
        'mouseup':       'handleMouseUp',
        'keypress':      'handleKeyPress',
        'ENTITY.Add':    'handleEntityEvent',
        'ENTITY.Remove': 'handleEntityEvent'
    },

    resources: {
        GroundObject: "data/objects/GroundObject.js"
    },

    buildScene : function() {
        G.log("EntityComp.buildScene");
    },

    handleEntityEvent: function(event){
        G.log("Entity Event",event.type,event);
        G.log("Event data",event.entityType,event.options);
        //this.addEntity(event.entityType,event.options);
    },

    addEntity : function(type,options) {

        var entity = this.EntityFactory.create(type,options);
        var model = entity.getModel();
        var sceneGraph = entity.getSceneGraph();
        var scene = this.getScene();

        var dispatcher = model.getEventDispatcher();

        // Add the sceneGraph to the sceen, bind the events to it, then sync.

        sceneGraph.buildScene(scene,model);

        _.each(sceneGraph.events, function(fn, eventName) {
            dispatcher.addEventListener(eventName, _.bind(sceneGraph[fn], sceneGraph));
        });

        model.syncAll();

        this.entities.push(entity);
    },

    update : function() {
        _.each(this.entities, function(entity) {
            entity.update();
        });
    },

    handleMouseMove: function(e){

    },

    handleMouseUp: function(e){

    },

    handleMouseDown: function(e){
        G.log("mouse down");
        G.log("Resource Test:",this.getResource("GroundObject"));
    },

    handleKeyPress: function(e){

    }

});
