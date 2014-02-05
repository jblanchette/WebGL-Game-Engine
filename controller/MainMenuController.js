/**
 *
 * Main Menu Controller
 *
 */
G.controller.MainMenuController = Class.create(G.controller.Controller, {

    init: function(promises) {

        var scene = this.getScene();

        this.angle = 0;
        this.menu = new G.component.MenuComponent([
            'Play',
            'Continue',
            'Settings',
            'Quit',
            'Noobs Only'
        ]);

        this.menu.subscribe("mouseup",this.menu.handleMouseUp);


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
        });

        // Add Menu component with update
        this.addComponent(this.menu, true);

        // NOTE: Must be called for events to chain to their components.
        //       After this stage when a component wants to subscribe to
        //       an even it should use the router? Or maybe this should
        //       also use the router?
        this.setSubscribers();
        // Setup lights
        this.scene.add(new THREE.AmbientLight(0xeef0ff));

        // Setup camera
        this.camera = new THREE.PerspectiveCamera( 90, 1600 / 900, 1, 3000 );
        this.camera.position.set( 0, 0, 700 );
        this.addUpdate(this);
    },

    update: function() {
        this.camera.position.x = (Math.sin(this.angle)*150);
        this.camera.position.y = (Math.cos(this.angle)*150);
        this.camera.lookAt(new THREE.Vector3(0,0,0));
        this.angle+=.01;
    }
});
