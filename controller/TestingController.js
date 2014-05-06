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

        this.InputComponent = new G.component.InputComponent();
        this.TestComp = new G.component.EntityComponent();

        this.addComponent(this.InputComponent,true);
        this.addComponent(this.TestComp,true);
        this.addUpdate(this);

    },

    update: function() {

    }
});
