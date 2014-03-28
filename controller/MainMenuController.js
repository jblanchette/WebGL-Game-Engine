/**
 *
 * Main Menu Controller
 *
 */
G.controller.MainMenuController = Class.create(G.controller.Controller, {

    init: function(promises) {

        this.angle = 0;
        this.menu = new G.component.MenuComponent([
            'Play',
            'Continue',
            'Settings',
            'Quit',
            'Noobs Only'
        ]);

        // Load Texture
        // @TODO: Probably move the loadTexture stuff to the
        // spacebackground comopnent, don't load it here.
        var self = this;
        this.loadTexture('./textures/space.jpg', function(texture) {
            self.addComponent(new G.component.SpaceBackgroundComponent({
                texture: texture
            }));
        });

        // Add Menu component with update
        this.addComponent(this.menu, true);

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
