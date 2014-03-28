/**
 *
 * Main Menu Controller
 *
 */
G.controller.TestingController = Class.create(G.controller.Controller, {

    init: function(promises) {

        G.log("init testing controller");

        // Setup camera
        this.camera = new THREE.PerspectiveCamera( 45, 1600 / 900, 1, 3000 );
        this.camera.position.set( 0, 0, 100 );

        this.TestComp = new G.component['TestingComponent']();
        this.addComponent(this.TestComp,true);
        this.addUpdate(this);
    },

    update: function() {

    }
});
