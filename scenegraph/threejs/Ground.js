G.scenegraph.threejs.Ground = Class.create(G.scenegraph.threejs.SceneGraph,{
    buildScene: function(scene,model,resourceBank){

        var groundResource = G.resourceBank.get("GroundObject");
        this.container.add(this.SelectionMesh);

        scene.add(this.container);

    }
});