/**
 *
 * Main Menu Controller
 *
 */
G.controller.TestingController = Class.create(G.controller.Controller, {

    init: function(promises) {

        G.log("init testing controller");

        this.TestComp = new G.component['TestingComponent']();

        // Setup camera
        this.camera = new THREE.PerspectiveCamera( 90, 1600 / 900, 1, 3000 );
        this.camera.position.set( 0, 0, 700 );

        this.addComponent(this.TestComp,true);
        this.addUpdate(this);
    },

    update: function() {

    }
});
