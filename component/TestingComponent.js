G.component.TestingComponent = Class.create(G.component.Component, {
    initialize: function($super, options) {
        $super(options);

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

        var scene = this.getScene();
        var ed = this.getEventDispatcher();

        G.log("TestingComp buildScene");

        this.entity = new G.entity['Hero']({x: 0,y: 0, z: 0});

        scene.add(this.entity.getSceneObject());

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
        this.entity.update();
    }

});