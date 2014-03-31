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

    addEntity : function(type, sceneOptions) {


        var entity = this.EntityFactory.create(type, sceneOptions);
        var dispatcher = entity.getModel().getEventDispatcher();
        var scene = this.getScene();

        if (entity === null)
            return;

        if (sceneOptions !== undefined)
            entity.setSceneOptions(sceneOptions);

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
