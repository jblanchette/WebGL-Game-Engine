G.component.PlayerComponent = Class.create(G.component.Component, {
    initialize: function($super,options) {
        $super(options);
        this.scrollSpeed = 10;
        this.hero = new G.model['Player'];
        this.heroMesh = null;
        this.units = [];

        G.log("init playercomp");
        // Add event listener
        var _this = this;

        G.eventDispatcher.addEventListener('mousedown', function(e) {
            _this.handleClick(e);
        });
        G.eventDispatcher.addEventListener('keypress',   function(e) {
            _this.handleKeyPress(e);
        });
        G.eventDispatcher.addEventListener('keydown',   function(e) {
            _this.handleModifiers(e);
        });
        G.eventDispatcher.addEventListener('keyup',   function(e) {
            _this.handleModifiers(e);
        });

    },
    buildScene: function() {

        var scene = this.getScene();

        this.groundMaterial = new THREE.MeshNormalMaterial({transparent: true, opacity: 1});
        this.groundMesh = new THREE.Mesh(new THREE.CubeGeometry(3500, 1, 3000), this.groundMaterial);
        this.groundMesh.position.x = 0;
        this.groundMesh.position.y = 0;
        this.groundMesh.position.z = 0;

        scene.add(this.groundMesh);
        scene.add(this.hero.Mesh);

        G.cModule.addUpdate(this.hero);

    },
    update: function() {

    },
    handleModifiers: function(event){
      // Handle Modifiers is used specifially (at the moment) for modifier keys
      // The "event" that is send has a few flags.
      // Currently tracking shift, alt, and control
      // Flags: shiftKey, altKey, ctrlKey
      G.mAlt = event.altKey;
      G.mCtrl = event.ctrlKey;
      G.mShift = event.shiftKey;

    },
    handleKeyPress: function(event){
        //G.log("Key:",event.keyCode);
    },
    handleClick: function(event) {
       // (1 = left, 2 = middle,3 = right)
       if(event.which && event.which == 3){
        var coords = G.util.getEventCoords(event);

        var intersects = G.util.getCoordIntersect(coords.x, coords.y, [this.groundMesh]);
        var p;

        if (intersects.length > 0) {

            p = intersects[0].point;
            if(G.mShift){
                G.log("held shift adding to queue");
                this.hero.pushCommand('Move', p);
            }else{
                this.hero.addCommand('Move', p);
            }
        }
       }

    }
});