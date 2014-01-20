G.component.PlayerComponent = Class.create(G.component.Component, {

    initialize: function(options) {
        this.options = options || [];
        this.hero = new G.model['Player'];
        this.heroMesh = null;
        this.units = [];
    },

    buildScene: function(scene) {
            scene.add(this.hero.Mesh);



        // Add event listener
        var _this = this;
        G.eventDispatcher.addEventListener('click', function(e) {
            _this.handleClick(e);
        });
    },

    update: function() {

        this.hero.update();

    },

    handleClick: function(event) {
        var coords = G.util.getEventCoords(event);
        G.log("Player click: ", coords.x, coords.y);
        //this.hero.addCommand('Walk',{x:coords.x,y:coords.y});
    }
});