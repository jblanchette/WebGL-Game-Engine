/**
 *
 * Main Menu Controller
 *
 */
G.controller.OverworldController = Class.create(G.controller.Controller, {
    init: function() {

        var scene = this.getScene();
        // Setup lights
        this.scene.add(new THREE.AmbientLight(0xeef0ff));

        // Setup camera
        this.camera = new THREE.PerspectiveCamera(45, 1600 / 900, 1, 1000);
        this.camera.position.set(0, 0, 1000);
        this.camera.lookAt(new THREE.Vector3(0,0,0));


        this.EntityComp = new G.component.EntityComponent();
        this.OverworldComp = new G.component.OverworldComponent();

        //this.HUDComp = new G.component.HUDComponent();

        //this.addComponent(this.HUDComp,true);
        this.addComponent(this.EntityComp, true);
        this.addComponent(this.OverworldComp,true);


        this.addUpdate(this);
    },

    update: function() {

    }
});