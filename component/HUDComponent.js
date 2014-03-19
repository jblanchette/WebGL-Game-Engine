G.component.HUDComponent = Class.create(G.component.Component, {
    initialize: function($super,options) {
        $super(options);
        this.HUD = new G.model['HUD'];

    },
    buildScene: function() {

        var scene = this.getScene();
        var ed = this.getEventDispatcher();
        var _this = this;

        ed.addEventListener("keydown",     function(e){_this.handleKeyDown(e)});
        ed.addEventListener("unitSelect",  this.updateSelection.bind(this));
        ed.addEventListener("unitMoveEnd", this.updateSelection.bind(this));

        /*
        // Load Texture
        this.loadTexture('./textures/space.jpg', function(texture) {
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

            var dome = new THREE.SphereGeometry(1500, 100, 100);
            var domeMaterial = new THREE.MeshPhongMaterial({
                color: 0x000000,
                side: THREE.BackSide,
                map: texture
            });

            var domeMesh = new THREE.Mesh(dome, domeMaterial);
            scene.add(domeMesh);
        });*/


        scene.add(this.HUD.getMesh());

    },
    update: function() {
        this.HUD.update();
    },
    handleModifiers: function(event){
      // Handle Modifiers is used specifially (at the moment) for modifier keys
      // The "event" that is send has a few flags.
      // Flags: shiftKey, altKey, ctrlKey
      // Other keys: A, M
      G.mAlt = event.altKey;
      G.mCtrl = event.ctrlKey;
      G.mShift = event.shiftKey;

    },

    updateSelection: function(event){
        var unit = event.currentUnit;

        this.HUD.setText("hp","HP: "  + unit.currentHP + "/" + unit.maxHP);
        this.HUD.setText("mp","Pos: " + unit.getPositionString());
    },
    handleKeyDown: function(event){
        if(event.keyCode == 38){
            //up
            this.HUD.getMesh().position.x -= 1;
        }else if(event.keyCode == 40){
            //down
            this.HUD.getMesh().position.x += 1;
        }
        G.log(this.HUD.getMesh().position.x);
    },
    handleClick: function(event) {
       // (1 = left, 2 = middle,3 = right)
       // We want left clicks for the HUD
       if(event.which && event.which == 1){
        var coords = G.util.getEventCoords(event);
        G.log("clicked HUD",coords);
        //var intersects = G.util.getCoordIntersect(coords.x, coords.y, [this.groundMesh]);

        if (intersects.length > 0) {

        }
       }

    }
});