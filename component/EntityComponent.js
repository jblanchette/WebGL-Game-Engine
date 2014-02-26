G.component.EntityComponent = Class.create(G.component.Component, {
    initialize: function($super,options) {
        $super(options);
        this.scrollSpeed = 10;
        this.units = [];
        this.currentUnit = null;
    },

    buildScene: function() {

        var scene = this.getScene();
        var _this = this;
        var ed = this.getEventDispatcher();

         // Add event listeners
        ed.addEventListener("mousedown",function(e){_this.handleMouseDown(e)});
        ed.addEventListener("keypress" ,function(e){_this.handleKeyPress(e)});
        ed.addEventListener("keydown"  ,function(e){_this.handleModifiers(e)});
        ed.addEventListener("keyup"    ,function(e){_this.handleModifiers(e)});

        this.groundMaterial = new THREE.MeshNormalMaterial({transparent: true, opacity: 1});
        this.groundMesh = new THREE.Mesh(new THREE.CubeGeometry(3500, 1, 3000), this.groundMaterial);
        this.groundMesh.position.x = 0;
        this.groundMesh.position.y = 0;
        this.groundMesh.position.z = 0;

        //scene.add(this.groundMesh);
        this.addEntity("Unit",{position: {x: 0,y: 0,z: 0}});

    },
    selectEntity: function(entity){
        this.currentUnit = entity;
    },
    addEntity: function(entityType, sceneOptions){

        var e = new G.model['Entity' + entityType]();

        e.setSceneOptions(sceneOptions);
        this.getScene().add(e.getMesh());

        if(this.units.length == 0){
            this.selectEntity(e);
        }

        this.units.push(e);

    },

    update: function() {
        for(var i = 0; i < this.units.length; i++){
            if(this.units[i])
                this.units[i].update();
        }
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

    handleKeyPress: function(event){
        //G.log("Key:",event.keyCode);
        // A = 65, M = 77

    },

    handleMouseDown: function(event) {
       // (1 = left, 2 = middle,3 = right)

       if(this.currentUnit !== null){
        if(event.which && event.which == 3){
            var coords = G.util.getEventCoords(event);

            var intersects = G.util.getCoordIntersect(coords.x, coords.y, [this.groundMesh]);
            var p;

            if (intersects.length > 0) {

                p = intersects[0].point;
                if(G.mA) G.log("A click");
                if(G.mM) G.log("M click");
                this.currentUnit.addCommand('Move',p);
            }
        }

       }

    }
});