G.component.GroundComponent = Class.create(G.component.Component, {
    initialize : function($super, options) {
        $super(options);

    },

    testCallback: function(){
        G.log("Test Callback!!!!",arguments);
    },

    buildScene : function() {
        G.log("**** GroundComp Build Scene");
        var _this = this;
        this.getEventDispatcher().dispatchEvent({
            type : 'ENTITY.Add',
            entityType: 'Ground',
            options: {id: "GROUND"},
            callback: _this.testCallback
        });
    },

    update : function() {

    },

});
