/**
 *
 * Main Menu Controller
 *
 */
G.controller.OverworldController = Class.create(G.controller.Controller, {

    init: function(promises) {

        this.EComp = new G.component.EnemyComponent();
        this.PComp = new G.component.PlayerComponent();
        this.WComp = new G.component.WorldComponent();

        this.addComponent(this.EComp,true);
        this.addComponent(this.PComp,true);
        this.addComponent(this.WComp,true);

        var scene = this.getScene();
        // Setup lights
        this.scene.add(new THREE.AmbientLight(0xeef0ff));

        // Setup camera
        this.camera = new THREE.PerspectiveCamera( 90, 1600 / 900, 1, 3000 );
        this.camera.position.set( 0, 100, 700 );
        this.addUpdate(this);
    },

    update: function() {

    }
});