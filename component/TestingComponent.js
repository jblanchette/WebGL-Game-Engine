G.component.TestingComponent = Class.create(G.component.Component, {
    initialize: function($super, options) {
        $super(options);
        this.entities = [];
        this.EntityFactory = new G.factory.EntityFactory();
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
        this.addEntity("IceHero");
    },

    addEntity: function(type){
        var entity = this.EntityFactory.create(type);
        var scene = this.getScene();

        if(entity === null)
            return;

        scene.add(entity.getSceneGraph());
        this.entities.push(entity);
    },

    handleMouseMove: function(e){

    },

    handleMouseUp: function(e){

    },

    handleMouseDown: function(e){

    },

    handleKeyPress: function(e){

    },


    update: function() {
        _.each(this.entities, function(entity) {
            entity.update();
        });
    }

});