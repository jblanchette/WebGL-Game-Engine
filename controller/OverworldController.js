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
        this.camera.position.set(0, 1000, 0);
        this.camera.lookAt(new THREE.Vector3(0,1,0));
        this.EComp = new G.component.EnemyComponent();
        this.PComp = new G.component.PlayerComponent(this.camera);
        //this.WComp = new G.component.WorldComponent();

        this.addComponent(this.EComp, true);
        this.addComponent(this.PComp, true);
        //this.addComponent(this.WComp,true);


        this.addUpdate(this);
    },
    update: function() {

    }
});