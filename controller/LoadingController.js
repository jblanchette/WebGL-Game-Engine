/**
 *
 * Main Menu Controller
 *
 */
G.controller.LoadingController = Class.create(G.controller.Controller, {
    init: function() {

        var scene = this.getScene();

        // Setup camera
        this.camera = new THREE.PerspectiveCamera(45, 1600 / 900, 1, 1000);
        this.camera.position.set(0, 0, 1000);
        this.camera.lookAt(new THREE.Vector3(0,0,0));

        G.log("Starting Load Controller");

        this.addUpdate(this);
    },

    update: function() {

    }
});