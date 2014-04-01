G.component.EntityComponent = Class.create(G.component.Component, {
    initialize : function($super, options) {
        $super(options);
        G.log("starting entity comp");
        this.entities = [];
        this.EntityFactory = new G.factory.EntityFactory();

    },

    events: {
        'mousemove': 'handleMouseMove',
        'mousedown': 'handleMouseDown',
        'mouseup':   'handleMouseUp',
        'keypress':  'handleKeyPress'
    },

    buildScene : function() {
        this.addEntity("IceHero", {x : 100, y : 0, z: 10});
    },

    addEntity : function(type,options) {
        G.log("addingEntity");
        var entity = this.EntityFactory.create(type,options);
        G.log("created ok");
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

    },

    handleKeyPress: function(e){

    }

});
