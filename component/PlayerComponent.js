G.component.PlayerComponent = Class.create(G.component.Component, {

    initialize: function(camera) {
        this.options = [];
        this.pcamera = camera; // i used pcamera since its a ref to the camera from the controller
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

        if(G.keyboard.pressed("left")){
            this.pcamera.position.x -= 5;
        }else if(G.keyboard.pressed("right")){
            this.pcamera.position.x += 5;
        }else if(G.keyboard.pressed("up")){
            this.pcamera.position.z -= 5;
        }else if(G.keyboard.pressed("down")){
            this.pcamera.position.z += 5;
        }
    },

    handleClick: function(event) {
        var coords = G.util.getEventCoords(event);
        G.log("Player click: ", coords.x, coords.y);
        //this.hero.addCommand('Walk',{x:coords.x,y:coords.y});

    }
});