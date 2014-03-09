G.component.EntityComponent = Class.create(G.component.Component, {
    initialize: function($super,options) {
        $super(options);
        this.scrollSpeed = 10;
        this.entities = [];
        this.entityMeshes = [];

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
        this.addEntity("Unit",{position: [0,0,0]});

        this.addEntity("Unit",{position: [50,0,0]});

    },
    selectEntity: function(entity){
        this.currentUnit = entity;
    },
    addEntity: function(entityType, sceneOptions){

        var e = new G.model['Entity' + entityType]();
        var eMesh = e.getMesh();

        e.setSceneOptions(sceneOptions);
        this.getScene().add(e.getMesh());

        if(this.entities.length == 0){
            this.selectEntity(e);
        }

        eMesh.eID = this.entities.length;
        this.entities.push(e);
        this.entityMeshes.push(eMesh);

    },

    update: function() {
        for(var i = 0; i < this.entities.length; i++){
            if(this.entities[i])
                this.entities[i].update();
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

        if (event.which) {

            var coords = G.util.getEventCoords(event);

            // Check intersections with entities and the ground mesh
            var entityInt = G.util.getCoordIntersect(coords.x, coords.y, this.entityMeshes);
            var groundInt = G.util.getCoordIntersect(coords.x, coords.y, [this.groundMesh]);

            var p;

            // Right Click


            if (entityInt.length > 0) {

                var obj = entityInt[0].object;

                if(obj !== null){
                    var eID = obj.eID;
                    if(eID !== undefined && this.entities[eID] !== undefined){
                        var e = this.entities[eID];
                        G.log("Clicked", eID, e.getType(), e.getTypeBase());

                        if(event.which == 1){
                            this.selectEntity(e);
                        }
                    }

                }

            }

            if (groundInt.length > 0) {

                if (event.which === 3) {
                    p = groundInt[0].point;

                    if (G.mA)
                        G.log("A click");
                    if (G.mM)
                        G.log("M click");
                    this.currentUnit.addCommand('Move', p);
                }
            }
        }


    }
});