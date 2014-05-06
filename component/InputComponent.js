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
         this.getEventDispatcher().dispatchEvent({
            type : 'ENTITY.Add',
            entityType: 'Ground'
        });
    },

    handleMouseUp: function(e){

    },

    handleMouseMove: function(e){

    },

    resources: {

    },

    buildScene : function() {

    },

    update : function() {

    },

});
