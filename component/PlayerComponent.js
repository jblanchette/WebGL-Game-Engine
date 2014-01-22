G.component.PlayerComponent = Class.create(G.component.Component, {
    initialize: function(camera) {
        this.options = [];
        this.pcamera = camera; // i used pcamera since its a ref to the camera from the controller
        this.scrollSpeed = 10;
        this.hero = new G.model['Player'];
        this.heroMesh = null;
        this.units = [];
    },
    buildScene: function(scene) {

        this.groundMaterial = new THREE.MeshNormalMaterial();
        this.groundMesh = new THREE.Mesh(new THREE.CubeGeometry(3500, 1, 3000), this.groundMaterial);
        this.groundMesh.position.x = 0;
        this.groundMesh.position.y = 0;
        this.groundMesh.position.z = 0;
        //this.groundMesh.rotation.x = THREE.Math.degToRad(60);
        scene.add(this.groundMesh);
        scene.add(this.hero.Mesh);



        // Add event listener
        var _this = this;
        G.eventDispatcher.addEventListener('click', function(e) {
            _this.handleClick(e);
        });
    },
    update: function() {

        this.hero.update();

        if (G.keyboard.pressed("left")) {
            this.hero.getRotation().y += 0.05;
            G.log(this.hero.getRotation().y,THREE.Math.radToDeg(this.hero.getRotation().y) % 360);
        } else if (G.keyboard.pressed("right")) {
            this.hero.getRotation().y -= 0.05;
            G.log(this.hero.getRotation().y,THREE.Math.radToDeg(this.hero.getRotation().y) % 360);
        } else if (G.keyboard.pressed("up")) {
            this.pcamera.position.z -= this.scrollSpeed;
            this.pcamera.updateProjectionMatrix();
        } else if (G.keyboard.pressed("down")) {
            this.pcamera.position.z += this.scrollSpeed;
            this.pcamera.updateProjectionMatrix();
        }
    },
    handleClick: function(event) {

        var coords = G.util.getEventCoords(event);

        var intersects = G.util.getCoordIntersect(coords.x, coords.y, [this.groundMesh]);
        var p;

        if (intersects.length > 0) {
            p = intersects[0].point;
            this.hero.addCommand('Walk', p);
        }


    }
});