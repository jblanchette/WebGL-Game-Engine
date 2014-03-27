G.entity.UnitEntity = Class.create(G.entity.Entity, {
    initialize: function($super) {
        $super();

        this.SceneObject = new G.scene['THREESceneObject']();
        this.Model = new G.model['HeroModel'];

        this.buildSceneObject();

    },

    buildSceneObject: function(){

        this.playerMaterial = new THREE.MeshBasicMaterial({vertexColors: THREE.FaceColors, overdraw: 0.5});
        this.playerGeom = new THREE.CubeGeometry(this.objWidth, this.objHeight, this.objLength);

        var hex = 0xff0000;
        this.playerGeom.faces[ 2 ].color.setHex(hex);
        this.playerGeom.faces[ 3 ].color.setHex(hex);

        var hex2 = 0x00ff00;
        this.playerGeom.faces[ 0 ].color.setHex(hex2);
        this.playerGeom.faces[ 1 ].color.setHex(hex2);

        this.playerMesh = new THREE.Mesh(this.playerGeom, this.playerMaterial);
        this.playerMesh.position.x = 0;
        this.playerMesh.position.y = 0;
        this.playerMesh.position.z = 10;

        this.SelectionMaterial = new THREE.LineBasicMaterial({color: 0xffff00});
        this.SelectionGeom = new THREE.CircleGeometry(16, 64);

        // Remove center vertex
        this.SelectionGeom.vertices.shift();

        this.SelectionMesh = new THREE.Line(this.SelectionGeom, this.SelectionMaterial);

        this.SelectionMesh.position.set(0, 0, 1);

        this.SelectionMesh.visible = false;

        this.SceneObject.add(this.playerMesh);
        this.SceneObject.add(this.SelectionMesh);
    },

});