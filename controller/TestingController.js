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

        this.TestComp = new G.component['EntityComponent']();
        this.addComponent(this.TestComp,true);
        this.addUpdate(this);
    },

    resources: {
        GroundObject2: "data/objects/GroundObject.js"
    },

    update: function() {

    }
});
