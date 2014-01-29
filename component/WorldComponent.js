G.component.WorldComponent = Class.create(G.component.Component, {

    initialize: function($super,options) {
        $super(options);

        this.gridSize = 50;
        this.lines = [];
    },

    setupGrid: function(){

        var g = [];
        var row;

        for(var z = 0; z <= 50; z++){
            row = [];
            this.lines.push(this.makeLine(0,z*this.gridSize,(50*this.gridSize),z*this.gridSize));

            for(var x = 0; x <= 50; x++){
               row.push[{canPass: true,
                         rootX: (x*this.gridSize),
                         rootz: (z*this.gridSize)}];

               this.lines.push(this.makeLine(x*this.gridSize,0,x*this.gridSize,(50*this.gridSize)));
            }
            g[z] = row;
        }

        G.log(g);
        this.grid = g;

    },

    makeLine: function(startX,startZ,endX,endZ){
        var geo = new THREE.Geometry();
         var material = new THREE.LineBasicMaterial({
            color: 0x0000ff
        });
        geo.vertices.push(new THREE.Vector3(startX-500,0,startZ-500));
        geo.vertices.push(new THREE.Vector3(endX-500,0,endZ-500));

        return new THREE.Line(geo,material);

    },

    buildScene: function() {

        var scene = this.getScene();
        this.grid = this.setupGrid();

        for(var i = 0; i < this.lines.length; i++){
          scene.add(this.lines[i]);
        }
    },

    update: function() {

    }
});