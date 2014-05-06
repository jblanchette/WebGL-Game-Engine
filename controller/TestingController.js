/**
 *
 * Main Menu Controller
 *
 */
G.controller.TestingController = Class.create(G.controller.Controller, {

    init: function() {

        G.log("init testing controller");

        // Setup camera
        this.camera = new THREE.PerspectiveCamera( 45, 1600 / 900, 1, 3000 );
        this.camera.position.set( 0, 0, 100 );

        this.EntityComponent = new G.component.EntityComponent();
        this.GroundComponent = new G.component.GroundComponent();
        this.InputComponent = new G.component.InputComponent();

        this.addComponent(this.EntityComponent,true);
        this.addComponent(this.GroundComponent,true);
        this.addComponent(this.InputComponent ,true);

        this.addUpdate(this);

    },

    update: function() {

    }
});
