
G.controller.MainMenuController = function() {

    this.init = function(eventDispatcher) {
        this.menu = new G.component.MenuComponent([
            'Play',
            'Continue',
            'Settings',
            'Quit'
        ]);

        // Setup Scene
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.Fog( 0x000000, 250, 1400 );

        var dirLight = new THREE.DirectionalLight( 0xffffff, 0.125 );
        dirLight.position.set(0,0,1).normalize();
        this.scene.add(dirLight);

        var pointLight = new THREE.PointLight( 0xffffff, 1.5 );
        pointLight.position.set( 0, 100, 90 );
        this.scene.add( pointLight );

        // Setup camera
        this.camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 1, 1500 );
	this.camera.position.set( 0, 400, 700 );

        // Save event dispatcher
        this.eventDispatcher = eventDispatcher;
        this.eventDispatcher.addEventListener('click', function(){ alert('clicked!'); });
    }

    this.angle = 0;
    this.update = function() {
        this.camera.position.x = (Math.sin(this.angle)*150);
        this.camera.position.y = (Math.cos(this.angle)*150);
        this.camera.lookAt(new THREE.Vector3(0,0,0));
        this.angle+=.1;
    }

    this.getModule = function() {
        return {
            components: [this.menu],
            update: [this.menu, this],
            scene: this.scene,
            camera: this.camera
        };
    }
};