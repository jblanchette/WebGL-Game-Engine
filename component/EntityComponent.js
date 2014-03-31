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
        this.addEntity("IceHero", {position : {x : 100, y : 0}});
    },

    addEntity : function(type) {

        var entity = this.EntityFactory.create(type);
        var model = entity.getModel();
        var scene = this.getScene();

        var dispatcher = model.getEventDispatcher();
        _.each(entity.events, function(fn, eventName) {
            dispatcher.addEventListener(eventName, _.bind(entity[fn], entity));
        });

        scene.add(entity.getSceneGraph());
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
