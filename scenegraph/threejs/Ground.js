G.scenegraph.threejs.Ground = Class.create(G.scenegraph.threejs.SceneGraph,{
    initialize: function($super){
        $super();

    },

    buildScene: function(scene, model){

        this.container = new THREE.Object3D();

        var object = G.resourceBank.get("GroundObject");
        this.container.add(object);

        scene.add(this.container);



    }
});