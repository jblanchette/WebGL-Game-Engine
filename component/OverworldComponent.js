G.component.OverworldComponent = Class.create(G.component.Component, {
    initialize : function($super, options) {
        $super(options);

    },

    events: {
        'mouseup': 'handleMouseUp'
    },

    resources: [
        'data/objects/GroundObject.js'
    ],

    buildScene : function() {

    },

    update : function() {

    },

    handleMouseUp: function(e){
        var coords = G.util.getEventCoords(event);
        return;
        this.getEventDispatcher().dispatchEvent({
            type: "ENTITY.Add",
            entityType: "IceHero",
            options: {x: coords.x, y: coords.y}
        });
    },

});
