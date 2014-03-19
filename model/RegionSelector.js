G.model.RegionSelector = Class.create({
    initialize: function() {

        this.rectLength = 2;
        this.rectWidth = 2;

		this.rectShape = new THREE.Shape();
		this.rectShape.moveTo( 0,0 );
		this.rectShape.lineTo( 0, this.rectWidth );
		this.rectShape.lineTo( this.rectLength, this.rectWidth );
		this.rectShape.lineTo( this.rectLength, 0 );
		this.rectShape.lineTo( 0.01, 0.01 );
        //this.rectShape.lineTo( 0, this.rectWidth );

        this.RegionMaterial = new THREE.MeshBasicMaterial( { linewidth: 4, color: 0xFF0000 } );
        this.RegionGeom = new THREE.ShapeGeometry( this.rectShape );
        this.RegionGeom.dynamic = true;





        this.Mesh = new THREE.Line( this.RegionGeom, this.RegionMaterial) ;

        this.Mesh.rotation.x = THREE.Math.degToRad(270);
        this.Mesh.visible = false;

        this.ox = 0;
        this.oz = 0;

    },

    setOrigin: function(ox,oz){
        this.reset();

        this.ox = ox;
        this.oz = oz;
        this.Mesh.visible = true;
        this.Mesh.position.set(this.ox,1,this.oz);
    },

    reset: function(){
        this.rectLength = 1;
        this.rectWidth = 1;
        this.ox = 0;
        this.ox = 0;
        this.Mesh.visible = false;

		this.rectShape = new THREE.Shape();
		this.rectShape.moveTo( 0,0 );
		this.rectShape.lineTo( 0, this.rectWidth );
		this.rectShape.lineTo( this.rectLength, this.rectWidth );
		this.rectShape.lineTo( this.rectLength, 0 );
		this.rectShape.lineTo( 0.01, 0.01 );

        var ns = new THREE.ShapeGeometry( this.rectShape );
        this.Mesh.geometry.vertices = ns.vertices;
        this.Mesh.geometry.verticesNeedUpdate = true;
    },

    setRegion: function(ex,ez){

        this.rectLength = -(this.ox-ex);
        this.rectWidth = (this.oz-ez);
		this.rectShape = new THREE.Shape();
		this.rectShape.moveTo( 0,0 );
		this.rectShape.lineTo( 0, this.rectWidth );
		this.rectShape.lineTo( this.rectLength, this.rectWidth );
		this.rectShape.lineTo( this.rectLength, 0 );
		this.rectShape.lineTo( 0.01, 0.01 );
        //this.rectShape.lineTo( 0, this.rectWidth );

        var ns = new THREE.ShapeGeometry( this.rectShape );
        this.Mesh.geometry.vertices = ns.vertices;
        this.Mesh.geometry.verticesNeedUpdate = true;

    },

    getMesh: function() {
        return this.Mesh;
    },

    update: function() {

    }
});