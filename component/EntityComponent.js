G.component.EntityComponent = Class.create(G.component.Component, {
    initialize : function($super, options) {
        $super(options);

        this.entities = [];
        this.EntityFactory = new G.factory.EntityFactory();

    },

    events : {
        'mousemove' : 'handleMouseMove',
        'mousedown' : 'handleMouseDown',
        'mouseup' : 'handleMouseUp',
        'keypress' : 'handleKeyPress',
        'keydown' : 'handleModifiers',
        'keyup' : 'handleModifiers'
    },

    buildScene : function() {
        this.addEntity("IceHero", {position : {x : 100, y : 0}});
    },

    addEntity : function(entityType, sceneOptions) {


        var entity = this.EntityFactory.create(type, scene);
        var dispatcher = entity.getModel().getEventDispatcher();
        var scene = this.getScene();

        if (entity === null)
            return;

        _.each(this.events, function(fn, eventName) {
            dispatcher.addEventListener(eventName, _.bind(this.events[fn], this));
        });

        if (sceneOptions !== undefined)
            entity.setSceneOptions(sceneOptions);

        scene.add(entity.getSceneGraph());
        this.entities.push(entity);
    },

    update : function() {
        _.each(this.entities, function(entity) {
            entity.update();
        });
    }

});
