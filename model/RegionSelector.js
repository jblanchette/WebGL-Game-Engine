G.model.RegionSelector = Class.create({
    initialize: function() {

        this.rL = 2;
        this.rW = 2;


		this.rectShape = new THREE.Shape();
		this.rectShape.moveTo( 0,0 );
		this.rectShape.lineTo( 0, this.rW );
		this.rectShape.lineTo( this.rL, this.rW );
		this.rectShape.lineTo( this.rL, 0 );
        this.rectShape.lineTo( 0, 0);

        this.points = this.rectShape.createPointsGeometry();

        this.Mesh = new THREE.Line( this.points,
                        new THREE.LineBasicMaterial( { color: 0xFF0000, linewidth: 4 } ) );
        this.Mesh.geometry.dynamic = true;
        this.Mesh.visible = false;

        this.ox = 0;
        this.oy = 0;

    },

    setOrigin: function(ox,oy){
        this.reset();

        this.ox = ox;
        this.oy = oy;
        this.Mesh.visible = true;
        this.Mesh.position.set(this.ox,this.oy,2);
    },

    reset: function(){

        this.rL = 2;
        this.rW = 2;
        this.ox = 0;
        this.oy = 0;


		this.rectShape = new THREE.Shape();
		this.rectShape.moveTo( 0,0 );
		this.rectShape.lineTo( 0, this.rW );
		this.rectShape.lineTo( this.rL, this.rW );
		this.rectShape.lineTo( this.rL, 0 );
        this.rectShape.lineTo( 0, 0);

        this.points = this.rectShape.createPointsGeometry();

        this.Mesh.visible = false;
        this.Mesh.geometry.vertices = this.points.vertices;
        this.Mesh.geometry.verticesNeedUpdate = true;
    },

    setRegion: function(ex,ey){

        this.rL = -(this.ox-ex);
        this.rW = -(this.oy-ey);

		this.rectShape = new THREE.Shape();
		this.rectShape.moveTo( 0,0 );
		this.rectShape.lineTo( 0, this.rW );
		this.rectShape.lineTo( this.rL, this.rW );
		this.rectShape.lineTo( this.rL, 0 );
        this.rectShape.lineTo( 0, 0);

        this.points = this.rectShape.createPointsGeometry();

        this.Mesh.visible = true;
        this.Mesh.geometry.vertices = this.points.vertices;
        this.Mesh.geometry.verticesNeedUpdate = true;

    },

    getMesh: function() {
        return this.Mesh;
    },

    update: function() {

    }
});