G.component.EntityComponent = Class.create(G.component.Component, {
    initialize : function($super, options) {
        $super(options);
        this.entities = [];
        this.EntityFactory = new G.factory.EntityFactory();

    },

    events: {
        'ENTITY.Add':    'handleEntityEvent',
        'ENTITY.Remove': 'handleEntityEvent'
    },

    resources: {
        GroundObject: "data/objects/TestObject.js"
    },

    buildScene : function() {
        G.log("EntityComp.buildScene");
    },

    handleEntityEvent: function(event){
        G.log("Entity Event",event.type);
        G.log("Event Result Callback:", event.callback);
        var result;
        switch(event.type){
            case "ENTITY.Add":
                result = this.addEntity(event.entityType,event.options);
                if(_.isFunction(event.callback)){
                    G.log("Got a callback");
                    event.callback(result);
                }
            break;
            case "ENTITY.Remove":
                // @TODO: Remove an entity
            break;
        }
    },

    /**
     *
     * @param {String} type The Entity Type
     * @param {Object} options Options for the Model, SceneGraph, and Entity
     *
     * @returns {G.entity.Entity} The new Entity that was added
     *
     */
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

        return entity;
    },

    update : function() {
        _.each(this.entities, function(entity) {
            entity.update();
        });
    },

});
