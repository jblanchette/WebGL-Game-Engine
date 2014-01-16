G.component.EntityComponent = Class.create(G.component.Component, {

    initialize: function(options) {
        this.options = options || [];
        this.members = [];
    },

    buildScene: function(scene) {

        // Add event listener
        var _this = this;
        G.eventDispatcher.addEventListener('click', function(e) {
            _this.handleClick(e);
        });
    },

    update: function() {

    },

    handleClick: function(event) {

    }
});