G.scenegraph.threejs.Ground = Class.create(G.scenegraph.threejs.SceneGraph,{
    buildScene: function(scene,model,resourceBank){

        this.container = new THREE.Object3D();

        this.container.add(this.SelectionMesh);

        scene.add(this.container);

    }
});