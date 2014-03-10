G.model.EntityUnit = Class.create(G.model.Entity, {
    initialize: function($super){
        $super();

        this.setType("Unit");

        this.movespeed = 5;
        this.turnrate = 0.1;
        this.maxHP = 100;
        this.maxMP = 100;
        this.currentHP = 100;
        this.currentMP = 100;
        this.addCommand('Idle');
        
        this.cursorMode = 0;
        this.cursorAlias = ['Default','Attack Move','Manual Move','Spell Cast'];

        // Initalize the THREE.js Materials, Geometry, and Mesh

        this.Mesh = new THREE.Object3D();

        this.Material = new THREE.MeshBasicMaterial({vertexColors: THREE.FaceColors, overdraw: 0.5});
        this.Geom = new THREE.CubeGeometry(20, 20, 20);

        var hex = 0xff0000;
        this.Geom.faces[ 2 ].color.setHex(hex);
        this.Geom.faces[ 3 ].color.setHex(hex);

        var hex2 = 0x00ff00;
        this.Geom.faces[ 0 ].color.setHex(hex2);
        this.Geom.faces[ 1 ].color.setHex(hex2);

        this.objectMesh = new THREE.Mesh(this.Geom, this.Material);
        this.objectMesh.position.x = 0;
        this.objectMesh.position.y = 10;
        this.objectMesh.position.z = 0;

        this.SelectionMaterial = new THREE.LineBasicMaterial( { color: 0xffff00 } );
        this.SelectionGeom = new THREE.CircleGeometry( 16, 64 );

        // Remove center vertex
        this.SelectionGeom.vertices.shift();

        this.SelectionMesh = new THREE.Line(this.SelectionGeom, this.SelectionMaterial);
        this.SelectionMesh.rotation.x = THREE.Math.degToRad(270);
        this.SelectionMesh.position.set(0,0,0);

        this.SelectionMesh.visible = false;

        this.Mesh.add(this.objectMesh);
        this.Mesh.add(this.SelectionMesh);

    },

    // selType is a boolean
    selectUnit: function(selType){
        this.isSelected = selType;
        this.SelectionMesh.visible = selType;
    },

    getMoveSpeed: function(){
        return this.movespeed;
    }
});