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
            'Quit'
        ]);

        // Add Menu Component with updating ability
        this.addComponent(this.menu, true);

        // Setup camera
        this.camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 1, 1500 );
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