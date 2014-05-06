G.component.InputComponent = Class.create(G.component.Component, {
    initialize : function($super, options) {
        $super(options);

    },

    events: {
        'mousedown': 'handleMouseDown',
        'mouseup':   'handleMouseUp',
        'mousemove': 'handleMouseMove'
    },

    handleMouseDown: function(e){
        G.log("Mouse Down",e);
    },

    handleMouseUp: function(e){

    },

    handleMouseMove: function(e){

    },

    buildScene : function() {

    },

    update : function() {

    },

});
