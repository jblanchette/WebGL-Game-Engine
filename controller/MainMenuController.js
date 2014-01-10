/**
 *
 * Main Menu Controller
 *
 */
G.controller.MainMenuController = Class.create(G.controller.Controller, {

    init: function() {
        this.angle = 0;
        this.menu = new G.component.MenuComponent([
            'Play',
            'Continue',
            'Settings',
            'Quit',
            'Noobs Only'
        ]);

        var dome = new THREE.SphereGeometry(1000, 20, 20);
        var domeMaterial = new THREE.MeshLambertMaterial({
            map: G.textures.space,
            side: THREE.DoubleSide,
        });
        var domeMesh = new THREE.Mesh(dome, domeMaterial);
        this.scene.add(domeMesh);

        // Add Menu component with update
        this.addComponent(this.menu, true);

        // Setup Scene
        //this.scene.fog = new THREE.Fog( 0x000000, -100, 2000 );

        var dirLight = new THREE.DirectionalLight( 0xffffff, 0.8 );
        dirLight.position.set(0,0,1).normalize();
        this.scene.add(dirLight);

        var pointLight = new THREE.PointLight( 0xffffff, 20.5 );
        pointLight.position.set( 0, 0, 800 );
        this.scene.add( pointLight );

        // Setup camera
        this.camera = new THREE.PerspectiveCamera( 90, 1600 / 900, 1, 2000 );
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
