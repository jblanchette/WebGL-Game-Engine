G.component.EnemyComponent = Class.create(G.component.Component, {

    initialize: function(options) {
        this.options = options || [];
        this.enemies = [];
        this.particles = [];
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