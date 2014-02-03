/**
 *
 * Main Menu Controller
 *
 */
G.controller.OverworldController = Class.create(G.controller.Controller, {
    init: function(promises) {

        var scene = this.getScene();
        // Setup lights
        this.scene.add(new THREE.AmbientLight(0xeef0ff));

        // Setup camera
        this.camera = new THREE.PerspectiveCamera(45, 1600 / 900, 1, 1000);
        this.camera.position.set(0, 500, 0);
        this.camera.lookAt(new THREE.Vector3(0,0,0));

        this.UnitComp = new G.component.UnitComponent();

        this.addComponent(this.UnitComp, true);



        this.addUpdate(this);
    },

    update: function() {

    }
});