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

        var entity = new G.entity['Player']();

        G.log("TestComp entity", entity);

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

    }

});